import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";
import error503 from "../../common/error503.js";

//função que acessa a rota de pesquisa e recebe um JSON com o resultado com base no valor inserido no input
function procurarVenda() {

    const valores = document.querySelector('#searchbar').value;
    const data = [];
    const tabela = document.querySelector(".resultadoVendas");

    fetch('http://localhost:8080/blusablusas/vendas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "nome": `%${valores}%` ?? null,
            "cpf": `%${valores}%` ?? null
        })
    })
        .then(res => res.json())
        .then(res => {

            if (res.length > 0) {

                tabela.innerHTML = "";

                res.forEach(item => {

                    let dataFront = new Date(item.data_nascimento).toLocaleDateString();
                    let dataBack = new Date(item.data_nascimento);
                    dataBack = dataBack.toISOString().split('T')[0];

                    conteudoCard(tabela, item, dataBack, dataFront);
                });

                data.push(res);

            } else {
                error204(tabela);
                limparRound();
            }
        })
        .catch((err) => {
            error503(tabela);
        })
    return data;
}

export default procurarVenda;