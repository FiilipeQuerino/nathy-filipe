document.addEventListener("DOMContentLoaded", function () {
    const countdownElement = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    const weddingDate = new Date("2025-03-08T15:00:00").getTime();

    function updateCountdown() {
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
    }

    setInterval(updateCountdown, 1000);

    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("contentContainer").innerHTML = data;
            })
            .catch(error => console.error('Erro ao carregar conteúdo:', error));
    }

    document.getElementById("confirmBtn").addEventListener('click', () => loadContent('confirm.html'));
    document.getElementById("locationBtn").addEventListener('click', () => loadContent('location.html'));
    document.getElementById("giftBtn").addEventListener('click', () => { loadContent('giftgallery.html'); });    
    document.getElementById("dressCodeBtn").addEventListener('click', () => loadContent('dress-code.html'));

    // Inicializa com a seção de confirmação
    loadContent('confirm.html');
});