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

    // console.log(itensFrontList);

    const cartDB = await receberCartDB();

    // console.log(cartDB);

    const listaAtualizada = atualizarSituacaoItens(cartDB, itensFrontList);

    // console.log(listaAtualizada)

    const itensVenda = [];

    listaAtualizada.forEach(item => {
        itensVenda.push({
            "situacao_item": item.situacao_item || null,
            "situacao_venda": item.situacao_venda || null,
            "quantidade": item.quantidade ,
            "id_itens_venda": item.id_itens_venda || null,
        })
    });

    // console.log(itensVenda);

    try {
        const res = await fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itensVenda)
        });

        if (res.ok) {

            modalAlt('sucesso', 'Item atualizado com sucesso!');

            await new Promise(resolve => setTimeout(resolve, 1000));

            carregarCartPage();
            calcularIndiceCarrinho();

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

export default setItensCarrinho;
