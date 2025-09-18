
// Função para carregar card de itens por venda especifica;
function cardItensByVenda(tabela, item, count) { 
    // Cria o container principal do item
    const produtoItem = document.createElement('div');
    produtoItem.className = 'produtoItem';

    // Descrição do produto
    const produtoDescricao = document.createElement('div');
    produtoDescricao.className = 'produtoDescricao';

    // Quantidade
    const spanQuantidade = document.createElement('span');
    spanQuantidade.className = 'produtoQuantidade';
    const inputQuantidade = document.createElement('input');
    inputQuantidade.type = 'number';
    inputQuantidade.value = item.quantidade;
    inputQuantidade.className = 'inputQuantidadeVenda';
    inputQuantidade.min = 1;
    inputQuantidade.max = 99;
    spanQuantidade.append(inputQuantidade, ' x');
    inputQuantidade.id = `inputQuantidade-${count}`;

    // Nome do produto
    const spanNome = document.createElement('span');
    spanNome.className = 'produtoNome';
    const strongNome = document.createElement('strong');
    strongNome.textContent = item.denominacao;
    spanNome.append(strongNome, ' ');

    // Descrição (quantidade + nome)
    const descricaoDiv = document.createElement('div');
    descricaoDiv.append(spanQuantidade, spanNome);

    // Select situação
    const selectSituacao = document.createElement('select');
    selectSituacao.name = 'produtoDescricaoSituacao';
    selectSituacao.id = `produtoDescricaoSituacao-${count}`;
    selectSituacao.className = 'selectSituacaoItemVenda';

    const options = [
        { value: '', text: 'Selecione', disabled: true, className: 'optionTitle' },
        { value: 'confirmada', text: 'Confirmada' },
        { value: 'cancelada', text: 'Cancelada' }
    ];
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.disabled) option.disabled = true;
        if (opt.className) option.className = opt.className;
        selectSituacao.appendChild(option);
    });
    selectSituacao.value = item.situacao_item || '';

    produtoDescricao.append(descricaoDiv, selectSituacao);

    // Valores do produto
    const produtoValores = document.createElement('div');
    produtoValores.className = 'produtoValores';

    const precoUnitario = document.createElement('div');
    precoUnitario.className = 'produtoPrecoUnitario';
    precoUnitario.innerHTML = `<strong>Preço Unitário: R$</strong> ${item.preco}`;

    const subtotal = document.createElement('div');
    subtotal.className = 'produtoSubtotal';
    subtotal.innerHTML = `<strong>Subtotal: R$</strong> ${item.valor_total}`;

    produtoValores.append(precoUnitario, subtotal);

    // Monta o item
    produtoItem.append(produtoDescricao, produtoValores);

    const inputIdItensVenda = document.createElement('input');
    inputIdItensVenda.type = 'number';
    inputIdItensVenda.hidden = true;
    inputIdItensVenda.value = item.id_itens_venda;
    inputIdItensVenda.id = `inputIdItensVendas-${count}`
    produtoItem.appendChild(inputIdItensVenda);

    tabela.appendChild(produtoItem);
}

export default cardItensByVenda;