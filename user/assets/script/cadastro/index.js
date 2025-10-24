import getEndereco from "../commons/getEndereco.js";
import addUser from "./services/addUser.js";
import cpf from "../commons/cpf.js";
import getInputs from "../commons/getInputs.js";
import getValues from "../commons/getValues.js";
import phoneMask from "../commons/phoneMask.js";

const inputs = getInputs();
const values = getValues();

inputs.cadastrar.addEventListener('click', () => {
    addUser();
});

inputs.cpf.addEventListener('keypress', () => {
    cpf();
})

inputs.cep.addEventListener('input', (e) => {

    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);

    const cepAtual = e.target.value;

    if (cepAtual.length === 8) {
        getEndereco(cepAtual);
    }
})

inputs.telefone.addEventListener('input', (e) => {
    phoneMask(e.target);
});