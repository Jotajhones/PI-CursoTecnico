//função que incorpora uma div informado erro 404, utilizada em momentos que não tiver nada para ser renderizado na tabela de resultados.
function erro404(container) {

    const element = document.createElement("div");
    element.className = "erro404";
    element.id = "erro404";

    const emoticon = document.createElement("span");
    emoticon.textContent = ":(";

    const imagem = document.createElement("img");
    imagem.src = "../imgs/icons/erro-404.png";
    imagem.alt = "Error 404, não encontrado!";

    const titulo = document.createElement("h3");
    titulo.textContent = "Erro 404 - Não encontrado";

    element.appendChild(emoticon);
    element.appendChild(imagem);
    element.appendChild(titulo);

    container.innerHTML = "";
    container.appendChild(element);
}

export default erro404;