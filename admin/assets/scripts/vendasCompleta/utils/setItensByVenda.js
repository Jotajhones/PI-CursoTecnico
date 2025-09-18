import modal from "../../common/modal.js";
import carregarPageVendasCompletas from "../service/carrregarPageVendasCompletas.js";

function setItensByVenda() {

    const urlParams = new URLSearchParams(window.location.search);
    const id_venda = urlParams.get('id_venda');

    const itens = document.querySelectorAll('.produtoItem').length - 1;

    const itensVenda = [];

    const situacao_venda = document.querySelector(`#situacaoVenda`).value;


    if (situacao_venda === "cancelada") {

        fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "situacao_venda": 'cancelada'
            })
        })
            .then(res => {
                if (res.ok) {
                    modal('Sucesso', 'Venda cancelada com sucesso!');
                    carregarPageVendasCompletas();
                } else {
                    modal('Erro 400', 'Erro ao Atualizar venda.');
                    carregarPageVendasCompletas();
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                modal('ERRO 503', 'Serviço Indisponivel');
                carregarPageVendasCompletas();
            });

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
                "situacao_item": situacao_item ?? null,
                "situacao_venda": situacao_venda,
                "quantidade": quantidade ?? null,
                "id_itens_venda": id_itens_venda ?? null
            })
        }

        fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itensVenda)
        })
            .then(res => {
                if (res.ok) {
                    modal('Sucesso', 'Item atualizado com sucesso!');
                    carregarPageVendasCompletas();
                } else {
                    modal('Erro 400', 'Erro ao Atualizar item.');
                    carregarPageVendasCompletas();
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                modal('ERRO 503', 'Serviço Indisponivel');
                carregarPageVendasCompletas();
            });
    }
}

export default setItensByVenda;