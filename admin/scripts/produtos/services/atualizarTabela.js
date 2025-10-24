import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";
import error503 from "../../common/error503.js";
import loadTheme from "../../common/loadTheme.js";

// Função para atualizar tabela que recebe os produtos
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

    loadTheme();
}

export default atualizarTabela;