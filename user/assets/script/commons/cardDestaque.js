
function cardDestaque(container, produto) {

    // Atualiza a URL da imagem para o caminho correto, pois a referencia no banco é a pasta pages
    let imagem_url = produto.imagem_url;   
    imagem_url = imagem_url.replace('../img/', './assets/img/');

    // Cria os elementos
    const mainCard = document.createElement('div');
    mainCard.className = 'mainCard';

    const mainCardIMG = document.createElement('div');
    mainCardIMG.className = 'mainCardIMG';

    const imgPoster = document.createElement('img');
    imgPoster.src = imagem_url;
    imgPoster.className = 'imgPoster';

    mainCardIMG.appendChild(imgPoster);

    const mainCardContent = document.createElement('div');
    mainCardContent.className = 'mainCardContent';

    const mainCardColumn = document.createElement('div');
    mainCardColumn.className = 'mainCardColumn';

    const denominacaoP = document.createElement('p');
    denominacaoP.textContent = produto.denominacao;

    const subtituloP = document.createElement('p');
    subtituloP.className = 'mainCardSubtitulo';
    subtituloP.textContent = 'GARANTA A SUA';

    mainCardColumn.appendChild(denominacaoP);
    mainCardColumn.appendChild(subtituloP);

    const setaImg = document.createElement('img');
    setaImg.src = './assets/icons/seta-card.png';
    setaImg.alt = 'icone de seta';
    setaImg.className = 'mainCardContenColumnImg';

    mainCardContent.appendChild(mainCardColumn);
    mainCardContent.appendChild(setaImg);

    mainCard.appendChild(mainCardIMG);
    mainCard.appendChild(mainCardContent);

    container.appendChild(mainCard);

    mainCard.addEventListener('click', ()=> {
        window.location.href = `./assets/pages/descricao.html?id_produto=${produto.id_produto}`;
    })

}

export default cardDestaque;