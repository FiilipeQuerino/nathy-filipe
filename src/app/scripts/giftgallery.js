document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/products.json') // Caminho para o arquivo JSON
        .then(response => response.json())
        .then(products => {
            const gallery = document.getElementById('gallery');
            products.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('gallery-item');
                
                item.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Valor: R$${product.price},00</strong></p>
                    <a href="#" onclick="showPaymentOptions(${product.price}); return false;">Comprar</a>
                `;
                
                gallery.appendChild(item);
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});

function showPaymentOptions(productValue) {
    var modal = document.getElementById("paymentModal");

    // Simulação da geração do código Pix dinâmico com o valor do produto
    const pixCode = `00020126330014BR.GOV.BCB.PIX0111109853269485204000053039865802BR5925Nome Exemplo6009SAO PAULO${productValue}00`;

    window.currentPixLink = pixCode; // Define o Pix link como a chave Pix gerada
    modal.style.display = "block"; // Exibe o modal
}

function copyPix() {
    navigator.clipboard.writeText(window.currentPixLink).then(function () {
        showToast('Pix copiado: ' + window.currentPixLink);
        closeModal();
    }).catch(function (err) {
        showToast('Erro ao copiar Pix: ' + err);
    });
}

function showQRCode() {
    var qrCodeContainer = document.getElementById("qrCodeContainer");
    qrCodeContainer.style.display = "block"; // Exibe o QR Code
}

function cardPaymentOption() {
    showToast('Opção de pagamento com cartão em breve!');
}

function closeModal() {
    var modal = document.getElementById("paymentModal");
    modal.style.display = "none";
    var qrCodeContainer = document.getElementById("qrCodeContainer");
    qrCodeContainer.style.display = "none"; // Esconde o QR Code ao fechar o modal
}

// Fechar o modal ao clicar no "X"
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function () {
    closeModal();
}

// Fechar o modal ao clicar fora do conteúdo do modal
window.onclick = function (event) {
    var modal = document.getElementById("paymentModal");
    if (event.target == modal) {
        closeModal();
    }
}

function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
