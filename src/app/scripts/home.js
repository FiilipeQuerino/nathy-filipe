document.addEventListener("DOMContentLoaded", function() {
    // Configurar a data do casamento
    const weddingDate = new Date("2024-12-31T00:00:00").getTime(); // Ajuste para a data do casamento

    // Atualizar a contagem regressiva a cada segundo
    const countdownElement = document.getElementById("countdown");
    setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "O grande dia chegou!";
        }
    }, 1000);

    // Controle do modal
    var modal = document.getElementById("giftListModal");
    var btn = document.getElementById("giftListButton");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
