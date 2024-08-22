document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;

    fetch('https://script.google.com/macros/s/AKfycbx1lz26tFUsSn8DXNOu62Pm3lvJsgVVqa-HHfMs4DsUOVBVN5pZjBndrIJPtTCAPPG3-Q/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    .then(response => {
        alert('Confirmação enviada com sucesso!');
        window.location.href = `https://wa.me/5548996193227?text=Olá%2C+meu+nome+é+${name}+e+confirmo+minha+presença+no+casamento.+Obrigado+por+me+convidar.`;
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
    });
});
