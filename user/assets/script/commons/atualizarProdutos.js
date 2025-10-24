function atualizarProdutos(URL, cardCallback, container) {

    fetch(URL)
        .then(res => res.json())
        .then(res => {
            container.innerHTML = '';

            console.log(res);

            res.forEach(produto => {
                
                cardCallback(container, produto);
            });
        });
}

export default atualizarProdutos;