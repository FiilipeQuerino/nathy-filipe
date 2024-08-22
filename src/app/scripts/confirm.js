document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const response = document.querySelector('input[name="response"]:checked').value;

    // Verifica os dados que serão enviados
    console.log("Dados enviados para o Google Sheets:", { name, response });

    // Envia para o Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbx1lz26tFUsSn8DXNOu62Pm3lvJsgVVqa-HHfMs4DsUOVBVN5pZjBndrIJPtTCAPPG3-Q/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, response })
    })
    .then(response => response.json()) // Tenta processar a resposta (pode falhar em 'no-cors')
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
            alert('Erro: ' + data.error);
        } else {
            alert('Confirmação enviada com sucesso!');
            const whatsappMessage = `Olá%2C+meu+nome+é+${name}+e+${response === 'Sim' ? 'irei comparecer' : 'não poderei comparecer'} ao casamento.`;
            console.log('Mensagem para WhatsApp:', whatsappMessage);  // Exibe a mensagem no console
            window.location.href = `https://wa.me/5548996193227?text=${whatsappMessage}`;
        }
    })
    .catch(error => {
        console.error('Erro ao enviar os dados para a API da Vercel:', error);
        alert('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
    });
});
