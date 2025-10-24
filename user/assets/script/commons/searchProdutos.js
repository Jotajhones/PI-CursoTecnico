import cardComum from "./cardComum.js";

function searchProdutos(categoria) {

    const searchBar = document.querySelector('.searchBar');
    const data = [];
    const tabela = document.querySelector(".containerProdutos");

    fetch('http://localhost:8080/blusablusas/produtos/userSearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "categoria": categoria,
            "denominacao": `%${searchBar.value}%`
        })
    })
        .then(res => res.json())
        .then(res => {

            if (res.length > 0) {

                tabela.innerHTML = "";

                res.forEach(item => {
                    cardComum(tabela, item);
                });

                data.push(res);

            } else {
                //error204(tabela);
                //limparRound();
            }
        })
        .catch((err) => {
            //error503(tabela);
        })
    return data;
}

export default searchProdutos;
