
function indiceCarrinho(number) {

    const carrinhoIndice = document.querySelectorAll('.carrinhoIndice');

    carrinhoIndice.forEach(element => {
        element.innerHTML = `${number}`;
    });
}

export default indiceCarrinho;