import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";
import error503 from "../../common/error503.js";
import loadTheme from "../../common/loadTheme.js";

// Função para atualizar tabela de vendas
function atualizarTabela() {

    const tabela = document.querySelector(".resultadoVendas");
    tabela.innerHTML = "";

    fetch('http://localhost:8080/blusablusas/vendas') 
        .then(res => res.json())
        .then(res => {

            if (res.length > 0) {

                res.forEach(item => {

                    let dataFront = new Date(item.data_compra).toLocaleDateString();
                    let dataBack = new Date(item.data_compra);
                    dataBack = dataBack.toISOString().split('T')[0];

                    conteudoCard(tabela, item, dataBack, dataFront);
                });

            } else {
                error204(tabela);
            }
        })
        .catch(err => { error503(tabela) });
        loadTheme();
}

export default atualizarTabela;