document.addEventListener('DOMContentLoaded', function () {
    const animacaoContainer = document.querySelector('#nf-animacao');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.letra-n').style.animationPlayState = 'running';
                document.querySelector('.letra-f').style.animationPlayState = 'running';
                document.querySelector('.coracao').style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.5 });

    observer.observe(animacaoContainer);
});
