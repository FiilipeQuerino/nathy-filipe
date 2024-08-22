function showPaymentOptions(productValue) {
    var modal = document.getElementById("paymentModal");

    // Gerar o código Pix dinâmico com o valor específico do produto
    const pixCode = generatePixCode(productValue);

    window.currentPixLink = pixCode;
    modal.style.display = "block";
}

function generatePixCode(value) {
    // Gera o código Pix dinâmico com o valor inserido
    // Você pode ajustar o código Pix conforme necessário
    return `00020126330014BR.GOV.BCB.PIX011110985326948520400005303${value}5802BR5925Filipe Querino dos Santos6009SAO PAULO62140510Y6cu90lb2g630496C1`;
}

function copyToClipboard() {
    navigator.clipboard.writeText(window.currentPixLink).then(function () {
        showToast('Presente escolhido, agora é só fazer o Pix!');
        closeModal();
    }, function (err) {
        showToast('Falha ao copiar o link: ' + err);
        closeModal();
    });
}

function showQRCode() {
    var qrCodeContainer = document.getElementById("qrCodeContainer");
    qrCodeContainer.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("paymentModal");
    modal.style.display = "none";
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
    }, 3000); // Duração de 3 segundos
}
