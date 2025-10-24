import modal from "../../commons/modal.js"

async function addPessoa(dadosUser) {

    try {
        const res = await fetch('http://localhost:8080/blusablusas/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosUser)
        });

        if (res.ok) {
            return res.json();

        } else if (!res.ok) {
            modal("ERROR na requisição", "Outros erros de requisição. \nRetorno: " + res.statusText);
            throw new Error(`Falha na inserção da Pessoa com status ${res.status}`);
        }

    } catch (err) {
        console.error("Erro em addPessoa:", err);
        modal("error", "Falha de comunicação com o servidor. Verifique sua conexão.");
        throw err;
    }
}

export default addPessoa;