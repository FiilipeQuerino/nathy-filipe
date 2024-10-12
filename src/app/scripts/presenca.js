document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rsvp-form');
    const phoneSection = document.getElementById('phone-section');
    const phoneInput = document.getElementById('phone');
    const responseRadios = document.querySelectorAll('input[name="response"]');

    // Função para mostrar ou esconder o campo de celular
    responseRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'Sim') {
                phoneSection.style.display = 'block';
                phoneInput.required = true;
            } else {
                phoneSection.style.display = 'none';
                phoneInput.required = false;
            }
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const responseElement = document.querySelector('input[name="response"]:checked');

        if (!responseElement) {
            showToast('Por favor, selecione Sim ou Não.');
            return;
        }

        const response = responseElement.value.trim();
        const phone = phoneInput.value.trim();

        if (response === 'Sim' && !phone) {
            showToast('Por favor, insira seu número de celular.');
            return;
        }

        localStorage.setItem('nome', name);
        localStorage.setItem('resposta', response);
        localStorage.setItem('celular', phone);

        enviarParaGoogleSheets(name, response, phone);
        // abrirWhatsApp(`Olá%2C+aqui+é+${name}+e+${response === 'Sim' ? 'irei comparecer' : 'não poderei comparecer'} ao casamento.`);
    });

});

// Função para rolar até a próxima seção
function rolarParaProximaSecao() {
    const nextSection = document.getElementById('presentes'); // Seleciona a próxima seção
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a próxima seção
    }
}

// Função para enviar dados para o Google Sheets
function enviarParaGoogleSheets(name, response, phone) {
    fetch('https://script.google.com/macros/s/AKfycbzQ_Qh1po3gU2mXkkfw5wWdf6dP0GIObEcniHUqdZIosuPx7csyQGhZhC8vs0PovoSX/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "response": response, "phone": phone })
    })
        .then(() => {
            showToast('Confirmação enviada com sucesso!');
            setTimeout(rolarParaProximaSecao, 2000);
        })
        .catch(error => {
            console.error('Erro ao enviar os dados para o Google Sheets:', error);
            showToast('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
        });
}
