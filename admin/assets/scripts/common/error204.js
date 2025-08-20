//função que incorpora uma div informado erro 204, utilizada em momentos que não tiver nada para ser renderizado na tabela de resultados.
function error204(container) {

    const element = document.createElement("div");
    element.className = "erro204";
    element.id = "erro204";

    const emoticon = document.createElement("span");
    emoticon.textContent = "\\(o_o)/" ;

    const titulo = document.createElement("h3");
    titulo.textContent = "Erro 204 - Resposta vazia!";

    element.appendChild(emoticon);
    element.appendChild(titulo);

    container.innerHTML = "";
    container.appendChild(element);
}

export default error204;