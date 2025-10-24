import commentCard from "../utils/commentCard.js";

async function atualizarComentario() {

    const id_produto = new URLSearchParams(window.location.search).get('id_produto');
    const comentariosSection = document.querySelector('.comentsSection');
    comentariosSection.innerHTML = "";

    const res = await fetch(`http://localhost:8080/blusablusas/comentarios/produto/${id_produto}`)

    if (res.ok) {
        const comentarios = await res.json();

        comentarios.forEach(comentario => {
            commentCard(comentario, comentariosSection);
        });
    }
}

export default atualizarComentario;