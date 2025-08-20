import cardEndereco from "../utils/cardEndereco.js";


// Função que carrega o conteudo do container Main->Endereço na pagina desacrição
function carregarEndereco(id_pessoa) {

    //Valores vazios, para gerar card não preenchido;
    const enderecoVazio = {
        "id_pessoa": null,
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

            //verificando se a response veio OK e vazia, se sim ele carrega os cards de endereco com conteudoda response
            if (res.length > 0) {

                res.forEach(element => {
                    cardEndereco(element, count);
                    count++
                });
                //e logo depois ele carrega um card Vazio
                cardEndereco(enderecoVazio, count);
            } else {

                //caso não tenha response ou seja vazia, é carregado somente um card vazio;
                cardEndereco(enderecoVazio, count);
            }
        })
}

export default carregarEndereco;