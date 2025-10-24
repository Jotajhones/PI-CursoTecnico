import cardItensByVenda from "../utils/cardItensByVenda.js";

// Função para receber todos os itens referente a uma venda especifica
function carregarItens(id_venda) {

    fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(res => {

            console.log(res);

            const tabela = document.querySelector('#listaProdutos');            
            tabela.innerHTML = '';

            let count = 0;

            res.forEach(element => {
                
                cardItensByVenda(tabela, element, count);
                count ++;
            });
        });
}

export default carregarItens;