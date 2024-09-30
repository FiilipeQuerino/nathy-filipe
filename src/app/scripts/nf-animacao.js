document.addEventListener('DOMContentLoaded', function () {
    iniciarTransicao();
});

function iniciarTransicao() {
    window.addEventListener('scroll', () => {
        const letrasElement = document.getElementById('letras-secao');
        const countdownSection = document.getElementById('countdown-section');

        const letrasPosition = letrasElement.getBoundingClientRect().top;
        const countdownPosition = countdownSection.getBoundingClientRect().top;

        if (letrasPosition < window.innerHeight / 1.5) {
            letrasElement.classList.add('juntar');
        }

        if (countdownPosition < window.innerHeight / 2) {
            letrasElement.classList.add('mostrar-nomes');
        }
    });
}
