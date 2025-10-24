function loginStorage(authData) {
    if (authData.token) {
        window.localStorage.setItem("BlusasBlusasToken", authData.token);
    }

    if (authData.usuario) {
        window.localStorage.setItem("BlusasBlusasUser", JSON.stringify(authData.usuario));
    }
}

export default loginStorage;