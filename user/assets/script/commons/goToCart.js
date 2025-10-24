function gotoCart(id_venda, id_usuario) {
    window.location.href = `./carrinho.html?id_venda=${id_venda}&id_usuario=${id_usuario}`;
};


export default gotoCart;