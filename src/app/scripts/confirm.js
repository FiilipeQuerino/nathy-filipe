document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('rsvp-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const responseElement = document.querySelector('input[name="response"]:checked');

        if (!responseElement) {
            showToast('Por favor, selecione Sim ou Não.');
            return;
        }

        const response = responseElement.value.trim();

        console.log("Nome capturado:", name);
        console.log("Resposta capturada:", response);

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
            console.log('Mensagem para WhatsApp:', whatsappMessage);
            window.location.href = `https://wa.me/5548996193227?text=${whatsappMessage}`;
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
});