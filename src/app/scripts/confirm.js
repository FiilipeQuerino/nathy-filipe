function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000); // Duração de 3 segundos
}

document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const response = document.querySelector('input[name="response"]:checked').value;

    console.log("Dados enviados para o Google Sheets:", { name, response });

    // Envia para o Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbx1lz26tFUsSn8DXNOu62Pm3lvJsgVVqa-HHfMs4DsUOVBVN5pZjBndrIJPtTCAPPG3-Q/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, response })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do Google Sheets:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar os dados para o Google Sheets:', error);
    });

    // Envia para a API da Vercel
    fetch('/api/rsvp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, response })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showToast('Erro: ' + data.error);
        } else {
            showToast('Confirmação enviada com sucesso!');
            const whatsappMessage = `Olá%2C+meu+nome+é+${name}+e+${response === 'Sim' ? 'irei comparecer' : 'não poderei comparecer'} ao casamento.`;
            console.log('Mensagem para WhatsApp:', whatsappMessage);
            window.location.href = `https://wa.me/5548996193227?text=${whatsappMessage}`;
        }
    })
    .catch(error => {
        console.error('Erro ao enviar os dados para a API da Vercel:', error);
        showToast('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
    });
});
