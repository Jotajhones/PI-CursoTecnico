import getValues from "./getValues.js"

// Mascara de CPF
function cpf() {

    const valores = getValues();
    let cpf = valores.cpf

    cpf = cpf.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
    cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2')
    cpf = cpf.replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada

    document.querySelector("#cpf").value = cpf;
}

export default cpf;