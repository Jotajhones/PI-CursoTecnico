import preecherForm  from "./preencherForm.js";

//função para inserir conteudo aos card da container de resultados;
function conteudoCard(container, object) {
    const card = document.createElement("div");
    card.className = "resultadoCardProd";

    card.onclick = () => {
        preecherForm(
            object.id_descricao,
            object.id_produto,
            object.denominacao,
            object.preco,
            object.quantidade_estoque,
            object.descricao,
            object.imagem_url,
            object.cor,
            object.tecido,
            object.categoria,
            object.tamanho,
            object.situacao
        );
    };

    const criarSpan = (label, valor) => {
        const span = document.createElement("span");
        const strong = document.createElement("strong");
        strong.textContent = label;
        span.appendChild(strong);
        span.append(` ${valor}`);
        return span;
    };

    card.appendChild(criarSpan("ID: ", object.id_produto));
    card.appendChild(criarSpan("Produto:", object.denominacao));
    card.appendChild(criarSpan("R$ ", object.preco));
    card.appendChild(criarSpan("Estoque:", object.quantidade_estoque));
    card.appendChild(criarSpan("Descricao:", object.descricao));
    card.appendChild(criarSpan("URL:", object.imagem_url));
    card.appendChild(criarSpan("Cor:", object.cor));
    card.appendChild(criarSpan("Tecido:", object.tecido));
    card.appendChild(criarSpan("Categoria:", object.categoria));
    card.appendChild(criarSpan("Tamanho:", object.tamanho));
    card.appendChild(criarSpan("Situação:", object.situacao));

    container.appendChild(card);
}

export default conteudoCard;