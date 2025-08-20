//Função que recebe dois ID's como paramentros, e os utiliza para carregar os dados do usuario no header do container Main da pagina descrição;

function carregarHeader(id_pessoa, id_usuario) {

    fetch('http://localhost:8080/blusablusas/users/descricao', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id_pessoa": id_pessoa,
            'id_usuario': id_usuario
        })

    })
        .then(res => res.json())
        .then(res => {

            res.forEach(element => {
                console.log(element);
                document.querySelector('#spanId').innerHTML += element.id_usuario;
                document.querySelector('#spanNome').innerHTML += element.nome;
                document.querySelector('#spanEmail').innerHTML += element.email;
                document.querySelector('#spanCpf').innerHTML += element.cpf;
                document.querySelector('#spanGenero').innerHTML += element.genero;

                const data = new Date(element.dataNascimento).toLocaleDateString();

                document.querySelector('#spanNascimento').innerHTML += data;
                document.querySelector('#spanDesconto').innerHTML += element.desconto;
                document.querySelector('#spanFidelidade').innerHTML += element.fidelidade;
                document.querySelector('#spanSituacao').innerHTML += element.situacao;
            });
        });

}

export default carregarHeader;