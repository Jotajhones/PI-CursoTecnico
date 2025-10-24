import carregarCartPage from "./carregarCartPage.js";
import modal from "../../commons/modal.js";
import modalAlt from "../../commons/modalAlt.js";
import calcularIndiceCarrinho from "../../commons/calcularIndiceCarrinho.js";


async function receberCartDB() {

    const urlParams = new URLSearchParams(window.location.search);
    const id_venda = urlParams.get('id_venda');

    try {
        const response = await fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erro ao buscar dados do carrinho:', error);
        return null;
    }
}

function atualizarSituacaoItens(cartDB, itensFrontList) {

    const itensFrontMap = new Map();

    itensFrontList.forEach(item => {

        if (item.id_itens_venda) {
            itensFrontMap.set(Number(item.id_itens_venda), {
                quantidade: Number(item.quantidade),
                situacao_item: item.situacao_item || 'confirmada'
            });
        }
    });

    const listaFinal = cartDB.map(itemDB => {
        const idItem = Number(itemDB.id_itens_venda);

        if (itensFrontMap.has(idItem)) {
            const dadosNovos = itensFrontMap.get(idItem);

            return {
                ...itemDB,
                situacao_item: dadosNovos.situacao_item,
                quantidade: dadosNovos.quantidade
            };
        } else {
            return {
                ...itemDB,
                situacao_item: 'cancelada',
                quantidade: 0
            };
        }
    });

    return listaFinal;
}

async function setItensCarrinho() {

    const urlParams = new URLSearchParams(window.location.search);
    const id_venda = urlParams.get('id_venda');

    const itensFront = document.querySelectorAll('.inputId_produto');
    const id_itens_venda = document.querySelectorAll('.inputId_itens_venda')
    const quantidade = document.querySelectorAll('.inputQuantidadeVenda');

    const itensFrontList = []

    itensFront.forEach((item, index) => {
        itensFrontList.push({
            situacao_venda: "confirmada",
            situacao_item: "confirmada",
            id_itens_venda: Number(id_itens_venda[index].value),
            quantidade: quantidade[index].value

        })
    });

    const cartDB = await receberCartDB();

    const listaAtualizada = atualizarSituacaoItens(cartDB, itensFrontList);

    const itensVenda = [];

    listaAtualizada.forEach(item => {
        itensVenda.push({
            "situacao_item": item.situacao_item || null,
            "situacao_venda": item.situacao_venda || null,
            "quantidade": item.quantidade,
            "id_itens_venda": item.id_itens_venda || null,
        })
    });

    try {
        const res = await fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itensVenda)
        });

        if (res.ok) {

            await new Promise(resolve => setTimeout(resolve, 1000));

            carregarCartPage();
            calcularIndiceCarrinho();

        } else {

            carregarCartPage();
        }
    } catch (error) {
        console.error('Erro:', error);

        carregarCartPage();
    }
}

async function enviarEmailConfirmacao(carrinho, usuario) {
    const valorTotalVenda = carrinho[0] ? carrinho[0].valor_venda : 0;

    const corpoHtml = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #6a05ad;">Compra Confirmada! 🎉</h2>
            <p>Olá,</p>
            <p>Sua compra foi confirmada com sucesso na **BlusaBlusas**! Agradecemos a preferência.</p>
            <p>Abaixo, você confere os detalhes dos itens do seu pedido:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead style="background-color: #f2f2f2;">
                    <tr>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; color: #6a05ad;">Produto</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #6a05ad;">Qtd.</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: right; color: #6a05ad;">Preço Unitário</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: right; color: #6a05ad;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${carrinho.map(item => {
                        const subtotal = item.quantidade * item.preco;
                        return `
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${item.denominacao}</td>
                                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.quantidade}</td>
                                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">R$ ${Number(item.preco).toFixed(2).replace('.', ',')}</td>
                                <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: #6a05ad;">Total da Venda</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">R$ ${Number(valorTotalVenda).toFixed(2).replace('.', ',')}</td>
                    </tr>
                </tfoot>
            </table>
            
            <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                Em breve você receberá atualizações sobre o envio.
            </p>
            <p>Atenciosamente,</p>
            <p><strong>Equipe BlusaBlusas</strong></p>
            <p style="font-size: 12px; color: #999;">*Este é um e-mail automático. Por favor, não responda.</p>
        </div>
    `;

    try {
        await fetch('http://localhost:8080/blusablusas/enviar-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "destinatarios": usuario.usuario,
                "assunto": "Confirmação de Compra - BlusaBlusas",
                "corpoHtml": corpoHtml
            })
        });
    } catch (error) {
        console.error('Erro ao enviar e-mail de confirmação:', error);
    }
}

// Função principal para confirmar a compra e orquestrar as ações
async function confirmarCompra() {

    const urlParams = new URLSearchParams(window.location.search);
    const id_venda = urlParams.get('id_venda');
    const usuario = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));

    let carrinho = [];

    const listaDeCompras = await fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (listaDeCompras.ok) {
        carrinho = await listaDeCompras.json();
    }

    await setItensCarrinho();

    const confirmar = [{ "situacao_venda": "confirmada" }];

    try {
        const res = await fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(confirmar)
        });

        if (res.ok) {

            modal(
                'Sucesso',
                'Obrigado por testar nosso projeto — ainda não há um gateway de pagamento.<br>A compra foi registrada com o status "confirmada" e ficará gravada no sistema.<br>Você será redirecionado ao histórico de compras em aproximadamente 10 segundos.'
            );

            await new Promise(resolve => setTimeout(resolve, 1000));

            carregarCartPage();
            calcularIndiceCarrinho();
            
            // Envia o e-mail de confirmação de forma assíncrona
            await enviarEmailConfirmacao(carrinho, usuario);

            const id_usuario = urlParams.get('id_usuario');
            setTimeout(() => {
                window.location.href = `./historico.html?id_usuario=${id_usuario}`;
            }, 10000);

        } else {
            modalAlt('erro', 'Erro ao Atualizar item.');
            carregarCartPage();
        }
    } catch (error) {
        console.error('Erro:', error);
        modal('ERRO 503', 'Serviço Indisponivel');
        carregarCartPage();
    }
}

export default confirmarCompra;