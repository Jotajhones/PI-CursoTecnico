function controlarBotoesVenda(item) {
    const situacao = item.situacao || '';
    const dataCompraStr = item.dataCompra;

    const btnHistorico = document.getElementById('btnHistorico');
    const btnAlterar = document.getElementById('btnAlterar');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnComprar = document.getElementById('btnComprar');

    const todosBotoes = [btnAlterar, btnCancelar, btnComprar];

    const desativar = (btn) => {
        if (btn) {
            btn.disabled = true;
            btn.classList.add('btn-desativado');
        }
    };
    
    const ativar = (btn) => {
        if (btn) {
            btn.disabled = false;
            btn.classList.remove('btn-desativado');
        }
    };

    [btnHistorico, ...todosBotoes].forEach(ativar);

    if (situacao.toUpperCase() === 'CANCELADA') {
        todosBotoes.forEach(desativar);
        ativar(btnHistorico);
        return;
    }
    
    if (dataCompraStr) {
        const dataAtual = new Date();
        const dataCompraObj = new Date(dataCompraStr);
        
        const dataLimiteCancelamento = new Date(dataCompraObj);
        dataLimiteCancelamento.setDate(dataCompraObj.getDate() + 7);

        if (dataAtual > dataLimiteCancelamento) {
            desativar(btnAlterar);
            desativar(btnCancelar);
        }
    }
}

