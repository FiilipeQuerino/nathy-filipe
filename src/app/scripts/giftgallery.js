function showPaymentOptions(productValue) {
    const pixCode = generatePixCode(productValue);
    window.currentPixLink = pixCode;

    var modal = document.getElementById("paymentModal");
    modal.style.display = "block";
}

function generatePixCode(value) {
    const pixKey = "10985326948"; // Substitua pela sua chave Pix
    const merchantName = "Filipe Querino dos Santos";
    const merchantCity = "SAO PAULO";
    const transactionAmount = value.toFixed(2); // Valor formatado com 2 casas decimais

    // Construindo o código Pix
    const payload = `
000201
26330014BR.GOV.BCB.PIX0111${pixKey.length}${pixKey}
52040000
5303986
54${transactionAmount.length}${transactionAmount}
5802BR
59${merchantName.length}${merchantName}
60${merchantCity.length}${merchantCity}
62140510Y6cu90lb2g
`;

    // Removendo quebras de linha e espaços adicionais
    const payloadClean = payload.replace(/\n/g, "").replace(/ /g, "");

    // Calculando o CRC
    const crc16 = calculateCRC(payloadClean + "6304"); // "6304" é o campo CRC inicial obrigatório

    return payloadClean + "6304" + crc16;
}

// Função para calcular o CRC16
function calculateCRC(str) {
    const crcTable = [
        0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
        0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
        // (tabela completa omitida para simplificar)
    ];

    let crc = 0xFFFF;

    for (let i = 0; i < str.length; i++) {
        const byte = str.charCodeAt(i);
        const tableIndex = ((crc >> 8) ^ byte) & 0xff;
        crc = ((crc << 8) & 0xffff) ^ crcTable[tableIndex];
    }

    return crc.toString(16).toUpperCase().padStart(4, "0");
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
