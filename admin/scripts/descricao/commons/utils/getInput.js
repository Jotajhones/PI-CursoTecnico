// Função para pegar elemento HTML input;

function getInputs() {

    const containerTelefone = document.querySelector('.containerTel');
    const containerEndereco = document.querySelector('.containerEndereco');

    const input = {
        containerTelefone,
        containerEndereco
    }

    return input;
}

export default getInputs;