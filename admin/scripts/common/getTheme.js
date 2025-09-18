function getTheme() {
    if (localStorage.getItem('theme')) {

        let theme = localStorage.getItem('theme');
        return theme;
    } else {
        return "claro"
    }
}

export default getTheme;