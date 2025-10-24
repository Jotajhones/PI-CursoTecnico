import calcularIndiceCarrinho from "./calcularIndiceCarrinho.js";
import modalAlt from "./modalAlt.js";

function addCarrinho(produto) {

    let user = window.localStorage.getItem("BlusasBlusasUser")
    user = JSON.parse(user)
    const id_venda = user.ultima_venda;

    fetch(`http://localhost:8080/blusablusas/vendas/${id_venda}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "preco": produto.preco,
            "id_produto": produto.id_produto 
        })
    })
        .then(res => {
            if (res.ok) {
                modalAlt('sucesso', `1x ${produto.denominacao} adicionado com sucesso ao seu carrinho.`);
                calcularIndiceCarrinho();
                return res.json()
            } else if (!res.ok) {
                modalAlt('erro', 'Não foi possivel adicionar o produto ao carrinho.');
                calcularIndiceCarrinho();                
            }
        })
        .then(res => {
            calcularIndiceCarrinho();
            
        })
}

export default addCarrinho;