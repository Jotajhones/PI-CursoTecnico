//função que incorpora uma div informado erro 404, utilizada em momentos que não tiver nada para ser renderizado na tabela de resultados.
function error503(container) {

    const element = document.createElement("div");
    element.className = "erro503";
    element.id = "erro503";

    const imagem = document.createElement("img");
    imagem.src = "../imgs/icons/indisponivel.png";
    imagem.alt = "Error 503 - serviço indisponivel!";

    const titulo = document.createElement("h3");
    titulo.textContent = "Error 503 - serviço indisponivel!";

    element.appendChild(imagem);
    element.appendChild(titulo);

    container.innerHTML = "";
    container.appendChild(element);
}

export default error503;