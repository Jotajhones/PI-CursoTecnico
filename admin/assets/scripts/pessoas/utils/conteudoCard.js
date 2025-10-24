import preecherForm from "./preencherForm.js";
import descricao from "./descricao.js";

//função para inserir conteudo aos card da container de resultados;
function conteudoCard(container, object, dateFront, dateBack) {
    const card = document.createElement("div");
    card.className = "resultadoCardUsers";

    card.onclick = () => {
        preecherForm(
            object.id_pessoa,
            object.id_usuario,
            object.nome,
            object.email,
            object.cpf,
            object.genero,
            dateBack,
            object.desconto,
            object.fidelidade,
            object.situacao
        );
    }; 

    card.ondblclick = () => {
        descricao(object.id_pessoa, object.id_usuario);
    };

    const criarSpan = (label, valor) => {
        const span = document.createElement("span");
        const strong = document.createElement("strong");
        strong.textContent = label;
        span.appendChild(strong);
        span.append(` ${valor}`);
        return span;
    };

    card.appendChild(criarSpan("ID: ", object.id_usuario));
    card.appendChild(criarSpan("Nome: ", object.nome));
    card.appendChild(criarSpan("Email: ", object.email));
    card.appendChild(criarSpan("CPF: ", object.cpf));
    card.appendChild(criarSpan("Genero: ", object.genero));
    card.appendChild(criarSpan("Nascimento: ", dateFront));
    card.appendChild(criarSpan("Desconto:", object.desconto));
    card.appendChild(criarSpan("Fidelidade:", object.fidelidade));
    card.appendChild(criarSpan("Situação:", object.situacao));
    
    container.appendChild(card);
}

export default conteudoCard;