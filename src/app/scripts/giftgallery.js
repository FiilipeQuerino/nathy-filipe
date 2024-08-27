document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/products.json')
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
                    <a href="#" onclick="showPaymentOptions('${product.linkPix}'); return false;">Comprar</a>
                `;
                
                gallery.appendChild(item);
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});

function showPaymentOptions(linkPix) {
    var modal = document.getElementById("paymentModal");

    // Definindo o linkPix como o código do Pix atual
    window.currentPixLink = linkPix || "Código Pix padrão caso o campo esteja vazio";
    
    modal.style.display = "block";
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

function showQRCodeModal() {
    // Fecha a modal atual
    closeModal();

    // Abre a nova modal do QR Code
    var qrCodeModal = document.getElementById("qrCodeModal");
    qrCodeModal.style.display = "block";
}

// Fecha a modal ao clicar no "X" em ambas as modais
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        closeModal();
        closeQRCodeModal();
    }
});

function closeQRCodeModal() {
    var qrCodeModal = document.getElementById("qrCodeModal");
    qrCodeModal.style.display = "none";
}

// Fecha a modal ao clicar fora do conteúdo da modal
window.onclick = function(event) {
    var paymentModal = document.getElementById("paymentModal");
    var qrCodeModal = document.getElementById("qrCodeModal");
    if (event.target == paymentModal) {
        closeModal();
    } else if (event.target == qrCodeModal) {
        closeQRCodeModal();
    }
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
