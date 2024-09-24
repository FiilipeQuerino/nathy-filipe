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
                contentContainer.innerHTML = html; // Insere o conteúdo HTML carregado
                contentContainer.scrollIntoView({ behavior: 'smooth' }); // Rola para a seção
            })
            .catch(error => console.error('Erro ao carregar o conteúdo:', error));
    }

    // Eventos de clique para carregar as seções
    confirmBtn.addEventListener('click', function() {
        loadContent('confirm.html'); // Carrega a página de confirmação
    });

    giftBtn.addEventListener('click', function() {
        loadContent('giftgallery.html'); // Carrega a página de lista de presentes
    });

    dressCodeBtn.addEventListener('click', function() {
        loadContent('dresscode.html'); // Carrega a página de dress code
    });

    locationBtn.addEventListener('click', function() {
        loadContent('location.html'); // Exemplo de carregamento de localização (se houver um arquivo)
    });
});
