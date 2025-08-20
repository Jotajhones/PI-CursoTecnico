function limparForm() {

    document.querySelector('#id_produto').value = "";
    document.querySelector('#id_descricao').value = "";
    document.querySelector('#produto').value = "";
    document.querySelector('#preco').value = "";
    document.querySelector('#estoque').value = "";
    document.querySelector('#descricao').value = "";
    document.querySelector('#url').value = "";
    document.querySelector('#cor').value = "";
    document.querySelector('#tecido').value = "";
    document.querySelector('#categoria').value = "";
    document.querySelector('#tamanho').value = "";
    document.querySelector('#situacao').value = "";
}

export default limparForm;