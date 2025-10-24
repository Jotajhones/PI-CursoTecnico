import cardItensByVenda from "../utils/cardItensByVenda.js";

// Função para receber todos os itens referente a uma venda especifica
function carregarCartItens(id_venda) {

    fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(res => {

            const tabela = document.querySelector('#listaProdutos');
            tabela.innerHTML = '';

            let count = 0;

            res.forEach(element => {


                if (element.situacao_venda != 'cancelada') {

                    if (element.situacao_item == 'confirmada') {
                        cardItensByVenda(tabela, element, count);
                        count++;
                    }

                } else if (element.situacao_venda == 'cancelada') {
                    cardItensByVenda(tabela, element, count);
                    count++;
                }

            });
        });
}

export default carregarCartItens;