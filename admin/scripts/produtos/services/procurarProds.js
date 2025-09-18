import getValues from "../utils/getValues.js";
import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";
import error503 from "../../common/error503.js";
import limparRound from "../utils/limparRound.js";

//função que acessa a rota de pesquisa e recebe um JSON com o resultado com base no valor inserido no input
function procurarProds() {

    const valores = getValues();
    const data = [];
    const tabela = document.querySelector(".resultadoProd");

    fetch('http://localhost:8080/blusablusas/produtos/search', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id_produto": `%${valores.searchbar}%` ?? null,
            "denominacao": `%${valores.searchbar}%` ?? null,
            "categoria": `%${valores.searchbar}%` ?? null
        })
    })
        .then(res => res.json())
        .then(res => {

            if (res.length > 0) {

                tabela.innerHTML = ""; 

                res.forEach(item => {
                    conteudoCard(tabela, item);
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

export default procurarProds;