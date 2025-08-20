import getInputs from "../../commons/utils/getInput.js";
import postEndereco from "../services/postEndereco.js";
import updateEndereco from "../services/updateEndereco.js";
import deletarEndereco from "../services/deletarEndereco.js";

// Função auxiliar para nome dos estados
function nomeEstado(sigla) {
    const nomes = {
        AC: "Acre",
        AL: "Alagoas",
        AP: "Amapá",
        AM: "Amazonas",
        BA: "Bahia",
        CE: "Ceará",
        DF: "Distrito Federal",
        ES: "Espírito Santo",
        GO: "Goiás",
        MA: "Maranhão",
        MT: "Mato Grosso",
        MS: "Mato Grosso do Sul",
        MG: "Minas Gerais",
        PA: "Pará",
        PB: "Paraíba",
        PR: "Paraná",
        PE: "Pernambuco",
        PI: "Piauí",
        RJ: "Rio de Janeiro",
        RN: "Rio Grande do Norte",
        RS: "Rio Grande do Sul",
        RO: "Rondônia",
        RR: "Roraima",
        SC: "Santa Catarina",
        SP: "São Paulo",
        SE: "Sergipe",
        TO: "Tocantins"
    };
    return nomes[sigla] || sigla;
}


//funçãio para criar o card de endereço dinamicamente
function cardEndereco(object, count) {

    const id = object.id_pessoa;
    const id_endereco = object.id_endereco;

    const input = getInputs();

    const form = document.createElement("form");
    const divEndereco = document.createElement("div");
    divEndereco.className = "endereco";

    console.log(object);

    //criando uma array, com objetos, onbde cada objeto é um input
    const campos = [
        { label: "CEP:", type: "number", name: "cep", placeholder: "CEP sem pontos ou traços...", "id": `cep${id}${count}`, "value": object.cep },
        { label: "Rua:", type: "text", name: "rua", placeholder: "Logradouro", "id": `rua${id}${count}`, "value": object.rua },
        { label: "Cidade:", type: "text", name: "cidade", placeholder: "Localidade", "id": `cidade${id}${count}`, "value": object.cidade },
        { label: "Bairro:", type: "text", name: "bairro", placeholder: "Bairro", "id": `bairro${id}${count}`, "value": object.bairro },
        { label: "Complemento:", type: "text", name: "complemento", placeholder: "Complemento", "id": `complemento${id}${count}`, "value": object.complemento },
        { label: "Número:", type: "text", name: "numero", placeholder: "Unidade", "id": `numeroEnd${id}${count}`, "value": object.numero }
    ];

    //iterando a array campos, e adicionando cada input a um container 
    campos.forEach(campo => {
        const span = document.createElement("span");

        const label = document.createElement("label");
        label.setAttribute("for", campo.name);
        label.textContent = campo.label;

        const input = document.createElement("input");
        input.type = campo.type;
        input.name = campo.name;
        input.id = campo.id;
        input.placeholder = campo.placeholder;
        input.value = campo.value ?? null;

        span.appendChild(label);
        span.appendChild(input);
        divEndereco.appendChild(span);
    });

    // Tratando o SELECT UF
    const spanUF = document.createElement("span");
    const labelUF = document.createElement("label");
    labelUF.setAttribute("for", "uf");
    labelUF.textContent = "Estado:";

    const selectUF = document.createElement("select");
    selectUF.name = "uf";
    selectUF.id = "uf" + id + count;

    // ARRAY com siglas
    const estados = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
        "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    const optionDefault = document.createElement("option");
    optionDefault.value = "";
    optionDefault.disabled = true;
    optionDefault.selected = true;
    optionDefault.textContent = "Selecione";
    selectUF.appendChild(optionDefault);

    // iterando as siglas e utilizando a função nomeEstado para completar as options
    estados.forEach(uf => {
        const option = document.createElement("option");
        option.value = uf;
        option.textContent = `${uf} - ${nomeEstado(uf)}`;
        selectUF.appendChild(option);
    });

    // Finalizando o Sewlect
    spanUF.appendChild(labelUF);
    spanUF.appendChild(selectUF);
    divEndereco.appendChild(spanUF);
    selectUF.value = object.uf ?? "";

    // Botões
    const divButtons = document.createElement("div");
    divButtons.className = "buttonsDesc";

    //array para criar os inputs BUttons
    const botoes = [
        { title: "Atualizar endereço", class: "btVerificar", img: "verificar.png", id: `atualizarEnd${id}${count}` },
        { title: "Adicionar novo endereço", class: "btMais", img: "mais.png", id: `adicionarEnd${id}${count}` },
        { title: "Deletar endereço", class: "btLixo", img: "lixo.png", id: `deletarEnd${id}${count}` }
    ];

    //iterando o array de buttons
    botoes.forEach(btn => {
        const abbr = document.createElement("abbr");
        abbr.title = btn.title;

        const button = document.createElement("button");
        button.type = "button";
        button.className = btn.class;
        button.id = btn.id;

        const img = document.createElement("img");
        img.src = `../imgs/icons/${btn.img}`;
        img.alt = "";

        button.appendChild(img);
        abbr.appendChild(button);
        divButtons.appendChild(abbr);

        if (btn.class === "btMais") {
            button.onclick = () => {
                postEndereco(`${id}${count}`);
            }
        }

        if (btn.class === "btVerificar") {
            button.onclick = () => {
                updateEndereco(`${id}${count}`, id_endereco);
            }
        }

        if (btn.class === "btLixo") {
            button.onclick = () => {
                deletarEndereco(`${id}${count}`, id_endereco);
            }
        }
    });

    //Adicionando tudo a div form, criada no começo do codigo
    divEndereco.appendChild(divButtons);
    form.appendChild(divEndereco);
    input.containerEndereco.appendChild(form);

    //Roalando o container até o ultimo card adicionado
    input.containerEndereco.scrollTo(0, input.containerTelefone.scrollHeight);
}

export default cardEndereco;

