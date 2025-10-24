// Função auxiliar para formatar a situação da venda para exibição
function formatarSituacaoVenda(situacao) {
    switch (situacao) {
        case 'andamento':
            return 'Em andamento';
        case 'confirmada':
            return 'Confirmada';
        case 'cancelada':
            return 'Cancelada';
        default:
            return 'Situação Desconhecida';
    }
}

// função para pegar dados que preencherção cabecalho
function carregarCartHeader(id_venda) {

    fetch(`http://localhost:8080/blusablusas/vendas/${id_venda}`)
        .then(res => res.json())
        .then(res => {

            res.forEach(element => {

                const spanId = document.createElement('span');
                spanId.id = 'spanId';
                const strongId = document.createElement('strong');
                strongId.textContent = 'ID Venda:';
                spanId.appendChild(strongId);
                spanId.appendChild(document.createTextNode(' ' + element.id_venda));

                const spanData = document.createElement('span');
                spanData.id = 'spanData';
                const strongData = document.createElement('strong');
                strongData.textContent = 'Data:';
                spanData.appendChild(strongData);
                spanData.appendChild(document.createTextNode(' ' + new Date(element.data_compra).toLocaleDateString()));

                const spanTotal = document.createElement('span');
                spanTotal.id = 'spanTotal';
                const strongTotal = document.createElement('strong');
                strongTotal.textContent = 'Total: R$';
                spanTotal.appendChild(strongTotal);
                spanTotal.appendChild(document.createTextNode(' ' + element.valor_total));

                const spanUsuario = document.createElement('span');
                spanUsuario.id = 'spanUsuario';
                const strongUsuario = document.createElement('strong');
                strongUsuario.textContent = 'Usuário:';
                spanUsuario.appendChild(strongUsuario);
                spanUsuario.appendChild(document.createTextNode(' ' + element.nome));

                const spanSituacao = document.createElement('span');
                spanSituacao.id = 'spanSituacao';
                const strongSituacao = document.createElement('strong');
                strongSituacao.textContent = 'Situação: ';
                spanSituacao.appendChild(strongSituacao);

                // Início da Alteração: Substituindo SELECT por um SPAN não editável
                const spanSituacaoValor = document.createElement('span');
                spanSituacaoValor.id = 'situacaoVenda'; // Mantém o ID original para CSS/referência
                
                // Usa a função auxiliar para garantir a exibição correta (ex: "Confirmada")
                spanSituacaoValor.textContent = formatarSituacaoVenda(element.situacao); 

                spanSituacao.appendChild(spanSituacaoValor);
                // Fim da Alteração
                
                // Adiciona os elementos ao container desejado
                const headerContainer = document.querySelector('.cardVendasHeader');
                headerContainer.innerHTML = '';
                headerContainer.appendChild(spanId);
                headerContainer.appendChild(spanData);
                headerContainer.appendChild(spanTotal);
                headerContainer.appendChild(spanUsuario);
                headerContainer.appendChild(spanSituacao);

                // Atualiza o preço total
                document.querySelector('#VendaPrecoTotal').innerHTML = `<b>${element.valor_total}</b>`;
                
            });

        });
}

export default carregarCartHeader;