
function logout() {

    const user = window.localStorage.getItem("BlusasBlusasUser")

    if (user) {

        window.localStorage.removeItem("BlusasBlusasUser");
        window.localStorage.removeItem("BlusasBlusasToken");

        const loginTXTlogout = document.querySelectorAll('.cabecalhoLoginNome');

        loginTXTlogout.forEach(element => {
            element.innerHTML = "";
        });

        const loginIMG = document.querySelectorAll('.loginIMG');
        loginIMG.forEach(element => {
            element.classList.remove('iconHide');
            element.classList.add('iconShow');
        });

        const logoutIMG = document.querySelectorAll('.logoutIMG');
        logoutIMG.forEach(element => {
            element.classList.remove('iconShow');
            element.classList.add('iconHide');
        });


        const carrinho = document.querySelectorAll('.carrinhoDeCompraIcon')
        carrinho.forEach(element => {
            element.classList.remove('iconShow');
            element.classList.add('iconHide');
        });
    }
}

export default logout;