// Instagram Clone - JavaScript

// Função para togglar o like (clique no coração)
function toggleLike(button) {
    const post = button.closest('.post');
    const likeBtn = post.querySelector('.like-btn');
    const postImage = post.querySelector('.post-image');
    const heartPath = likeBtn.querySelector('.heart-path');
    
    // Toggle da classe liked
    likeBtn.classList.toggle('liked');
    postImage.classList.toggle('liked');
    
    // Atualizar contador de likes
    updateLikesCount(post, likeBtn.classList.contains('liked'));
    
    // Animação do overlay de like
    if (likeBtn.classList.contains('liked')) {
        const overlay = postImage.querySelector('.like-overlay');
        overlay.classList.add('active');
        
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 500);
    }
}

// Função para atualizar o contador de likes
function updateLikesCount(post, isLiked) {
    const likesText = post.querySelector('.post-likes span');
    const currentText = likesText.innerHTML;
    
    // Extrair número atual de likes
    const match = currentText.match(/outras (\d+(?:\.\d+)?) pessoas?/);
    if (match) {
        let likes = parseFloat(match[1].replace('.', ''));
        
        if (isLiked) {
            likes += 1;
        } else {
            likes -= 1;
        }
        
        // Formatar número
        let formattedLikes;
        if (likes >= 1000) {
            formattedLikes = (likes / 1000).toFixed(1).replace('.', '.') + ' mil';
        } else {
            formattedLikes = likes.toLocaleString('pt-BR');
        }
        
        // Atualizar texto
        likesText.innerHTML = currentText.replace(
            /outras \d+(?:\.\d+)?\.?\d* pessoas?/,
            `outras ${formattedLikes} pessoas`
        );
    }
}

// Clique duplo na imagem para dar like
document.querySelectorAll('.post-image').forEach(image => {
    let clickCount = 0;
    let clickTimer;
    
    image.addEventListener('click', function(e) {
        // Ignorar cliques no botão de like overlay
        if (e.target.closest('.like-overlay')) return;
        
        clickCount++;
        
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 300);
        } else if (clickCount === 2) {
            clearTimeout(clickTimer);
            clickCount = 0;
            
            // Dar like
            const post = image.closest('.post');
            const likeBtn = post.querySelector('.like-btn');
            
            if (!likeBtn.classList.contains('liked')) {
                likeBtn.click();
            }
        }
    });
});

// Clique na imagem também dá like (single click na imagem)
document.querySelectorAll('.post-image img').forEach(img => {
    img.addEventListener('dblclick', function(e) {
        // Impedir propagação para não conflitar com o clique simples
        e.stopPropagation();
        
        const post = img.closest('.post');
        const likeBtn = post.querySelector('.like-btn');
        
        if (!likeBtn.classList.contains('liked')) {
            likeBtn.click();
        }
    });
});

// Animação de entrada dos posts ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const postObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação inicial
document.querySelectorAll('.post').forEach((post, index) => {
    post.style.opacity = '0';
    post.style.transform = 'translateY(20px)';
    post.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    postObserver.observe(post);
});

// stories - efeito de visualização
document.querySelectorAll('.story').forEach(story => {
    story.addEventListener('click', function() {
        // Reset de todos os stories
        document.querySelectorAll('.story-ring').forEach(ring => {
            ring.style.background = 'var(--story-ring)';
        });
        
        // Marcar como visto (opcional)
        // this.querySelector('.story-ring').style.background = '#dbdbdb';
    });
});

// Efeito de clique nos botões de navegação
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove efeito active de todos
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.style.opacity = '0.5';
        });
        
        // Adiciona ao clicado
        this.style.opacity = '1';
        
        //Após 200ms, restaura
        setTimeout(() => {
            this.style.opacity = '';
        }, 200);
    });
});

// Efeito de digitação no input de comentário (simulação)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Instagram Clone carregado com sucesso!');
    console.log('Funcionalidades:');
    console.log('- Clique no coração para dar/tirar like');
    console.log('- Clique duplo na imagem para dar like');
    console.log('- Animações de entrada nos posts');
    console.log('- Stories interativos');
    console.log('- Sidebar com sugestões');
    
    // Funcionalidade dos botões de seguir
    document.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Seguir') {
                this.textContent = 'Seguindo';
                this.style.color = '#262626';
            } else {
                this.textContent = 'Seguir';
                this.style.color = '#0095f6';
            }
        });
    });
    
    // Funcionalidade do botão "Ver tudo" nas sugestões
    document.querySelector('.see-all').addEventListener('click', function() {
        alert('Funcionalidade de ver todas as sugestões!');
    });
    
    // Funcionalidade do botão "Mudar" no perfil
    document.querySelector('.switch-btn').addEventListener('click', function() {
        alert('Funcionalidade de trocar de conta!');
    });
});

