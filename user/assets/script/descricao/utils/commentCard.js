function createCommentCard(comment, container) {
    // Objeto 'comment' esperado: { nome: 'João da Silva', data_comentario: '2024-01-15T10:30:00', comentario: 'Ótimo produto!', id_pessoa: 123, produto: 'Blusa X' }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('comentario-card');

    // 1. Cabeçalho (Nome e Data)
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('comentario-header');

    const nomeSpan = document.createElement('span');
    nomeSpan.classList.add('comentario-nome');
    nomeSpan.textContent = comment.nome;

    const dataSpan = document.createElement('span');
    dataSpan.classList.add('comentario-data');
    // Formata a data para padrão brasileiro. Usa comment.data_comentario
    const data = new Date(comment.data_comentario).toLocaleDateString('pt-BR');
    dataSpan.textContent = `em ${data}`;

    headerDiv.appendChild(nomeSpan);
    headerDiv.appendChild(dataSpan);

    // 2. Texto do Comentário
    const textoP = document.createElement('p');
    textoP.classList.add('comentario-texto');
    textoP.textContent = comment.comentario; // Usa comment.comentario (alias do C.texto na View)

    // 3. Input Hidden para id_pessoa
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'id_pessoa';
    hiddenInput.value = comment.id_pessoa; // Usa o id_pessoa real retornado pela View
    
    // Montagem final
    cardDiv.appendChild(headerDiv);
    cardDiv.appendChild(textoP);
    cardDiv.appendChild(hiddenInput);

    container.appendChild(cardDiv);
}

export default createCommentCard;
