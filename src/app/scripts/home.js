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

    function loadContent(url, scriptUrl) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("contentContainer").innerHTML = data;
                if (scriptUrl) {
                    // Remove any existing script tags for the new content
                    const existingScripts = document.querySelectorAll("#contentContainer script");
                    existingScripts.forEach(script => script.remove());

                    // Add the new script
                    const script = document.createElement("script");
                    script.src = scriptUrl;
                    document.body.appendChild(script);
                }
            })
            .catch(error => console.error('Erro ao carregar conteúdo:', error));
    }

    document.getElementById('contentContainer').addEventListener('submit', function (event) {
        event.preventDefault();

        if (event.target.id === 'rsvp-form') {
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            fetch('https://script.google.com/macros/s/AKfycbz3wi1TacxhCiNDu37bq_uV0HkMpzXYp8uUorTz83OAAJkoRXQM5HvZtKyu62uftPQN/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(() => {
                    alert('Confirmação enviada com sucesso!');
                })
                .catch(error => {
                    console.error('Erro ao enviar os dados:', error);
                    alert('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
                });
        }
    });

    document.getElementById("confirmBtn").addEventListener('click', () => loadContent('confirm.html', 'confirmation.js'));
    document.getElementById("locationBtn").addEventListener('click', () => loadContent('location.html'));
    document.getElementById("giftBtn").addEventListener('click', () => loadContent('giftgallery.html'));
    document.getElementById("dressCodeBtn").addEventListener('click', () => loadContent('dress-code.html'));

    // Inicializa com a seção de fotos
    loadContent('carousel.html');
});