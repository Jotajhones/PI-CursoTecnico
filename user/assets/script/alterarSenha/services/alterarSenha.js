import modal from "../../commons/modal.js";
import modalAlt from "../../commons/modalAlt.js";
import validarInput from "../../commons/validarInput.js";
import logout from "../../login/services/logout.js";

async function alterarSenha() {

    const senha = document.getElementById('senhaAntiga');
    const novaSenha = document.getElementById('novaSenha');
    const confirmarNovaSenha = document.getElementById('confirmarSenha');

    const user = JSON.parse(localStorage.getItem('BlusasBlusasUser'));

    const verificar = [];

    verificar.push(validarInput(senha));
    verificar.push(validarInput(novaSenha));
    verificar.push(validarInput(confirmarNovaSenha));

    const verificador = verificar.filter(item => item === false);

    console.log("data: ", {
        id_pessoa: user.id_pessoa,
        senha: senha.value,
        novaSenha: novaSenha.value,
        confirmarNovaSenha: confirmarNovaSenha.value
    })

    if (verificador.length === 0 && novaSenha.value === confirmarNovaSenha.value) {

        try {

            const res = await fetch('http://localhost:8080/blusablusas/alterar-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id_pessoa": user.id_pessoa,
                    "senha": senha.value,
                    "nova_senha": novaSenha.value
                })
            });

            if (res.ok) {

                modal('Sucesso', 'Senha alterada com sucesso! você sera a tela de login em alguns instantes. Agurdade...', 'main');
                setTimeout(() => {
                    logout();
                    window.location.href = '../../index.html';
                }, 10000);

            } else {
                const errorData = await res.json();
                modal('Erro', 'Erro ao alterar a senha: ' + errorData.message);
            }

        } catch (error) {
            modal('Erro de Conexão', 'Não foi possível conectar ao servidor. Tente novamente mais tarde.', 'main');
        }

    } else {
        modalAlt("erro", "Preencha corretamente os campos destacados!");
    }


}

export default alterarSenha;