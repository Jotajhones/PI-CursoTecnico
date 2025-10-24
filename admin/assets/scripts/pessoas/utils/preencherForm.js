//função para adicionar evento de click aos cards que irao passar seus valores para os inputs
function preecherForm( id_pessoa, id_usuario, nome, email, cpf, genero, date, desconto, fidelidade, situacao) {

    document.querySelector('#id_pessoa').value = id_pessoa;
    document.querySelector('#id_usuario').value = id_usuario;
    document.querySelector('#nome').value = nome;
    document.querySelector('#email').value = email;
    document.querySelector('#cpf').value = cpf;
    document.querySelector('#genero').value = genero;
    document.querySelector('#nascimento').value = date;
    document.querySelector('#desconto').value = desconto;
    document.querySelector('#fidelidade').value = fidelidade;
    document.querySelector('#situacao').value = situacao;

}

export default preecherForm;