function limparRound() {
    const ativo = document.querySelector("#rdAtivo");
    const esgotado = document.querySelector("#rdEsgotado");
    const descontinuado = document.querySelector("#rdDescontinuado");
    ativo.checked = false;
    esgotado.checked = false;
    descontinuado.checked = false;
}

export default limparRound;