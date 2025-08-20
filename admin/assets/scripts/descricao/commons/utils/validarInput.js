//Marcar inputs não preenchidos
function marcarInput(input) {
    input.style.background = "var(--fundo3)";
    input.style.borderBottom = "solid 1.5px red"
}

//restaura o padrão dos inputs
function restaurarInput(input) {
    input.style.background = "#FFFFFF";
    input.style.borderBottom = "solid 1px var(--cor4)"
}

//função para validar inputs preenchidos
function validarInput(input) {
    if (!input.value) {
        marcarInput(input);
        return false;
    } else {
        restaurarInput(input);
        return true;
    }
}

export default validarInput;
