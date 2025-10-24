import indiceCarrinho from "./indiceCarrinho.js"

function calcularIndiceCarrinho() {

    let user = window.localStorage.getItem("BlusasBlusasUser")
    user = JSON.parse(user)
    const id_venda = user.ultima_venda; 

    fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`)
        .then(res => {
            if (res.status == 404) {
                indiceCarrinho(0);
            }
            return res.json()
        })
        .then(res => {

            if (res.length > 0) {

                let isIten = 0;

                res.forEach(element => {
                    if (element.situacao_item == "confirmada") {
                        isIten++;
                    }
                }); 
                window.localStorage.setItem('BlusasBlusasCart', JSON.stringify(isIten));
                let itens = window.localStorage.getItem('BlusasBlusasCart');
                itens = JSON.parse(itens);
  
                indiceCarrinho(itens)

            }
        })
}

export default calcularIndiceCarrinho;
