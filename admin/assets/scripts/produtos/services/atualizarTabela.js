import conteudoCard from "../utils/card.js";
import error204 from "../../common/error204.js";
import error503 from "../../common/error503.js";

function atualizarTabela() {

    const tabela = document.querySelector(".resultadoProd");
    tabela.innerHTML = ""; 

    fetch('http://localhost:8080/blusablusas/produtos')
        .then(res => res.json())
        .then(res => {

            if (res.length > 0) {

                res.forEach(item => {
                    conteudoCard(tabela, item);
                });

            } else {
                error204(tabela);
            }
        })
        .catch(err => { error503(tabela) });
}

export default atualizarTabela;