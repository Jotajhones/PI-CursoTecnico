// Função para carregar conteudo de cabecalh9o0 da pagina, dados do cliente;

function carregarHeader(id_pessoa, id_usuario) {

    fetch(`http://localhost:8080/blusablusas/users/${id_pessoa}/${id_usuario}`)
        .then(res => res.json())
        .then(res => {

            res.forEach(element => {
                
                document.querySelector('#spanId').innerHTML += element.id_usuario;
                document.querySelector('#spanNome').innerHTML += element.nome;
                document.querySelector('#spanEmail').innerHTML += element.email;
                document.querySelector('#spanCpf').innerHTML += element.cpf;
                document.querySelector('#spanGenero').innerHTML += element.genero;

                const data = new Date(element.data_nascimento).toLocaleDateString();

                document.querySelector('#spanNascimento').innerHTML += data;
                document.querySelector('#spanDesconto').innerHTML += element.desconto;
                document.querySelector('#spanFidelidade').innerHTML += element.fidelidade;
                document.querySelector('#spanSituacao').innerHTML += element.situacao;
            });
        });

}

export default carregarHeader;