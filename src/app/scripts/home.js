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

    function loadContent(url, isConfirmation) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("contentContainer").innerHTML = data;

                if (isConfirmation) {
                    addConfirmationJS();
                }
            })
            .catch(error => console.error('Erro ao carregar conteúdo:', error));
    }

    function addConfirmationJS() {
        document.getElementById('rsvp-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const responseElement = document.querySelector('input[name="response"]:checked');

            if (!responseElement) {
                showToast('Por favor, selecione Sim ou Não.');
                return;
            }

            const response = responseElement.value.trim();

            fetch('https://script.google.com/macros/s/AKfycbz3wi1TacxhCiNDu37bq_uV0HkMpzXYp8uUorTz83OAAJkoRXQM5HvZtKyu62uftPQN/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "name": name, "response": response })
            })
            .then(() => {
                showToast('Confirmação enviada com sucesso!');
                const whatsappMessage = `Olá%2C+aqui+é+${name}+e+${response === 'Sim' ? 'irei comparecer' : 'não poderei comparecer'} ao casamento.`;
                window.open(`https://wa.me/5548996193227?text=${whatsappMessage}`, '_blank');

                // Carrega a seção de presentes após a confirmação
                loadContent('giftgallery.html', false);
            })
            .catch(error => {
                console.error('Erro ao enviar os dados para o Google Sheets:', error);
                showToast('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
            });
        });

        function showToast(message) {
            const toast = document.getElementById("toast");
            toast.textContent = message;
            toast.className = "toast show";
            setTimeout(function() {
                toast.className = toast.className.replace("show", "");
            }, 3000);
        }
    }

    // document.getElementById('contentContainer').addEventListener('submit', function (event) {
    //     event.preventDefault();

    //     if (event.target.id === 'rsvp-form') {
    //         const formData = new FormData(event.target);
    //         const data = Object.fromEntries(formData.entries());

    //         fetch('https://script.google.com/macros/s/AKfycbz3wi1TacxhCiNDu37bq_uV0HkMpzXYp8uUorTz83OAAJkoRXQM5HvZtKyu62uftPQN/exec', {
    //             method: 'POST',
    //             mode: 'no-cors',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         })
    //             .then(() => {
    //                 showToast('Confirmação enviada com sucesso!');
    //             })
    //             .catch(error => {
    //                 console.error('Erro ao enviar os dados:', error);
    //                 showToast('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
    //             });
    //     }
    // });

    document.getElementById("confirmBtn").addEventListener('click', () => loadContent('confirm.html', true));
    document.getElementById("locationBtn").addEventListener('click', () => loadContent('location.html', false));
    document.getElementById("giftBtn").addEventListener('click', () => loadContent('giftgallery.html', false));
    document.getElementById("dressCodeBtn").addEventListener('click', () => loadContent('dress-code.html', false));

    // Inicializa com a seção de confirmação
    loadContent('carousel.html', false);
});