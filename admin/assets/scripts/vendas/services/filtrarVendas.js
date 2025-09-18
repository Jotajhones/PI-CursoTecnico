import procurarVenda from "./procurarVenda.js";
import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";

//função que acessa a rota de filtragem e espera receber um JSON com os valores correspondentes, programada para funcionar em correpondencia com a função de busca procurar(), ou seja, ao clicar no round os valores existentes no input serão levados em consideração para apresentação do resultado no campo tabela; 
function filtrarVendas() {



    let situacao;

    const tabela = document.querySelector(".resultadoVendas");
    const valores = document.querySelector('#searchbar');

    const confirmada = document.querySelector("#rdConfirmada");
    const andamento = document.querySelector("#rdAndamento");
    const cancelada = document.querySelector("#rdCancelada");
    const label = document.querySelector('#lbSituacao');

    if (confirmada.checked) {
        situacao = confirmada.value;
        label.innerHTML = "CONFIRMADA";

    } else if (andamento.checked) {
        situacao = andamento.value;
        label.innerHTML = "EM ANDAMENTO";

    } else if (cancelada.checked) {
        situacao = cancelada.value;
        label.innerHTML = "CANCELADA";
    }

    const resultado = procurarVenda();

    fetch('http://localhost:8080/blusablusas/vendas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "situacao": `${situacao}`
        })
    })
        .then(res => res.json())
        .then(res => {

            if (res.length > 0 && valores.value) {

                tabela.innerHTML = "";

                if (resultado && resultado[0].length) {

                    resultado[0].forEach(item => {

                        let dataFront = new Date(item.data_nascimento).toLocaleDateString();
                        let dataBack = new Date(item.data_nascimento);
                        dataBack = dataBack.toISOString().split('T')[0];

                        if (item.situacao === situacao) {

                            conteudoCard(tabela, item, dataBack, dataFront);
                        }
                    });
                }
            }

            if (res.length > 0 && !valores.value) {

                tabela.innerHTML = "";

                res.forEach(item => {

                    let dataFront = new Date(item.data_nascimento).toLocaleDateString();
                    let dataBack = new Date(item.data_nascimento);
                    dataBack = dataBack.toISOString().split('T')[0];

                    conteudoCard(tabela, item, dataBack, dataFront);
                })
            }

            if (!res.length > 0 && valores.value) {
                procurarVenda();
            }

            if (!res.length && !valores.value) {
                error204(tabela);
            }
        })

        .catch((err) => {

            //a execução deste erro foi inibida, pois em alguns momentos da requisição a const resultado ainda não possui valores e quando isso acontecia a função automaticamente executava o erro e saia do bloco de execução, porém se tratando de um funçao assincrona, resultado sempre acaba recendo valores, mesmo que esses valores sejam null logo, conseguindo manter o fluxo de execução.

            // console.error(err);
        })
}

export default filtrarVendas;