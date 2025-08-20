import getValues from "../commons/getValues.js";
import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";
import limparRound from "../commons/limparRound.js"
import error503 from "../../common/error503.js";

//Função para buscar usuarios
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

            //caso a resposta seja 200 ew não seja vazia executa este bloco;
            if (res.length > 0) {

                tabela.innerHTML = "";

                res.forEach(item => {

                    let dataFront = new Date(item.dataNascimento).toLocaleDateString();
                    let dataBack = new Date(item.dataNascimento);
                    dataBack = dataBack.toISOString().split('T')[0];

                    conteudoCard(tabela, item, dataFront, dataBack);
                });

                data.push(res);

            } else {
                //caso a resposta seja vazia e3xecuta este bloco informando que não existem itens correpondentes a pesquisa
                error204(tabela);
                limparRound();
            }
        })
        .catch((err) => {
            //Caso não seja concluido executado o bloco .then() é executado o bloco de erro informado que o serviço está  indisponivel;
            error503(tabela);
            console.log(err);
        })
    return data;
}

export default procurar;
