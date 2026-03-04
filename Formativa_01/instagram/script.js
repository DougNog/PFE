// JavaScript simples

function toggleLike(botao) {
    botao.classList.toggle('liked');
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

