document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const response = document.querySelector('input[name="response"]:checked').value;

    fetch('https://script.google.com/macros/s/AKfycbx1lz26tFUsSn8DXNOu62Pm3lvJsgVVqa-HHfMs4DsUOVBVN5pZjBndrIJPtTCAPPG3-Q/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, response })
    })
    .then(() => {
        alert('Confirmação enviada com sucesso!');
        const whatsappMessage = `Olá%2C+meu+nome+é+${name}+e+${response === 'Sim' ? 'confirmo' : 'não poderei comparecer'} ao casamento.`;
        window.location.href = `https://wa.me/5548996193227?text=${whatsappMessage}`;
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
    });
});
