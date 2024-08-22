function showPaymentOptions() {
    var modal = document.getElementById("paymentModal");
    window.currentPixLink = '00020126330014BR.GOV.BCB.PIX0111109853269485204000053039865802BR5925Filipe Querino dos Santos6009SAO PAULO62140510Y6cu90lb2g630496C1'; // Código PIX completo
    modal.style.display = "block";
}

function copyToClipboard() {
    navigator.clipboard.writeText(window.currentPixLink).then(function () {
        showToast('Link do Pix copiado para a área de transferência!');
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
    }, 3000);
}