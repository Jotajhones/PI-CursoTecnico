import modal from "../../commons/modal.js";
import validarInput from "../../commons/validarInput.js";

async function recuperarSenha() {

    const email = document.getElementById('email');

    const verificar = [];

    verificar.push(validarInput(email));

    const verificador = verificar.filter(item => item === false);

    if (verificador.length === 0) {

        try {
            
            const res = await fetch('http://localhost:8080/blusablusas/esqueci-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": email.value
                })
            });

            if (res.ok) {
                const data = await res.json();
                modal("Sucesso", `${data.message}`, "main");
            } else {
                const errorData = await res.json();
                modal("Erro - Recuperação de Senha", `${errorData.message}`, "main");
            }


        } catch (error) {
            modal("Erro de Conexão", "Não foi possível conectar ao servidor. Tente novamente mais tarde.", "main");
        }

    } else {
        modal("Erro de Preenchimento", "Preencha corretamente os campos!", "main")
    }

}

export default recuperarSenha;