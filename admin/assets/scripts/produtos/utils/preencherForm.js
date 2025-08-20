//função para adicionar evento de click aos cards que irao passar seus valores para os inputs
function preecherForm(id_descricao, id_produto, denominacao, preco, estoque, descricao, url, cor, tecido, categoria, tamanho, situacao) {

    document.querySelector('#id_produto').value = id_produto;
    document.querySelector('#id_descricao').value = id_descricao;
    document.querySelector('#produto').value = denominacao;
    document.querySelector('#preco').value = preco;
    document.querySelector('#estoque').value = estoque;
    document.querySelector('#descricao').value = descricao;
    document.querySelector('#url').value = url;
    document.querySelector('#cor').value = cor;
    document.querySelector('#tecido').value = tecido;
    document.querySelector('#categoria').value = categoria;
    document.querySelector('#tamanho').value = tamanho;
    document.querySelector('#situacao').value = situacao;
}

export default preecherForm;