// Função para confirmar presença e salvar no localStorage
function confirmarPresenca() {
    const nome = document.getElementById('nome').value;
    if (nome) {
        localStorage.setItem('convidado', nome);
        alert('Presença confirmada, obrigado!');
        // Redireciona para a seção de presentes
        document.getElementById('presentes').scrollIntoView();
    } else {
        alert('Por favor, informe seu nome!');
    }
}

// Função para abrir o Google Maps
function abrirMaps() {
    window.open('https://goo.gl/maps/Kiosque', '_blank');
}

// Função para abrir o local em 3D
function abrir3D() {
    window.open('https://santacatarina360.github.io/KiosqueDigoeMoni/', '_blank');
}

// Função para enviar recado
function enviarRecado() {
    const recado = document.getElementById('mensagem').value;
    if (recado) {
        alert('Recado enviado! Obrigado pelo carinho.');
        document.getElementById('mensagem').value = ''; // Limpa o campo
    } else {
        alert('Por favor, escreva um recado!');
    }
}
