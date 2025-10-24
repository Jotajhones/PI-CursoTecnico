import cardDescricao from "./cardDescricao.js";
import verificarLoginAtivo from "../login/services/verificarLoginAtivo.js"

function atualizarDescricao() {

    const params = new URLSearchParams(window.location.search);
    const id_produto = params.get('id_produto');
    const tabela = document.querySelector('.cardSection');

    fetch(`http://localhost:8080/blusablusas/produtos/${id_produto}`)
        .then(res => res.json())
        .then(res => {
            res.forEach(item => {

                cardDescricao(tabela, item);
            });
        })

}

export default atualizarDescricao;