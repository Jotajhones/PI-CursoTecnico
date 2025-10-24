import cardEndereco from "../utils/cardEndereco.js";

// Função para pegar o conteudo dos endereços por cliente;

function carregarEndereco(id_pessoa) {

        const enderecoVazio = {
        "id_pessoa": id_pessoa,
        "id_endereco": null,
        "cep": null,
        "rua": null,
        "cidade": null,
        "bairro": null,
        "complemento": null,
        "numero": null,
        "uf": ""
    }

    fetch('http://localhost:8080/blusablusas/endereco', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id_pessoa": id_pessoa
        })
    })
        .then(res => res.json())
        .then(res => {
            let count = 0;

            if (res.length > 0) {

                res.forEach(element => {
                    cardEndereco(element, count);
                    count++
                });
                cardEndereco(enderecoVazio, count);
            } else {
                cardEndereco(enderecoVazio, count);
            }
        })
}

export default carregarEndereco;