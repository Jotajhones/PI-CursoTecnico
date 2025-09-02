import getValues from "../commons/getValues.js";
import procurar from "./procurar.js";
import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";
import limparRound from "../commons/limparRound.js";

function filtrarSituacao() {

    let situacao;

    const tabela = document.querySelector(".resultadoUsers");
    const valores = getValues();

    const ativo = document.querySelector("#rdAtivo");
    const inativo = document.querySelector("#rdInativo");
    const label = document.querySelector('#lbSituacao');

    if (ativo.checked) {
        situacao = ativo.value;
        label.innerHTML = "ATIVO";

    } else if (inativo.checked) {
        situacao = inativo.value;
        label.innerHTML = "INATIVO";
    }

    console.log(situacao)
    const resultado = procurar();

    fetch('http://localhost:8080/blusablusas/users/filter', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "situacao": situacao
        })
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.length > 0 && valores.searchbar) {

                tabela.innerHTML = "";

                if (resultado && resultado[0].length) {

                    resultado[0].forEach(item => {

                        if (item.situacao === situacao) {

                            let dataFront = new Date(item.data_nascimento).toLocaleDateString();
                            let dataBack = new Date(item.data_nascimento);
                            dataBack = dataBack.toISOString().split('T')[0];

                            conteudoCard(tabela, item, dataFront, dataBack);
                        }
                    });
                }
            }  

            if (res.length > 0 && !valores.searchbar) {

                tabela.innerHTML = "";

                res.forEach(item => {
                    let dataFront = new Date(item.data_nascimento).toLocaleDateString();
                    let dataBack = new Date(item.data_nascimento);
                    dataBack = dataBack.toISOString().split('T')[0];

                    conteudoCard(tabela, item, dataFront, dataBack);
                })
            } 

            if (!res.length > 0 && valores.searchbar) {
                procurar();
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

export default filtrarSituacao;
