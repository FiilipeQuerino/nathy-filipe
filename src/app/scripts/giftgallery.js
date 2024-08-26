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
                    <a href="#" onclick="showPaymentOptions(${product.price})">Comprar</a>
                `;
                
                gallery.appendChild(item);
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});

function showPaymentOptions(productValue) {
    var modal = document.getElementById("paymentModal");

    // Gerar o código Pix dinâmico com o valor específico do produto
    const pixCode = generatePixCode(productValue); // Você deve implementar essa função ou usar uma chave fixa.

    window.currentPixLink = pixCode; // Define o Pix link como a chave Pix gerada
    modal.style.display = "block"; // Exibe a modal
}

function copyPix() {
    const pixKey = "109853269-48"; // Chave Pix fixa
    navigator.clipboard.writeText(pixKey).then(function () {
        showToast('Pix copiado: ' + pixKey);
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