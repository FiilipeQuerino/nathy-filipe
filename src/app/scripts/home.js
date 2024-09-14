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

    // Delegação de evento para o container principal
    document.getElementById('contentContainer').addEventListener('submit', function (event) {
        event.preventDefault();

        // Verifica se o alvo do evento é o formulário de confirmação
        if (event.target.id === 'rsvp-form') {
            // Código para enviar os dados do formulário
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            // Envia os dados para o Google Sheets (ajuste a URL de acordo com o seu script)
            fetch('https://script.google.com/macros/s/AKfycbz3wi1TacxhCiNDu37bq_uV0HkMpzXYp8uUorTz83OAAJkoRXQM5HvZtKyu62uftPQN/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(() => {
                    // Mostra mensagem de sucesso
                    alert('Confirmação enviada com sucesso!');
                })
                .catch(error => {
                    console.error('Erro ao enviar os dados:', error);
                    alert('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
                });
        }
    });

    document.getElementById("confirmBtn").addEventListener('click', () => loadContent('confirm.html'));
    document.getElementById("locationBtn").addEventListener('click', () => loadContent('location.html'));
    document.getElementById("giftBtn").addEventListener('click', () => { loadContent('giftgallery.html'); });
    document.getElementById("dressCodeBtn").addEventListener('click', () => loadContent('dress-code.html'));

    // Inicializa com a seção de confirmação
    loadContent('confirm.html');
});