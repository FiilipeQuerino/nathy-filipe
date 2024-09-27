document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos(); // Carrega os produtos

    const productList = document.getElementById('product-list');

    // Usamos event delegation para garantir que o clique no botão "COMPRAR" acione a modal
    productList.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('botao-pix')) {
            const pixCode = e.target.getAttribute('data-pix');
            showPixModal(pixCode); // Chama a modal ao clicar no botão "COMPRAR"
        }
    });
});

function carregarProdutos() {
    fetch('../data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');
            const mostrarMaisBtn = document.createElement('button');
            mostrarMaisBtn.textContent = 'Mostrar Mais';
            mostrarMaisBtn.className = 'botao-presente';

            let produtosVisiveis = 5;
            products.slice(0, produtosVisiveis).forEach(product => renderProduct(product, productList));

            mostrarMaisBtn.addEventListener('click', function () {
                products.slice(produtosVisiveis).forEach(product => renderProduct(product, productList));
                mostrarMaisBtn.style.display = 'none'; // Esconde o botão após mostrar todos
            });

            productList.parentNode.appendChild(mostrarMaisBtn); // Adiciona o botão ao final da lista
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
            showToast('Erro ao carregar a lista de presentes.');
        });
}

function renderProduct(product, container) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">R$${product.price.toFixed(2)}</p>
        <div class="product-actions">
            <button class="botao-pix" data-pix="${product.linkPix}">COMPRAR</button>
        </div>
    `;

    container.appendChild(productCard);
}

function showPixModal(pixCode) {
    const modal = document.getElementById('pix-modal');
    const modalText = document.querySelector('.pix-code');
    modalText.textContent = pixCode;

    // Exibe a modal ao clicar no botão COMPRAR
    modal.style.display = 'flex';

    // Fecha a modal ao clicar no "X"
    document.getElementById('fechar-modal').onclick = function () {
        modal.style.display = 'none';
    };

    // Fecha a modal ao clicar fora dela
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    copiarPix(pixCode); // Copia o código PIX para a área de transferência
}

function copiarPix(pixCode) {
    const tempInput = document.createElement('input');
    tempInput.value = pixCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Código PIX copiado. Cole no seu app bancário.');
}

// Fecha a modal ao clicar no "X"
document.getElementById('fechar-modal').onclick = function () {
    const modal = document.getElementById('pix-modal');
    modal.style.display = 'none';
};

// Fecha a modal ao clicar fora dela
window.onclick = function (event) {
    const modal = document.getElementById('pix-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};