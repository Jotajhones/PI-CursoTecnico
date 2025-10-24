// Função para receber strings de endereço após digitar 8 nyúmero no input CEP;
function getEndereco(cep, id) {

    if (!id) {
        if (cep.length === 8) {

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json())
                .then(res => {

                    if (res.erro === "true") {
                        document.querySelector(`#rua`).value = "";
                        document.querySelector(`#cidade`).value = "";
                        document.querySelector(`#bairro`).value = "";
                        document.querySelector(`#bairro`).value = "";
                        document.querySelector(`#uf`).value = "";
                        
                        return
                    } else {
                        document.querySelector(`#rua`).value = res.logradouro;
                        document.querySelector(`#cidade`).value = res.localidade;
                        document.querySelector(`#bairro`).value = res.bairro;

                        const uf = getUfSigla(res.estado)

                        document.querySelector(`#uf`).value = uf;

   
                    }
                });
        }

    } else {

        if (cep.length === 8) {

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json())
                .then(res => {

                    if (res.erro === "true") {
                        document.querySelector(`#rua${id}`).value = "";
                        document.querySelector(`#cidade${id}`).value = "";
                        document.querySelector(`#bairro${id}`).value = "";
                        document.querySelector(`#bairro${id}`).value = "";
                        document.querySelector(`#uf${id}`).value = "";

                        return
                    } else {
                        document.querySelector(`#rua${id}`).value = res.logradouro;
                        document.querySelector(`#cidade${id}`).value = res.localidade;
                        document.querySelector(`#bairro${id}`).value = res.bairro;

                        const uf = getUfSigla(res.estado)

                        document.querySelector(`#uf${id}`).value = uf;
                    }
                });
        }
    }
}

// Função que vai retornar a sigla  da uf recebido na função getEndereco que retornara o nome por extenso, convertendo para siga para satiusfazer o banco de dados;
function getUfSigla(estado) {
    const estados = {
        "Acre": "AC",
        "Alagoas": "AL",
        "Amapá": "AP",
        "Amazonas": "AM",
        "Bahia": "BA",
        "Ceará": "CE",
        "Distrito Federal": "DF",
        "Espírito Santo": "ES",
        "Goiás": "GO",
        "Maranhão": "MA",
        "Mato Grosso": "MT",
        "Mato Grosso do Sul": "MS",
        "Minas Gerais": "MG",
        "Pará": "PA",
        "Paraíba": "PB",
        "Paraná": "PR",
        "Pernambuco": "PE",
        "Piauí": "PI",
        "Rio de Janeiro": "RJ",
        "Rio Grande do Norte": "RN",
        "Rio Grande do Sul": "RS",
        "Rondônia": "RO",
        "Roraima": "RR",
        "Santa Catarina": "SC",
        "São Paulo": "SP",
        "Sergipe": "SE",
        "Tocantins": "TO"
    };
    return estados[estado] || "";
}

export default getEndereco;