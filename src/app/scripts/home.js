document.addEventListener("DOMContentLoaded", function () {
    // Contagem regressiva
    const countdownElement = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    const weddingDate = new Date("2025-03-08T15:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.days.textContent = days;
        countdownElement.hours.textContent = hours;
        countdownElement.minutes.textContent = minutes;
        countdownElement.seconds.textContent = seconds;
    }

    setInterval(updateCountdown, 1000);

    // Função para carregar conteúdo de seções dinâmicas
    function loadContent(url, isConfirmation) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("contentContainer").innerHTML = data;

                if (isConfirmation) {
                    addConfirmationJS();
                }

                // Adicionar lógica de carrossel se a seção for o carrossel
                if (url === 'carousel.html') {
                    addCarouselJS();
                }

                // Carregar a galeria de presentes
                if (url === 'giftgallery.html') {
                    loadGiftGallery();
                }
            })
            .catch(error => console.error('Erro ao carregar conteúdo:', error));
    }

    // Função de adicionar lógica do carrossel
    function addCarouselJS() {
        const carouselInner = document.querySelector('.carousel-inner');
        const slides = document.querySelectorAll('.carousel-item');
        let index = 0;

        function showSlide(n) {
            if (n >= slides.length) index = 0;
            else if (n < 0) index = slides.length - 1;
            else index = n;

            carouselInner.style.transform = `translateX(${-index * 100}%)`;
        }

        function nextSlide() {
            showSlide(index + 1);
        }

        // Transição automática a cada 5 segundos
        setInterval(nextSlide, 5000);

        // Mostrar o slide inicial
        showSlide(index);
    }

    // Função para carregar e exibir a galeria de presentes
    function loadGiftGallery() {
        fetch('../data/products.json')
            .then(response => response.json())
            .then(gifts => {
                const giftGallery = document.getElementById('giftGallery');
                giftGallery.innerHTML = ''; // Limpar galeria antes de carregar

                gifts.forEach(gift => {
                    // Cria os elementos de cada presente
                    const giftCard = document.createElement('div');
                    giftCard.classList.add('gift-card');
                    giftCard.innerHTML = `
                        <img src="${gift.image}" alt="${gift.name}" class="gift-image">
                        <h3>${gift.name}</h3>
                        <p>${gift.description}</p>
                        <p>Preço: R$ ${gift.price.toFixed(2)}</p>
                        <button class="buy-btn" data-pix="${gift.linkPix}" data-price="${gift.price}">Comprar</button>
                    `;

                    // Adicionar o card na galeria
                    giftGallery.appendChild(giftCard);
                });

                // Adicionar eventos de clique aos botões "Comprar"
                document.querySelectorAll('.buy-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const pixLink = this.getAttribute('data-pix');
                        const price = parseFloat(this.getAttribute('data-price'));

                        // Mostrar modal de pagamento
                        showPaymentModal(pixLink, price);
                    });
                });
            })
            .catch(error => console.error('Erro ao carregar o JSON:', error));
    }

    // Função para exibir o modal de pagamento
    function showPaymentModal(pixLink, price) {
        const modal = document.getElementById('paymentModal');
        const pixLinkElement = document.getElementById('pixLink');
        const cardPaymentElement = document.getElementById('cardPayment');

        pixLinkElement.value = pixLink;

        // Exibir o número de parcelas para pagamento com cartão para valores acima de R$300
        if (price > 300) {
            cardPaymentElement.innerHTML = `
                <label for="installments">Escolha o número de parcelas:</label>
                <select id="installments">
                    <option value="1">1x de R$ ${price.toFixed(2)}</option>
                    <option value="2">2x de R$ ${(price / 2).toFixed(2)}</option>
                    <option value="3">3x de R$ ${(price / 3).toFixed(2)}</option>
                    <option value="4">4x de R$ ${(price / 4).toFixed(2)}</option>
                    <option value="5">5x de R$ ${(price / 5).toFixed(2)}</option>
                </select>
            `;
        } else {
            cardPaymentElement.innerHTML = `<p>Pagamento disponível em até 1x de R$ ${price.toFixed(2)}</p>`;
        }

        modal.style.display = 'block';
    }

    // Função para enviar mensagem pelo WhatsApp
    function sendWhatsAppMessage() {
        const pixLink = document.getElementById('pixLink').value;
        const installments = document.getElementById('installments') ? document.getElementById('installments').value : '1';

        const whatsappMessage = `Olá, gostaria de pagar o presente em ${installments}x. Aqui está o link do Pix: ${pixLink}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/5548998365558?text=${encodedMessage}`, '_blank');
    }

    document.getElementById('closeModal').addEventListener('click', closeModal);

    function closeModal() {
        document.getElementById('paymentModal').style.display = 'none';
    }

    // Adicionar eventos de clique para navegação
    document.getElementById("confirmBtn").addEventListener('click', () => loadContent('confirm.html', true));
    document.getElementById("locationBtn").addEventListener('click', () => loadContent('location.html', false));
    document.getElementById("giftBtn").addEventListener('click', () => loadContent('giftgallery.html', false));
    document.getElementById("dressCodeBtn").addEventListener('click', () => loadContent('dress-code.html', false));

    // Inicializa com a seção de carrossel
    loadContent('carousel.html', false);

    // Adicionar evento para o botão de fechar modal
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);

    // Adicionar evento para o botão de enviar WhatsApp
    document.getElementById('sendWhatsAppBtn').addEventListener('click', sendWhatsAppMessage);
});