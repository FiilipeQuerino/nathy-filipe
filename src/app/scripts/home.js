document.addEventListener("DOMContentLoaded", function() {
    const weddingDate = new Date("2025-03-08T15:00:00").getTime();

    const countdownElement = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.days.textContent = days;
        countdownElement.hours.textContent = hours;
        countdownElement.minutes.textContent = minutes;
        countdownElement.seconds.textContent = seconds;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "O grande dia chegou!";
        }
    }, 1000);
});


    // Controle dos modais
    var giftModal = document.getElementById("giftListModal");
    var locationModal = document.getElementById("locationModal");
    var giftBtn = document.getElementById("giftListButton");
    var locationBtn = document.getElementById("locationButton");
    var closeBtns = document.getElementsByClassName("close");

    giftBtn.onclick = function() {
        giftModal.style.display = "block";
    }

    locationBtn.onclick = function() {
        locationModal.style.display = "block";
    }

    for (let i = 0; i < closeBtns.length; i++) {
        closeBtns[i].onclick = function() {
            giftModal.style.display = "none";
            locationModal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == giftModal) {
            giftModal.style.display = "none";
        } else if (event.target == locationModal) {
            locationModal.style.display = "none";
        }
    }
});
