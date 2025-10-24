import searchProdutos from "./searchProdutos.js";
import cardComum from "./cardComum.js";


function filterProdutos(categoria) {

    const cor = [];
    const tecido = [];
    const tamanho = [];

    const todosCheckboxes = document.querySelectorAll("input[type='checkbox']")

    todosCheckboxes.forEach(item => {

        if (item.checked) {

            if (item.dataset.filter === "tamanho") {
                tamanho.push(item.value);
            }

            if (item.dataset.filter === "cor") {
                cor.push(item.value);
            }

            if (item.dataset.filter === "tecido") {
                tecido.push(item.value);
            }
        }
    });

    const tabela = document.querySelector(".containerProdutos");
    const searchBar = document.querySelector(".searchBar");
    const valueOfRange = Number(document.querySelector("#rangePreco").value);

    const resultado = searchProdutos(categoria);


    fetch('http://localhost:8080/blusablusas/produtos/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "categoria": categoria,
            "cor": cor,
            "tecido": tecido,
            "tamanho": tamanho,
            "preco": valueOfRange
        })
    })
        .then(res => res.json())
        .then(res => {

            if (res.length > 0 && searchBar.value) {

                tabela.innerHTML = "";

                if (resultado && resultado[0].length) {

                    resultado[0].forEach(item => {

                        cardComum(tabela, item);

                    });
                }
            }

            if (res.length > 0 && !searchBar.value) {

                tabela.innerHTML = "";

                res.forEach(item => {
                    cardComum(tabela, item);
                })
            }

            if (!res.length > 0 && searchBar.value) {
                searchProdutos(categoria);
            }

            if (!res.length && !searchBar.value) {
                tabela.innerHTML = "<h1>Não foram encontrado itens para a busca!</h1>";
                // error204(tabela);
                // limparRound();
                console.log(204);
            }
        })

        .catch((err) => {

            //a execução deste erro foi inibida, pois em alguns momentos da requisição a const resultado ainda não possui valores e quando isso acontecia a função automaticamente executava o erro e saia do bloco de execução, porém se tratando de um funçao assincrona, resultado sempre acaba recendo valores, mesmo que esses valores sejam null logo, conseguindo manter o fluxo de execução.

            // console.error(err);
        })


}

export default filterProdutos;