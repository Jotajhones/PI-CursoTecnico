function createCardItem(label, value) {
    const item = document.createElement('p');
    item.classList.add('card__item');
    item.textContent = label;

    const valueSpan = document.createElement('span');
    valueSpan.classList.add('card__value');
    valueSpan.textContent = value;

    item.appendChild(valueSpan);
    return item;
}

function cardHistorico(container, venda) {
    const dataFront = new Date(venda.data_compra).toLocaleDateString();

    let cardClass;
    let titleText;

    if (venda.situacao === "andamento") {
        cardClass = 'card--andamento';
        titleText = 'ANDAMENTO';
    } else if (venda.situacao === "cancelada") {
        cardClass = 'card--cancelada';
        titleText = 'CANCELADA';
    } else if (venda.situacao === "confirmada") {
        cardClass = 'card--confirmada';
        titleText = 'CONFIRMADA';
    } else {
        return;
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', cardClass);

    const header = document.createElement('header');
    header.classList.add('card__header');

    const title = document.createElement('h3');
    title.classList.add('card__title');
    title.textContent = titleText;

    header.appendChild(title);

    const body = document.createElement('div');
    body.classList.add('card__body');

    body.appendChild(createCardItem('Valor total: ', venda.valor_total));
    body.appendChild(createCardItem('Data da compra: ', dataFront));
    body.appendChild(createCardItem('Desconto: ', venda.desconto));
    body.appendChild(createCardItem('Prazo: ', venda.prazo));
    body.appendChild(createCardItem('Parcela: ', venda.parcela));

    cardDiv.appendChild(header);
    cardDiv.appendChild(body);

    container.appendChild(cardDiv);

    cardDiv.addEventListener('click', () => {
        window.location.href = `./carrinho.html?id_venda=${venda.id_venda}&id_usuario=${venda.id_usuario}`;
    })
}

export default cardHistorico;