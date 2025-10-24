import getValues from "../utils/getValues.js";
import procurarProds from "./procurarProds.js";
import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";

//função que acessa a rota de filtragem e espera receber um JSON com os valores correspondentes, programada para funcionar em correpondencia com a função de busca procurar(), ou seja, ao clicar no round os valores existentes no input serão levados em consideração para apresentação do resultado no campo tabela; 
function filtrarProds() {

    let situacao; 

    const tabela = document.querySelector(".resultadoProd");
    const valores = getValues();

    const ativo = document.querySelector("#rdAtivo");
    const esgotado = document.querySelector("#rdEsgotado");
    const descontinuado = document.querySelector("#rdDescontinuado");
    const label = document.querySelector('#lbSituacao');

    if (ativo.checked) {
        situacao = ativo.value;
        label.innerHTML = "ATIVO";

    } else if (esgotado.checked) {
        situacao = esgotado.value;
        label.innerHTML = "ESGOTADO";

    } else if (descontinuado.checked) {

        situacao = descontinuado.value;
        label.innerHTML = "DESCONTINUADO";
    }

    const resultado = procurarProds();

    fetch('http://localhost:8080/blusablusas/produtos/search', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "situacao": `${situacao}`
        })
    })
        .then(res => res.json())
        .then(res => {

            if (res.length > 0 && valores.searchbar) {

                tabela.innerHTML = "";

                if (resultado && resultado[0].length) {

                    resultado[0].forEach(item => {

                        if (item.situacao === situacao) {

                            conteudoCard(tabela, item);
                        }
                    });
                }
            }

            if (res.length > 0 && !valores.searchbar) {

                tabela.innerHTML = "";

                res.forEach(item => {
                    conteudoCard(tabela, item);
                })
            }

            if (!res.length > 0 && valores.searchbar) {
                procurarProds();
            }

            if (!res.length && !valores.searchbar) {
                error204(tabela);
                limparRound();
            }
        })

        .catch((err) => {

            //a execução deste erro foi inibida, pois em alguns momentos da requisição a const resultado ainda não possui valores e quando isso acontecia a função automaticamente executava o erro e saia do bloco de execução, porém se tratando de um funçao assincrona, resultado sempre acaba recendo valores, mesmo que esses valores sejam null logo, conseguindo manter o fluxo de execução.

            // console.error(err);
        })
}

export default filtrarProds;