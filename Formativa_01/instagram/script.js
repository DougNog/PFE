// ✅ Curtir com feedback visual
function toggleLike(botao) {
    botao.classList.toggle('liked');
    botao.textContent = botao.classList.contains('liked') ? '❤️' : '🤍';
}

// ✅ Carousel corrigido
function moveCarousel(btn, direction) {
    var carouselContainer = btn.closest('.carousel');
    if (!carouselContainer) return;

    var imagesContainer = carouselContainer.querySelector('.carousel-images');
    var totalImages = carouselContainer.querySelectorAll('.carousel-images img').length;
    var dots = carouselContainer.querySelectorAll('.dot');

    var currentIndex = parseInt(imagesContainer.getAttribute('data-current') || '0');
    var newIndex = (currentIndex + direction + totalImages) % totalImages; // ✅ loop sem if/else

    imagesContainer.style.transform = 'translateX(-' + (newIndex * 100) + '%)';
    imagesContainer.setAttribute('data-current', newIndex);

    dots.forEach(function(dot, index) {
        dot.classList.toggle('active', index === newIndex);
    });
}

// ✅ Botões Seguir
document.querySelectorAll('.follow-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        this.textContent = this.textContent === 'Seguir' ? 'Seguindo' : 'Seguir';
    });
});

// ✅ Ver tudo
var btnVerTudo = document.querySelector('.see-all');
if (btnVerTudo) {
    btnVerTudo.addEventListener('click', function() {
        alert('Sugestões mostradas!');
    });
}

// ✅ Mudar conta
var btnMudar = document.querySelector('.switch-btn');
if (btnMudar) {
    btnMudar.addEventListener('click', function() {
        alert('Trocar de conta!');
    });
}