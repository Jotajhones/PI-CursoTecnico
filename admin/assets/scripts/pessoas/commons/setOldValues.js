
// FGunção para setar os valores de determinados inputs em estados especificos da aplicação;
function setOldValues(object) {

    document.querySelector('#id_pessoa').value = object.id_pessoa ?? null;
    document.querySelector('#id_usuario').value = object.id_usuario ?? null;
    document.querySelector('#nome').value = object.nome ?? null;
    document.querySelector('#email').value = object.email ?? null;
    document.querySelector('#cpf').value = object.cpf ?? null;
    document.querySelector('#genero').value = object.genero ?? null;
    document.querySelector('#nascimento').value = object.nascimento ?? null;
    document.querySelector('#fidelidade').value = object.fidelidade ?? null;
    document.querySelector('#searchbar').value = object.searchbar ?? null;
    // document.querySelector('#rdAtivo').value = object.rdAtivo ?? null;
    // document.querySelector('#rdInativo').value = object.rdInativo ?? null;
}

export default setOldValues;