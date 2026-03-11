// JavaScript simples

function toggleLike(botao) {
    botao.classList.toggle('liked');
}

// Carousel
function moveCarousel(btn, direction) {
    // Find carousel container
    var carouselContainer = btn.parentElement;
    while (carouselContainer && !carouselContainer.classList.contains('carousel')) {
        carouselContainer = carouselContainer.parentElement;
    }
    
    if (!carouselContainer) return;
    
    var imagesContainer = carouselContainer.querySelector('.carousel-images');
    var images = carouselContainer.querySelectorAll('.carousel-images img');
    var dots = carouselContainer.querySelectorAll('.dot');
    
    // Get current index from data attribute or default to 0
    var currentIndex = parseInt(imagesContainer.getAttribute('data-current')) || 0;
    
    var newIndex = currentIndex + direction;
    
    // Loop around
    if (newIndex < 0) {
        newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
        newIndex = 0;
    }
    
    // Move images
    imagesContainer.style.transform = 'translateX(-' + (newIndex * 100) + '%)';
    imagesContainer.setAttribute('data-current', newIndex);
    
    // Update dots
    dots.forEach(function(dot, index) {
        dot.classList.toggle('active', index === newIndex);
    });
}

var btnsSeguir = document.querySelectorAll('.follow-btn');
for (var i = 0; i < btnsSeguir.length; i++) {
    btnsSeguir[i].addEventListener('click', function() {
        if (this.innerHTML === 'Seguir') {
            this.innerHTML = 'Seguindo';
        } else {
            this.innerHTML = 'Seguir';
        }
    });
}

var btnVerTudo = document.querySelector('.see-all');
if (btnVerTudo) {
    btnVerTudo.addEventListener('click', function() {
        alert('Sugestoes mostradas!');
    });
}

var btnMudar = document.querySelector('.switch-btn');
if (btnMudar) {
    btnMudar.addEventListener('click', function() {
        alert('Trocar de conta!');
    });
}

