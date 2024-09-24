document.addEventListener("DOMContentLoaded", function() {
    // Botões do menu
    const confirmBtn = document.getElementById('confirmBtn');
    const locationBtn = document.getElementById('locationBtn');
    const giftBtn = document.getElementById('giftBtn');
    const dressCodeBtn = document.getElementById('dressCodeBtn');

    // Seção onde o conteúdo será carregado
    const contentContainer = document.getElementById('content-container');
    
    // Função para carregar conteúdo dinamicamente
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                contentContainer.innerHTML = html;
                contentContainer.scrollIntoView({ behavior: 'smooth' });
                contentContainer.classList.add('active'); // Aplica a classe active para mostrar a seção
            })
            .catch(error => console.error('Erro ao carregar o conteúdo:', error));
    }

    // Eventos de clique para carregar as seções
    confirmBtn.addEventListener('click', function() {
        loadContent('confirm.html');
    });

    giftBtn.addEventListener('click', function() {
        loadContent('giftgallery.html');
    });

    dressCodeBtn.addEventListener('click', function() {
        loadContent('dresscode.html');
    });

    locationBtn.addEventListener('click', function() {
        loadContent('location.html');
    });
});
