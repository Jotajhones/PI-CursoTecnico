
//Função para limpar os valores dos inputs
function limparForm() {

    document.querySelector('#id_pessoa').value = "";
    document.querySelector('#id_usuario').value = "";
    document.querySelector('#nome').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('#cpf').value = "";
    document.querySelector('#genero').value = "";
    document.querySelector('#nascimento').value = "";
    document.querySelector('#desconto').value = "";
    document.querySelector('#fidelidade').value = "";

}

export default limparForm;