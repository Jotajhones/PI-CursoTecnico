import getInputs from "../../commons/utils/getInput.js";
import postFone from "../services/postFone.js";
import updateFone from "../services/updateFone.js";
import deletarFone from "../services/deletarFone.js"

//Criando card de telefone
function cardTelefone(object, count) {

    const id = object.id_pessoa;
    const id_telefone = object.id_telefone;

    const form = document.createElement("form");
    const divTel = document.createElement("div");
    divTel.className = "tel";

    // DDD
    const spanDDD = document.createElement("span");
    spanDDD.className = "inputTel";
    const labelDDD = document.createElement("label");
    labelDDD.setAttribute("for", "ddd");
    labelDDD.textContent = "DDD: ";
    const inputDDD = document.createElement("input");
    inputDDD.type = "number";
    inputDDD.name = "ddd";
    inputDDD.id = "ddd" + id + count;
    inputDDD.value = object.ddd ?? null;
    inputDDD.placeholder = "xx Apenas Numeros";
    spanDDD.appendChild(labelDDD);
    spanDDD.appendChild(inputDDD);

    // Número
    const spanNumero = document.createElement("span");
    spanNumero.className = "inputTel";
    const labelNumero = document.createElement("label");
    labelNumero.setAttribute("for", "numero");
    labelNumero.textContent = "Numero: ";
    const inputNumero = document.createElement("input");
    inputNumero.type = "number";
    inputNumero.name = "numero";
    inputNumero.id = "numero" + id + count;
    inputNumero.value = object.numero ?? null;
    inputNumero.placeholder = "xxxx-xxxx Apenas Numeros";
    spanNumero.appendChild(labelNumero);
    spanNumero.appendChild(inputNumero);

    // Tipo
    const spanTipo = document.createElement("span");
    spanTipo.className = "inputTel";
    const labelTipo = document.createElement("label");
    labelTipo.setAttribute("for", "tipo");
    labelTipo.textContent = "Tipo: ";
    const selectTipo = document.createElement("select");
    selectTipo.name = "tipo";
    selectTipo.id = "tipo" + id + count;

    //Array com as <OPTIONS> do input <SELECT>
    const opcoes = [
        { value: "", text: "Selecione", disabled: true, selected: true },
        { value: "celular", text: "Celular" },
        { value: "residencial", text: "Residencial" },
        { value: "comercial", text: "Comercial" }
    ];

    //Iterando as <OPTIONS>
    opcoes.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.disabled) option.disabled = true;
        if (opt.selected) option.selected = true;
        selectTipo.appendChild(option);
    });

    //Add o input ao CARD
    spanTipo.appendChild(labelTipo);
    spanTipo.appendChild(selectTipo);

    // Botões
    const divButtons = document.createElement("div");
    divButtons.className = "buttonsDesc";

    //Criando array com os inputs buttons
    const botoes = [
        { title: "Atualizar dados telefonicos", class: "btVerificar", img: "verificar.png", id: `atualizar${id}${count}` },
        { title: "Adicionar novo telefone", class: "btMais", img: "mais.png", id: `adicionar${id}${count}` },
        { title: "Deletar telefone", class: "btLixo", img: "lixo.png", id: `deletar${id}${count}` }
    ];


    //Iterando a array
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
                postFone(`${id}${count}`);
            }
        }

        if (btn.class === "btVerificar") {
            button.onclick = () => {
                updateFone(`${id}${count}`, id_telefone);
            }
        }

        if (btn.class === "btLixo") {
            button.onclick = () => {
                deletarFone(`${id}${count}`, id_telefone);
            }
        }
    });

    // Ordenando e adiciopnando elementos criados ao COntainer Form
    divTel.appendChild(spanDDD);
    divTel.appendChild(spanNumero);
    divTel.appendChild(spanTipo);
    divTel.appendChild(divButtons);
    form.appendChild(divTel);

    // adicionando contairner form a Pagina e rolando a pagina para o yultimo card criado;
    const input = getInputs();
    input.containerTelefone.appendChild(form);
    selectTipo.value = object.tipo ?? null;
    input.containerTelefone.scrollTo(0, input.containerTelefone.scrollHeight);
}

export default cardTelefone;