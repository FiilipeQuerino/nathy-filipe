document.addEventListener("DOMContentLoaded", function() {
    const weddingDate = new Date("2025-03-08T15:00:00").getTime();
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

    // Controle do modal para a Lista de Presentes
    var giftModal = document.getElementById("giftListModal");
    var giftBtn = document.getElementById("giftListButton");
    var giftClose = document.getElementsByClassName("close")[0];

    giftBtn.onclick = function() {
        giftModal.style.display = "block";
    }

    giftClose.onclick = function() {
        giftModal.style.display = "none";
    }

    // Controle do modal para a Localização
    var locationModal = document.getElementById("locationModal");
    var locationBtn = document.getElementById("locationButton");
    var locationClose = document.getElementsByClassName("close-location")[0];

    locationBtn.onclick = function() {
        locationModal.style.display = "block";
    }

    locationClose.onclick = function() {
        locationModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == giftModal) {
            giftModal.style.display = "none";
        } else if (event.target == locationModal) {
            locationModal.style.display = "none";
        }
    }
});
