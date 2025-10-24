//funçao para recuperar o valor qdos inputs em momentos que a função modal() é invocada e que por algum motivo limpa todos os valores da pagina;
//por se tratar de uma função que tem que preencher os values no estado atual em que a função é invocada não poderia substitui a chamada dos inputs para preenchimento por nenhuma das função ja criadas, pois elas sempre são estados anteriores ao momento em que a tela é limpa;

function setOldValues(object) {

    document.querySelector('#id_produto').value = object.id_produto ?? null;
    document.querySelector('#id_descricao').value = object.id_descricao ?? null;
    document.querySelector('#produto').value = object.denominacao ?? null;
    document.querySelector('#preco').value = object.preco ?? null;
    document.querySelector('#estoque').value = object.estoque ?? null;
    document.querySelector('#descricao').value = object.descricao ?? null;
    document.querySelector('#url').value = object.url ?? null;
    document.querySelector('#cor').value = object.cor ?? null;
    document.querySelector('#tecido').value = object.tecido ?? null;
    document.querySelector('#categoria').value = object.categoria ?? null;
    document.querySelector('#tamanho').value = object.tamanho ?? null;
    document.querySelector('#situacao').value = object.situacao
    document.querySelector("#searchbar").value = object.searchbar ?? null;
}

export default setOldValues;