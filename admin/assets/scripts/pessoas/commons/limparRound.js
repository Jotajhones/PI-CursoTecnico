import getInputs from "./getInputs.js";

// FUnção para limpar especificamente os radioButtons;
function limparRound() {
    const input = getInputs();

    input.rdAtivo.checked = false;
    input.rdInativo.checked = false;
}

export default limparRound;