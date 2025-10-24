import goToVendaCompleta from './goToVendaCompleta.js';

// Função para carregar o card de cada venda;
function conteudoCard(container, object, dataBack, dataFront) {

    const card = document.createElement('div');
    card.className = 'resultadoCardVendas';

    const fields = [
        { label: 'ID Venda', value: object.id_venda },
        { label: 'ID Usuario', value: object.id_usuario },
        { label: 'Nome', value: object.nome },
        { label: 'Email', value: object.email },
        { label: 'CPF', value: object.cpf },
        { label: 'Valor total', value: object.valor_total },
        { label: 'Data da compra', value: dataFront },
        { label: 'Desconto', value: object.desconto },
        { label: 'Prazo', value: object.prazo },
        { label: 'Parcela', value: object.parcela },
        { label: 'Situação', value: object.situacao }
    ];

    fields.forEach(field => {
        const span = document.createElement('span');
        span.innerHTML = `<strong>${field.label}: </strong>${field.value}`;
        card.appendChild(span);
    });


    container.appendChild(card);

    card.addEventListener('dblclick', ()=> {
        goToVendaCompleta(object.id_venda, object.id_usuario)
    });
        
  

}

export default conteudoCard;