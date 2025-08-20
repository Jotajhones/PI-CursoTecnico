import getInputs from "./getInputs.js";


// Função para limpar os radio Buttons por conta de um Bug durante o processo de filtragem;
function limparRound() {
    const input = getInputs();

    input.rdAtivo.checked = false;
    input.rdInativo.checked = false;
}

export default limparRound;