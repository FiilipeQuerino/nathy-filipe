document.addEventListener("DOMContentLoaded", function() {
    // Botões do menu
    const confirmBtn = document.getElementById('confirmBtn');
    const locationBtn = document.getElementById('locationBtn');
    const giftBtn = document.getElementById('giftBtn');
    const dressCodeBtn = document.getElementById('dressCodeBtn');

    // Seções
    const confirmSection = document.getElementById('confirmSection');
    const locationSection = document.getElementById('locationSection');
    const giftSection = document.getElementById('giftSection');
    const dressCodeSection = document.getElementById('dressCodeSection');

    // Função para esconder todas as seções
    function hideAllSections() {
        confirmSection.style.display = 'none';
        locationSection.style.display = 'none';
        giftSection.style.display = 'none';
        dressCodeSection.style.display = 'none';
    }

    // Função para exibir a seção com scroll suave
    function showSection(section) {
        hideAllSections();
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth' });
    }

    // Eventos de clique
    confirmBtn.addEventListener('click', function() {
        showSection(confirmSection);
    });

    locationBtn.addEventListener('click', function() {
        showSection(locationSection);
    });

    giftBtn.addEventListener('click', function() {
        showSection(giftSection);
    });

    dressCodeBtn.addEventListener('click', function() {
        showSection(dressCodeSection);
    });
});
