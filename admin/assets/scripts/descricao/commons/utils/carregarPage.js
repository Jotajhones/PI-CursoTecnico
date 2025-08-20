// fgunção que esta crregando todo conteudo do container main, da pagina de descrioção, chamando uma função para o header, outra pro container telefoners e outro para o conteiner endereço

import carregarHeader from "../services/carregarHeader.js";
import carregarFone from "../../fone/services/carregarFone.js";
import carregarEndereco from "../../endereco/services/carregarEndereco.js";

function carregarPage() {

    const params = new URLSearchParams(window.location.search);
    const id_pessoa = params.get('id_pessoa');
    const id_usuario = params.get('id_usuario');

    carregarHeader(id_pessoa, id_usuario);
    carregarFone(id_pessoa);
    carregarEndereco(id_pessoa);
}

export default carregarPage;