import addCarrinho from "./addCarrinho.js";
import calcularIndiceCarrinho from "./calcularIndiceCarrinho.js";
import goToDescricao from "./goToDescricao.js";

function cardComum(container, produto) {

    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardProduto';

    const img = document.createElement('img');
    img.src = produto.imagem_url;
    img.alt = 'Imagem do produto';                                                                      

    const descricaoDiv = document.createElement('div');
    descricaoDiv.className = 'descricaoProduto';

    const infoDiv = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = produto.denominacao;
    const p = document.createElement('p');
    p.textContent = `R$${produto.preco}`;
    infoDiv.appendChild(h3);
    infoDiv.appendChild(p);

    const carrinhoDiv = document.createElement('div');
    carrinhoDiv.className = 'descricaoProdutoCarrinhoImg';
    const carrinhoImg = document.createElement('img');
    carrinhoImg.src = '../icons/IconeCarrinho-preto.png';
    carrinhoImg.alt = 'Adicionar ao carrinho';
    carrinhoDiv.appendChild(carrinhoImg);

    descricaoDiv.appendChild(infoDiv);
    descricaoDiv.appendChild(carrinhoDiv);

    cardDiv.appendChild(img);
    cardDiv.appendChild(descricaoDiv);

    container.appendChild(cardDiv);

        // Adiciona o elemento de promoção se houver promoção
    if (produto.promocao == "1") {
        const promocaoDiv = document.createElement('div');
        promocaoDiv.className = 'promocao';
        promocaoDiv.innerHTML = `${produto.porcentagem}%<br>OFF`;
        cardDiv.appendChild(promocaoDiv);

    }

    img.addEventListener('click', () => {
        goToDescricao(produto.id_produto);
    });

    carrinhoDiv.addEventListener('click', ()=> {
        addCarrinho(produto);
        calcularIndiceCarrinho(); 
    })

}

export default cardComum;