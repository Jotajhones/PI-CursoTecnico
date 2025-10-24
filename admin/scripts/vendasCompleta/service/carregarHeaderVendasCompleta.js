
// função para pegar dados que preencherção cabecalho
function carregarHeaderVendasCompleta(id_venda) {

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

                const selectSituacao = document.createElement('select');
                selectSituacao.name = 'situacaoVenda';
                selectSituacao.id = 'situacaoVenda';

                const optionSelecione = document.createElement('option');
                optionSelecione.value = '';
                optionSelecione.selected = true;
                optionSelecione.disabled = true;
                optionSelecione.textContent = 'Selecione';

                const optionAndamento = document.createElement('option');
                optionAndamento.value = 'andamento';
                optionAndamento.textContent = 'Em andamento';

                const optionConfirmada = document.createElement('option');
                optionConfirmada.value = 'confirmada';
                optionConfirmada.textContent = 'Confirmada';

                const optionCancelada = document.createElement('option');
                optionCancelada.value = 'cancelada';
                optionCancelada.textContent = 'Cancelada';

                selectSituacao.appendChild(optionSelecione);
                selectSituacao.appendChild(optionAndamento);
                selectSituacao.appendChild(optionConfirmada);
                selectSituacao.appendChild(optionCancelada);

                selectSituacao.value = element.situacao || '';

                spanSituacao.appendChild(selectSituacao);

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
                
                // document.querySelector('#spanId').innerHTML += element.id_venda;
                // document.querySelector('#spanData').innerHTML += new Date(element.data_compra).toLocaleDateString();
                // document.querySelector('#spanTotal').innerHTML += element.valor_total;
                // document.querySelector('#spanUsuario').innerHTML += element.nome;
                // document.querySelector('#situacaoVenda').value = element.situacao;
                // document.querySelector('#VendaPrecoTotal').innerHTML += `<b>${element.valor_total}</b>`; 
            });

        });


}

export default carregarHeaderVendasCompleta;