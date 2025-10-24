import addCarrinho from './addCarrinho.js';
import calcularIndiceCarrinho from './calcularIndiceCarrinho.js';


function cardDescricao(container, produto) {

    const formatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(produto.preco));

    // Busca a estrutura estática para preenchê-la
    const produtoDiv = container.querySelector('.produto') || document.createElement('div');
    if (!container.querySelector('.produto')) {
        produtoDiv.classList.add('produto');
    }

    const interfaceDiv = produtoDiv.querySelector('.interface') || document.createElement('div');
    if (!produtoDiv.querySelector('.interface')) {
        interfaceDiv.classList.add('interface');
    }

    const capaDiv = interfaceDiv.querySelector('.capa') || document.createElement('div');
    if (!interfaceDiv.querySelector('.capa')) {
        capaDiv.classList.add('capa');
    }

    const imgCapa = document.createElement('img');
    imgCapa.src = produto.imagem_url;
    imgCapa.alt = 'imagem de capa';

    // Limpa e preenche a capa
    capaDiv.innerHTML = '';
    capaDiv.appendChild(imgCapa);

    // Monta a interface se não estava montada
    if (!interfaceDiv.querySelector('.capa')) {
        interfaceDiv.appendChild(capaDiv);
    }

    const contentDiv = produtoDiv.querySelector('.content') || document.createElement('div');
    if (!produtoDiv.querySelector('.content')) {
        contentDiv.classList.add('content');
    }

    const textContentDiv = contentDiv.querySelector('.textContet') || document.createElement('div');
    if (!contentDiv.querySelector('.textContet')) {
        textContentDiv.classList.add('textContet');
    }

    // Criando e Preenchendo os textos 
    const h1 = document.createElement('h1');
    h1.textContent = produto.denominacao;

    const pDescricao = document.createElement('p');
    pDescricao.textContent = produto.descricao;

    const pTamanho = document.createElement('p');
    pTamanho.textContent = 'Tamanhos Disponiveis: ';
    const spanTamanho = document.createElement('span');
    spanTamanho.classList.add('tamanho');
    spanTamanho.textContent = produto.tamanho;
    pTamanho.appendChild(spanTamanho);

    const pCores = document.createElement('p');
    pCores.textContent = 'Cores: ';
    const spanCores = document.createElement('span');
    spanCores.classList.add('tamanho');
    spanCores.textContent = produto.cor;
    pCores.appendChild(spanCores);

    const pTecido = document.createElement('p');
    pTecido.textContent = 'Tecido: ';
    const spanTecido = document.createElement('span');
    spanTecido.classList.add('tamanho');
    spanTecido.textContent = produto.tecido;
    pTecido.appendChild(spanTecido);

    const h2 = document.createElement('h2');
    h2.textContent = formatado;

    // Limpa e preenche o textContentDiv
    textContentDiv.innerHTML = '';
    textContentDiv.appendChild(h1);
    textContentDiv.appendChild(pDescricao);
    textContentDiv.appendChild(pTamanho);
    textContentDiv.appendChild(pCores);
    textContentDiv.appendChild(pTecido);
    textContentDiv.appendChild(h2);

    // NOVO CONTAINER PARA BOTÕES E COMENTÁRIO
    const interactionDiv = contentDiv.querySelector('.interaction-area') || document.createElement('div');
    if (!contentDiv.querySelector('.interaction-area')) {
        interactionDiv.classList.add('interaction-area');
    }

    const buttonsDiv = interactionDiv.querySelector('.buttons') || document.createElement('div');
    if (!interactionDiv.querySelector('.buttons')) {
        buttonsDiv.classList.add('buttons');
    }

    // Criando botões de interação
    const comprarBtn = document.createElement('button');
    comprarBtn.type = 'button';
    comprarBtn.classList.add('comprar');
    comprarBtn.textContent = 'COMPRAR $';

    const carrinhoBtn = document.createElement('button');
    carrinhoBtn.type = 'button';
    carrinhoBtn.classList.add('carrinho');

    const carrinhoImg = document.createElement('img');
    carrinhoImg.src = '../icons/IconeCarrinho.png';
    carrinhoImg.alt = '';
    carrinhoBtn.appendChild(carrinhoImg);

    // Limpa e preenche a div de botões
    buttonsDiv.innerHTML = '';
    buttonsDiv.appendChild(comprarBtn);
    buttonsDiv.appendChild(carrinhoBtn);

    // A seção de comentários (.comentario-section) é esperada no HTML estático.

    if (!interactionDiv.querySelector('.buttons')) {
        interactionDiv.appendChild(buttonsDiv);
    }

    if (!contentDiv.querySelector('.textContet')) {
        contentDiv.appendChild(textContentDiv);
    }
    if (!contentDiv.querySelector('.interaction-area')) {
        contentDiv.appendChild(interactionDiv);
    }

    if (!produtoDiv.querySelector('.interface')) {
        produtoDiv.appendChild(interfaceDiv);
    }
    if (!produtoDiv.querySelector('.content')) {
        produtoDiv.appendChild(contentDiv);
    }

    // Se o container está vazio (não tem a estrutura estática), adicionamos o produtoDiv
    if (!container.querySelector('.produto')) {
        container.appendChild(produtoDiv);
    }


    const user = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));

    // Listeners para os botões de Compra e Carrinho (criados dinamicamente)
    if (user) {
        carrinhoBtn.addEventListener('click', () => {

            addCarrinho(produto);
            calcularIndiceCarrinho();

        });

        comprarBtn.addEventListener('click', () => {
            window.location.href = `./carrinho.html?id_venda=${user.ultima_venda}&id_usuario=${user.id_usuario}`;
        });
    }
}

export default cardDescricao;
