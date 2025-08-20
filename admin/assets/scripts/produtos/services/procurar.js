import getValues from "../utils/getValues.js";
import conteudoCard from "../utils/card.js";
import error204 from "../../common/error204.js";
import limparRound from "../utils/limparRound.js";

//função que acessa a rota de pesquisa e recebe um JSON com o resultado com base no valor inserido no input
function procurar() {

    const valores = getValues();
    const data = [];
    const tabela = document.querySelector(".resultadoProd");

    console.log(valores.searchbar)

    fetch('http://localhost:8080/blusablusas/produtos/search', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id_produto": `%${valores.searchbar}%` ?? null,
            "denominacao": `%${valores.searchbar}%` ?? null,
            "cor": `%${valores.searchbar}%` ?? null,
            "tecido": `%${valores.searchbar}%` ?? null,
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
            console.log(err);
        })
    // console.log(data);
    return data;
}

export default procurar;