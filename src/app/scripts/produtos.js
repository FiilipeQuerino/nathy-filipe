document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos();

    const productList = document.getElementById('product-list');

    productList.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('botao-pix')) {
            const pixCode = e.target.getAttribute('data-pix');
            showPixModal(pixCode);  // Chama a modal com o código PIX
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
                mostrarMaisBtn.style.display = 'none';
            });

            productList.parentNode.appendChild(mostrarMaisBtn);
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

    // Não mostrar o código PIX, apenas a mensagem de que foi copiado
    const modalText = document.querySelector('.pix-code');
    modalText.textContent = ''; // Limpa qualquer exibição do PIX

    modal.style.display = 'flex'; // Exibe a modal

    // Fechar modal e mostrar o toast após o fechamento
    document.getElementById('fechar-modal').onclick = function () {
        modal.style.display = 'none';
        showPixToast('Código PIX copiado. Cole no seu app bancário.'); // Toast após fechar
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            showPixToast('Código PIX copiado. Cole no seu app bancário.');
        }
    };

    copiarPix(pixCode);  // Copia o código PIX para a área de transferência
}

function copiarPix(pixCode) {
    const tempInput = document.createElement('input');
    tempInput.value = pixCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

// Função para exibir o toast da seção de compras
function showPixToast(message) {
    const toast = document.getElementById('pix-toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // O toast será exibido por 3 segundos
}

document.getElementById('fechar-modal').onclick = function () {
    const modal = document.getElementById('pix-modal');
    modal.style.display = 'none';
};

window.onclick = function (event) {
    const modal = document.getElementById('pix-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

document.getElementById('fechar-modal').onclick = function () {
    const modal = document.getElementById('pix-modal');
    modal.style.display = 'none';
};

window.onclick = function (event) {
    const modal = document.getElementById('pix-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
