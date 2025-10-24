import modal from "../../commons/modal.js";
import modalAlt from "../../commons/modalAlt.js";
import atualizarComentario from "./atualizarComentario.js";

async function addComentario() {

    const texto = document.querySelector('#comentario-produto');
    const user = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));
    const id_produto = new URLSearchParams(window.location.search).get('id_produto');

    if (texto.value != "" || !texto.value.length == 0) {

        try {
            const res = await fetch('http://localhost:8080/blusablusas/comentarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "texto": texto.value,
                    "id_pessoa": user.id_pessoa,
                    "id_produto": id_produto
                })
            });

            if(res.ok) {
                modalAlt('sucesso', 'Comentario adcionado com sucesso.');
                atualizarComentario();
            } else {
                modalAlt('erro', 'Não foi possivel asicionar seu comentario.')
            }
        } catch (error) {
            modal('Erro de conexao', 'Não foi possivel concluir a operação. Tente novamente mais tarde.')
        }

    } else {
        modalAlt('erro', 'É necessario enviar um texto com caracteres validos.')
    }


}

export default addComentario;