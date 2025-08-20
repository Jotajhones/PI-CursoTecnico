import conteudoCard from "../utils/conteudoCard.js";
import error204 from "../../common/error204.js";
import error503 from "../../common/error503.js";

//Função para atualizar O container que recebe os Dados de Usuarios;
function atualizarTabela() {

    const tabela = document.querySelector(".resultadoUsers");
    tabela.innerHTML = "";

    fetch('http://localhost:8080/blusablusas/users')
        .then(res => res.json())
        .then(res => {
            if (res.length > 0) {

                res.forEach(item => {

                    //convertendo as data do bancos para objetos Data do JavaScript, para poder utilizar metodos especificos para trabalhar com data;
                    //criando dois tipos de data, uma data para ser exibida para o usuario, uma formatção para o formato BR, e outra formatação para o backend;
                    // front dd/mm/aaaa
                    // back yyyy-MM-dd 

                    let dataFront = new Date(item.dataNascimento).toLocaleDateString();
                    let dataBack = new Date(item.dataNascimento);
                    dataBack = dataBack.toISOString().split('T')[0];

                    conteudoCard(tabela, item, dataFront, dataBack);
                });

            } else {
                error204(tabela);
            }
        })
        .catch(err => { error503(tabela); console.error(err) });
}

export default atualizarTabela;