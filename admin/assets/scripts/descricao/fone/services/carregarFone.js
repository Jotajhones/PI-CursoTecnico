import cardTelefone from "../utils/cardTelefone.js";

//Função para carregar conteudo do Container telefone;
function carregarFone(id_pessoa) {

    const TelefoneVazio = {
        "id_pessoa": null,
        "ddd": null,
        "numero": null,
        "tipo": ""
    }

    fetch('http://localhost:8080/blusablusas/fone', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id_pessoa": id_pessoa
        })
    })
        .then(res => res.json())
        .then(res => {
            let count = 0;

            //verificando se a response veio OK e vazia, se sim ele carrega os cards de endereco com conteudoda response
            if (res.length > 0) {

                res.forEach(element => {
                    cardTelefone(element, count);
                    count++
                });
                //e logo depois ele carrega um card Vazio
                cardTelefone(TelefoneVazio, count);
            } else {
                //caso não tenha response ou seja vazia, é carregado somente um card vazio;
                cardTelefone(TelefoneVazio, count);
            }
        })
}

export default carregarFone;
