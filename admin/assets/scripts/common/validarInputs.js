//Marcar inputs não preenchidos
function marcarInput(input) {
    input.style.background = "var(--fundo3)";
    input.style.borderBottom = "solid 2px red"
}

//restaura o padrão dos inputs
function restaurarInput(input) {
    input.style.background = "#CCCCCC";
    input.style.borderBottom = "solid 2px var(--cor3)"
}

//nem precisa né...
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