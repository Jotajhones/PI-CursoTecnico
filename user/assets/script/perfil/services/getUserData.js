import modal from "../../commons/modal.js";

async function getUserData(id_pessoa, id_usuario) {

    try {

        const res = await fetch(`http://localhost:8080/blusablusas/users/${id_pessoa}/${id_usuario}`);
        if (res.ok) {
            const userData = await res.json();
            return userData;
        } else if (!res.ok) {
            modal('Erro', 'Não foi possível obter os dados do usuário. Por favor, tente novamente mais tarde.');
        }

    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
}

export default getUserData;
