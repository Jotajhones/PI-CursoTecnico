import getValues from "../commons/getValues.js";
import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";
import limparRound from "../commons/limparRound.js"
import error503 from "../../common/error503.js";

function procurar() {

    const valores = getValues();
    const data = [];
    const tabela = document.querySelector(".resultadoUsers");

    fetch('http://localhost:8080/blusablusas/users/filter', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "nome": `%${valores.searchbar}%` ?? null,
            "cpf": `%${valores.searchbar}%` ?? null,
            "genero": `%${valores.searchbar}%` ?? null
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

                    conteudoCard(tabela, item, dataFront, dataBack);
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
    return data;
}

export default procurar;
