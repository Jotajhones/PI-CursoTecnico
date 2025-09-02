import getInputs from "./getInputs.js";

function limparRound() {
    const input = getInputs();

    input.rdAtivo.checked = false;
    input.rdInativo.checked = false;
}

export default limparRound;