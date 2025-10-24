import modal from "../commons/modal.js";
import validarInput from "../commons/validarInput.js";


document.querySelector('#btnAlterar').addEventListener('click', async () => {

    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmarSenha');

    const token = new URLSearchParams(window.location.search).get('token');

    const verificar = [];

    verificar.push(validarInput(senha));
    verificar.push(validarInput(confirmarSenha));

    const verificador = verificar.filter(item => item === false);

    if (verificador.length === 0 && senha.value === confirmarSenha.value) {

        try {

            const res = await fetch('http://localhost:8080/blusablusas/reset-senha', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' },
                body: JSON.stringify({
                    
                    "nova_senha": confirmarSenha.value,
                })
            });

            if (res.ok) {
                const data = await res.json();
                modal("Sucesso", `${data.message}`, "main");

                setTimeout(() => {
                    window.location.href = './login.html';
                }, 3000);

            } else {
                const errorData = await res.json();
                modal("Erro - Alteração de Senha", `${errorData.message}`, "main");
            }
            
        } catch (error) {
            modal("Erro de Conexão", "Não foi possível conectar ao servidor. Tente novamente mais tarde.", "main");
        }

    } else {
        modal("Erro de Preenchimento", "Preencha corretamente os campos!", "main")
    }

});