function cardItensByVenda(tabela, item, count) {

    const ID_TOTAL_PARCIAL = 'VendaPrecoTotalParcial';
    const ID_CONTAINER_TOTAL_PARCIAL = 'divTotalParcialRecalculado';

    const formatarBRL = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor);
    };

    const atualizarTotalParcial = () => {

        let containerTotalParcial = document.getElementById(ID_CONTAINER_TOTAL_PARCIAL);
        let elementoTotalParcial = document.getElementById(ID_TOTAL_PARCIAL);

        if (!containerTotalParcial) {
            containerTotalParcial = document.createElement('div');
            containerTotalParcial.className = 'produtoItem';
            containerTotalParcial.id = ID_CONTAINER_TOTAL_PARCIAL;

            containerTotalParcial.style.borderBottom = '1px dashed #ccc';
            containerTotalParcial.style.paddingBottom = '5px';

            const divLabel = document.createElement('div');
            const spanTotal = document.createElement('span');
            spanTotal.className = 'total';
            spanTotal.innerHTML = '<strong>TOTAL PARCIAL</strong>';
            divLabel.appendChild(spanTotal);

            const divValores = document.createElement('div');
            divValores.className = 'produtoValores';

            elementoTotalParcial = document.createElement('div');
            elementoTotalParcial.className = 'VendaPrecoTotal';
            elementoTotalParcial.id = ID_TOTAL_PARCIAL;

            divValores.appendChild(elementoTotalParcial);

            containerTotalParcial.append(divLabel, divValores);

            const cardVendaCompleta = tabela.closest('.cardVendaCompleta');
            const divTotalFixo = cardVendaCompleta.querySelector('.produtoItem');

            if (divTotalFixo) {
                cardVendaCompleta.insertBefore(containerTotalParcial, divTotalFixo);
            } else {
                cardVendaCompleta.appendChild(containerTotalParcial);
            }
        }

        const itensDaVenda = tabela.querySelectorAll('.produtoItem-cliente');
        let totalGeral = 0;

        itensDaVenda.forEach(itemCard => {
            const precoUnitario = parseFloat(itemCard.getAttribute('data-price'));

            const inputQuantidade = itemCard.querySelector('.inputQuantidadeVenda');
            let quantidade = parseInt(inputQuantidade.value);

            if (isNaN(precoUnitario) || isNaN(quantidade) || quantidade < 1) {
                return;
            }

            totalGeral += precoUnitario * quantidade;
        });

        if (elementoTotalParcial) {
            elementoTotalParcial.innerHTML = `<strong>R$ </strong> ${formatarBRL(totalGeral)}`;
        }
    };

    const precoBase = parseFloat(String(item.preco).replace(',', '.'));

    const recalcularSubtotal = (itemCard, inputElement) => {
        const precoUnitario = parseFloat(itemCard.getAttribute('data-price'));

        if (isNaN(precoUnitario)) {
            const subtotalElement = itemCard.querySelector('.produtoSubtotal-destaque');
            subtotalElement.innerHTML = `<strong>Total Item: R$</strong> 0,00`;
            atualizarTotalParcial();
            return;
        }

        let novaQuantidade = parseInt(inputElement.value);
        if (isNaN(novaQuantidade) || novaQuantidade < 1) {
            novaQuantidade = 1;
            inputElement.value = 1;
        }

        const novoSubtotal = precoUnitario * novaQuantidade;

        const subtotalElement = itemCard.querySelector('.produtoSubtotal-destaque');
        subtotalElement.innerHTML = `<strong>Total Item: R$</strong> ${formatarBRL(novoSubtotal)}`;

        atualizarTotalParcial();
    };

    const controlarQuantidadeItem = (event) => {
        const botaoClicado = event.currentTarget;

        const produtoItem = botaoClicado.closest('.produtoItem-cliente');
        const inputQuantidade = produtoItem.querySelector('.inputQuantidadeVenda');

        let valorAtual = parseInt(inputQuantidade.value);

        if (isNaN(valorAtual) || valorAtual < 1) {
            valorAtual = 1;
        }

        if (botaoClicado.classList.contains('mais')) {
            valorAtual++;
        } else if (botaoClicado.classList.contains('menos')) {
            if (valorAtual > 1) {
                valorAtual--;
            } else {
                return;
            }
        }

        inputQuantidade.value = valorAtual;

        recalcularSubtotal(produtoItem, inputQuantidade);
    };

    const removerItem = (event) => {
        event.preventDefault();
        const botaoRemover = event.currentTarget;
        const produtoItem = botaoRemover.closest('.produtoItem-cliente');

        produtoItem.classList.add('removendo');

        setTimeout(() => {
            if (produtoItem.parentElement) {
                produtoItem.parentElement.removeChild(produtoItem);
                atualizarTotalParcial();
            }
        }, 300);
    };

    const produtoItem = document.createElement('div');
    produtoItem.className = 'produtoItem-cliente';
    produtoItem.setAttribute('data-price', precoBase);

    const produtoDescricao = document.createElement('div');
    produtoDescricao.className = 'produtoDescricao';
    
    const divImagemProduto = document.createElement('div');
    divImagemProduto.className = 'imagemProduto-cliente';

    if (item.imagem_url) {
        divImagemProduto.style.backgroundImage = `url('${item.imagem_url}')`;
    }

    const divControleQuantidade = document.createElement('div');
    divControleQuantidade.className = 'controleQuantidade';

    const btnMenos = document.createElement('button');
    btnMenos.textContent = '-';
    btnMenos.className = 'btnControle menos';
    btnMenos.type = 'button';
    btnMenos.addEventListener('click', controlarQuantidadeItem);

    const inputQuantidade = document.createElement('input');
    inputQuantidade.type = 'number';
    inputQuantidade.value = item.quantidade;
    inputQuantidade.className = 'inputQuantidadeVenda';
    inputQuantidade.min = 1;
    inputQuantidade.max = 99;
    inputQuantidade.id = `inputQuantidade-${count}`;

    inputQuantidade.addEventListener('change', (e) => {
        recalcularSubtotal(produtoItem, e.target);
    });

    const btnMais = document.createElement('button');
    btnMais.textContent = '+';
    btnMais.className = 'btnControle mais';
    btnMais.type = 'button';
    btnMais.addEventListener('click', controlarQuantidadeItem);

    divControleQuantidade.append(btnMenos, inputQuantidade, btnMais);

    const spanNome = document.createElement('span');
    spanNome.className = 'produtoNome-destaque';
    const strongNome = document.createElement('strong');
    strongNome.textContent = item.denominacao;
    spanNome.appendChild(strongNome);

    const infoPrincipalDiv = document.createElement('div');
    infoPrincipalDiv.className = 'infoPrincipal-cliente';
    
    infoPrincipalDiv.append(divImagemProduto, divControleQuantidade, spanNome);

    const btnRemover = document.createElement('button');
    btnRemover.className = 'btnRemoverItem';
    btnRemover.type = 'button';
    btnRemover.innerHTML = '&#x2715;';
    btnRemover.title = 'Remover item do carrinho';

    btnRemover.addEventListener('click', removerItem);

    produtoDescricao.append(infoPrincipalDiv, btnRemover);

    const produtoValores = document.createElement('div');
    produtoValores.className = 'produtoValores-cliente';

    const precoUnitario = document.createElement('div');
    precoUnitario.className = 'produtoPrecoUnitario';
    precoUnitario.innerHTML = `P. Unitario: R$ ${formatarBRL(precoBase)}`;

    const subtotal = document.createElement('div');
    subtotal.className = 'produtoSubtotal-destaque';
    const subtotalInicial = item.quantidade * precoBase;
    subtotal.innerHTML = `<strong>Total Item: R$</strong> ${formatarBRL(subtotalInicial)}`;

    produtoValores.append(precoUnitario, subtotal);

    produtoItem.append(produtoDescricao, produtoValores);

    const inputIdItensVenda = document.createElement('input');
    inputIdItensVenda.type = 'number';
    inputIdItensVenda.hidden = true;
    inputIdItensVenda.value = item.id_itens_venda;
    inputIdItensVenda.className = 'inputId_itens_venda';
    inputIdItensVenda.id = `inputIdItensVendas-${count}`
    produtoItem.appendChild(inputIdItensVenda);

    const inputIdProduto = document.createElement('input');
    inputIdProduto.type = 'number';
    inputIdProduto.hidden = true;
    inputIdProduto.value = item.id_produto;
    inputIdProduto.className = 'inputId_produto';
    inputIdProduto.id = `inputIdProduto-${count}`
    produtoItem.appendChild(inputIdProduto);


    tabela.appendChild(produtoItem);

    atualizarTotalParcial();
    
    if (count === 1) {
        controlarBotoesVenda(item);

    }
}

export default cardItensByVenda;