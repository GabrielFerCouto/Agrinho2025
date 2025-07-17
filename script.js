// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Variáveis de Acessibilidade ---
    const body = document.body;
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const toggleThemeBtn = document.getElementById('toggle-theme');

    const defaultFontSize = 16; // Tamanho de fonte base inicial em pixels
    let currentFontSize = defaultFontSize; // Armazena o tamanho da fonte atual
    const fontStep = 2; // Passo de aumento/diminuição
    const maxFontSize = 24; // Tamanho máximo da fonte
    const minFontSize = 12; // Tamanho mínimo da fonte

    // Função para aplicar o tamanho da fonte
    function applyFontSize() {
        // Atualiza a variável CSS --base-font-size
        document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        document.documentElement.style.setProperty('--h1-font-size', `${currentFontSize * 1.5625}px`); // 2.5em = 2.5 * 16 = 40px
        document.documentElement.style.setProperty('--h2-font-size', `${currentFontSize * 1.125}px`); // 1.8em = 1.8 * 16 = 28.8px
        document.documentElement.style.setProperty('--p-font-size', `${currentFontSize * 0.9}px`); // 1em = 1 * 16 = 16px
    }


    // --- 1. Funcionalidade Aumentar/Diminuir Fonte ---

    // Aumentar fonte
    increaseFontBtn.addEventListener('click', function() {
        if (currentFontSize < maxFontSize) {
            currentFontSize += fontStep;
            applyFontSize();
        }
    });

    // Diminuir fonte
    decreaseFontBtn.addEventListener('click', function() {
        if (currentFontSize > minFontSize) {
            currentFontSize -= fontStep;
            applyFontSize();
        }
    });

    // --- 2. Funcionalidade Tema Claro/Escuro ---

    // Verifica preferência do usuário ou tema salvo
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            if (savedTheme === 'dark-mode') {
                toggleThemeBtn.textContent = '🌞'; // Atualiza o ícone do botão
            }
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Se o usuário tem preferência por tema escuro no sistema operacional
            body.classList.add('dark-mode');
            toggleThemeBtn.textContent = '🌞';
        }
    }

    // Carrega o tema ao carregar a página
    loadTheme();

    // Alternar tema ao clicar no botão
    toggleThemeBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode'); // Adiciona/remove a classe 'dark-mode' do body
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode'); // Salva a preferência
            toggleThemeBtn.textContent = '🌞';
        } else {
            localStorage.setItem('theme', 'light-mode'); // Salva a preferência
            toggleThemeBtn.textContent = '🌙';
        }
    });

    // --- Início do código JS anterior (zoom na imagem e botão voltar ao topo) ---

    // --- 3. Zoom na Imagem ---

    const images = document.querySelectorAll('main img');
    let zoomedImg = null;

    images.forEach(img => {
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', function() {
            if (zoomedImg === this) {
                removeZoom();
            } else {
                if (zoomedImg) {
                    removeZoom();
                }
                applyZoom(this);
            }
        });
    });

    function applyZoom(imgElement) {
        zoomedImg = imgElement;

        const overlay = document.createElement('div');
        overlay.id = 'image-zoom-overlay';
        document.body.appendChild(overlay);

        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        overlay.style.cursor = 'zoom-out';

        const zoomedImageCopy = new Image();
        zoomedImageCopy.src = imgElement.src;
        zoomedImageCopy.alt = imgElement.alt;

        zoomedImageCopy.style.maxWidth = '90%';
        zoomedImageCopy.style.maxHeight = '90%';
        zoomedImageCopy.style.objectFit = 'contain';
        zoomedImageCopy.style.borderRadius = '12px'; /* Combinando com o novo estilo CSS */
        zoomedImageCopy.style.boxShadow = '0 0 25px rgba(0, 0, 0, 0.7)'; /* Sombra mais forte no zoom */
        zoomedImageCopy.style.transform = 'scale(0.8)';
        zoomedImageCopy.style.transition = 'transform 0.3s ease-out';
        zoomedImageCopy.style.cursor = 'default';

        overlay.appendChild(zoomedImageCopy);

        setTimeout(() => {
            zoomedImageCopy.style.transform = 'scale(1)';
        }, 10);

        overlay.addEventListener('click', removeZoom);
    }

    function removeZoom() {
        const overlay = document.getElementById('image-zoom-overlay');
        if (overlay) {
            const zoomedImageCopy = overlay.querySelector('img');
            if (zoomedImageCopy) {
                zoomedImageCopy.style.transform = 'scale(0.8)';
            }
            setTimeout(() => {
                overlay.remove();
                zoomedImg = null;
            }, 300);
        }
    }

    // --- 4. Botão "Voltar ao Topo" Suave ---

    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.textContent = 'Voltar ao Topo';
    document.body.appendChild(scrollToTopBtn);

    // Ocultar os estilos JS do botão aqui, pois já estão no CSS

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Fim do código JS anterior ---
});