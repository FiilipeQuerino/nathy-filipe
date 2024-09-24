document.addEventListener("DOMContentLoaded", function() {
    const weddingDate = new Date("2025-03-08T15:00:00").getTime();
    const countdownElement = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "O grande dia chegou!";
        } else {
            countdownElement.days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
            countdownElement.hours.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            countdownElement.minutes.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            countdownElement.seconds.textContent = Math.floor((distance % (1000 * 60)) / 1000);
        }
    }, 1000);
});
