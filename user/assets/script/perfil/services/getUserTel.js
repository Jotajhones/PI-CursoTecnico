import modal from "../../commons/modal.js";

async function getUserTel(id_pessoa) {

    try {

        const res = await fetch('http://localhost:8080/blusablusas/fone', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_pessoa": id_pessoa
            })
        });

        if (res.ok) {
            const userTel = await res.json();
            return userTel;
        } else if (!res.ok) {
            modal('Erro', 'Não foi possível obter o telefone do usuário. Por favor, tente novamente mais tarde.');
        }

    } catch (error) {

        console.error('Erro ao buscar telefone do usuário:', error);
    }

}

export default getUserTel;