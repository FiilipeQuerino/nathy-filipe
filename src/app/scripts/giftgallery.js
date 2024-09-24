document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');

    fetch('../data/products.json') // Certifique-se de que o caminho está correto
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os produtos');
            }
            return response.json();
        })
        .then(products => {
            if (products.length === 0) {
                gallery.innerHTML = "<p>Nenhum presente disponível no momento.</p>";
            } else {
                products.forEach(product => {
                    const item = createGalleryItem(product);
                    gallery.appendChild(item);
                });
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            gallery.innerHTML = "<p>Erro ao carregar os presentes. Tente novamente mais tarde.</p>";
        });

    function createGalleryItem(product) {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Valor: R$${product.price},00</strong></p>
            <a href="#" onclick="showPaymentOptions('${product.linkPix}', '${product.name}', ${product.price}); return false;">Comprar</a>
        `;
        return item;
    }
});

function showPaymentOptions(linkPix, productName, productPrice) {
    window.currentPixLink = linkPix || "Código Pix padrão";
    window.currentProductName = productName;
    window.currentProductPrice = productPrice;
    document.getElementById("paymentModal").style.display = "block";
}
