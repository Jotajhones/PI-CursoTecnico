import modal from "../../common/modal.js";
import carregarPageVendasCompletas from "../service/carrregarPageVendasCompletas.js";

async function setItensByVenda() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_venda = urlParams.get('id_venda');

    if (!id_venda) {
        modal('erro', 'ID da venda não encontrado na URL.');
        return;
    }

    const itens = document.querySelectorAll('.produtoItem').length - 1;
    const itensVenda = [];
    const situacao_venda = document.querySelector(`#situacaoVenda`).value;

    if (situacao_venda === "cancelada") {
        try {
            const res = await fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    situacao_venda: 'cancelada'
                })
            });

            if (res.ok) {
                modal('sucesso', 'Venda cancelada com sucesso!');
                await new Promise(resolve => setTimeout(resolve, 1000));
                carregarPageVendasCompletas();
            } else {
                modal('erro', `Erro ao Atualizar venda. Status: ${res.status}`);
            }
        } catch (error) {
            console.error('Erro de Rede:', error);
            modal('ERRO 503', 'Serviço Indisponivel');
            carregarPageVendasCompletas();
        }

    } else {

        for (let i = 0; i < itens; i++) {

            let situacao_item = document.querySelector(`#produtoDescricaoSituacao-${i}`).value;
            let quantidade = document.querySelector(`#inputQuantidade-${i}`).value;
            const id_itens_venda = document.querySelector(`#inputIdItensVendas-${i}`).value;

            if (quantidade <= 0) {
                quantidade = 0;
                situacao_item = 'cancelada';
            } else if (quantidade > 0) {
                situacao_item = 'confirmada';
            }

            itensVenda.push({
                situacao_item: situacao_item ?? null,
                situacao_venda: situacao_venda,
                quantidade: quantidade ?? null,
                id_itens_venda: id_itens_venda ?? null
            })
        }

        if (itensVenda.length < 1) {
            itensVenda.push({ "situacao_venda": situacao_venda })
        }

        try {
            const res = await fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itensVenda)
            });

            if (res.ok) {
                modal('Sucesso', 'Item atualizado com sucesso!');
                await new Promise(resolve => setTimeout(resolve, 1000));
                carregarPageVendasCompletas();
            } else {
                modal('Erro 400', `Erro ao Atualizar item. Status: ${res.status}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            modal('ERRO 503', 'Serviço Indisponivel');
        }
    }
}

export default setItensByVenda;