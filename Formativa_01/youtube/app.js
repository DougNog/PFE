const COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#e91e63'];

function colorFor(str) {
  let h = 0;
  for (let c of str) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
  return COLORS[Math.abs(h) % COLORS.length];
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

const VIDEOS = [
  { id:'v1', title:'Como criar uma IA do zero em Python – Tutorial completo', channel:'TechBrasil', avatar:'TB', subs:'1.2M', views:'3.4M', ago:'2 semanas', duration:'28:14', emoji:'🤖', category:'Tecnologia', likes:'142K', desc:'Neste vídeo vamos aprender a criar uma inteligência artificial do zero usando Python e TensorFlow. Cobrimos redes neurais, treinamento e deployment.', comments:[{u:'Carlos Dev',c:'Melhor tutorial que já vi! Clareza impecável.'},{u:'Ana Lima',c:'Finalmente entendi backpropagation. Obrigada!'},{u:'Pedro Tech',c:'Que qualidade de conteúdo, top demais!'}] },
  { id:'v2', title:'10 músicas brasileiras que definiram uma geração', channel:'Música BR', avatar:'MB', subs:'890K', views:'1.8M', ago:'3 dias', duration:'18:42', emoji:'🎵', category:'Música', likes:'98K', desc:'Uma viagem nostálgica pelas músicas que marcaram gerações de brasileiros. Do MPB ao axé, cada faixa tem uma história.', comments:[{u:'Mariana S',c:'Que saudade! Cresci ouvindo essas músicas.'},{u:'João R',c:'Faltou colocar Legião Urbana na lista!'}] },
  { id:'v3', title:'FIFA 26 – Primeiras impressões e gameplay completo', channel:'GamersGG', avatar:'GG', subs:'2.1M', views:'5.2M', ago:'1 dia', duration:'45:07', emoji:'🎮', category:'Jogos', likes:'310K', desc:'Testamos o FIFA 26 antes do lançamento oficial. Veja tudo sobre as novas mecânicas, modos de jogo e muito mais nesta análise completa.', comments:[{u:'Gustavo F',c:'Os gráficos ficaram absurdos esse ano!'},{u:'Luana M',c:'Finalmente servidores decentes haha'}] },
  { id:'v4', title:'Flamengo 4x1 Palmeiras – Melhores momentos', channel:'Futebol HD', avatar:'FH', subs:'3.5M', views:'8.7M', ago:'5 horas', duration:'12:33', emoji:'⚽', category:'Esportes', likes:'450K', desc:'Reveja todos os gols e melhores lances da grande partida entre Flamengo e Palmeiras pelo Brasileirão.', comments:[{u:'Rubro Negro',c:'Que goleada histórica, que time!'},{u:'Palmeirense',c:'Foi um dia ruim, mas voltaremos!'}] },
  { id:'v5', title:'Receita de pão caseiro sem sova – fácil e delicioso', channel:'Cozinha Real', avatar:'CR', subs:'450K', views:'920K', ago:'1 semana', duration:'14:22', emoji:'🍞', category:'Culinária', likes:'76K', desc:'Aprenda a fazer um pão caseiro macio e crocante sem precisar sovar a massa. Receita simples para o dia a dia.', comments:[{u:'Beatriz C',c:'Fiz ontem e ficou incrível!'},{u:'Sr. José',c:'Minha esposa adorou, obrigado!'}] },
  { id:'v6', title:'Aprenda React em 1 hora – Guia para iniciantes 2026', channel:'Dev Academy', avatar:'DA', subs:'780K', views:'2.1M', ago:'4 dias', duration:'59:48', emoji:'⚛️', category:'Tecnologia', likes:'167K', desc:'O guia mais completo e atualizado de React para quem está começando. Hooks, componentes, estado e muito mais.', comments:[{u:'Henrique P',c:'Conteúdo de qualidade, valeu!'},{u:'Tatiane V',c:'Melhor explicação de useEffect que já vi'}] },
  { id:'v7', title:'Viagem de mochila pela Europa com R$5000', channel:'Viajante BR', avatar:'VB', subs:'330K', views:'680K', ago:'3 semanas', duration:'22:15', emoji:'✈️', category:'Viagem', likes:'52K', desc:'Roteiro completo de 30 dias pela Europa com orçamento apertado. Dicas de hospedagem, transporte e alimentação barata.', comments:[{u:'Fernanda O',c:'Sonho de consumo! Vou usar esse roteiro.'},{u:'Lucas T',c:'Que aventura, adorei ver!'}] },
  { id:'v8', title:'Treino HIIT 30 minutos – Sem equipamento em casa', channel:'Fit Life', avatar:'FL', subs:'1.1M', views:'4.3M', ago:'2 dias', duration:'31:05', emoji:'💪', category:'Fitness', likes:'220K', desc:'Treino intervalado de alta intensidade para fazer em casa sem nenhum equipamento. Queime gordura e ganhe condicionamento.', comments:[{u:'Rafael M',c:'Fiz hoje e estou destruído! Ótimo!'},{u:'Camila A',c:'Perdi 4kg em 3 semanas fazendo isso'}] },
  { id:'v9', title:'Entendendo o mercado financeiro: guia completo', channel:'Finanças BR', avatar:'FB', subs:'2.3M', views:'7.1M', ago:'1 semana', duration:'52:38', emoji:'📈', category:'Finanças', likes:'389K', desc:'Do básico ao avançado: tudo que você precisa saber sobre renda variável, tesouro direto, fundos e mais.', comments:[{u:'André N',c:'Clareza incrível! Finalmente entendi ETFs.'},{u:'Simone C',c:'Comecei a investir depois desse vídeo'}] },
  { id:'v10', title:'Construindo um app completo com Next.js 15', channel:'Dev Academy', avatar:'DA', subs:'780K', views:'1.4M', ago:'6 dias', duration:'1:23:44', emoji:'🚀', category:'Tecnologia', likes:'95K', desc:'Projeto completo do zero ao deploy usando Next.js 15, Tailwind CSS, Prisma e Vercel. App de gestão de tarefas.', comments:[{u:'Miguel S',c:'Exatamente o que eu precisava, obrigado!'},{u:'Vitória P',c:'App ficou lindo, seguindo o tutorial'}] },
  { id:'v11', title:'Top 10 melhores álbuns de rap nacional de todos os tempos', channel:'Música BR', avatar:'MB', subs:'890K', views:'1.1M', ago:'2 semanas', duration:'19:54', emoji:'🎤', category:'Música', likes:'88K', desc:'Uma análise dos álbuns que definiram o rap nacional, de Racionais MCs a Emicida e além.', comments:[{u:'Igor L',c:'Racionais no 1 é indiscutível!'},{u:'Priya K',c:'Faltou BK na lista!'}] },
  { id:'v12', title:'GTA VI – Análise completa do gameplay revelado', channel:'GamersGG', avatar:'GG', subs:'2.1M', views:'12.3M', ago:'3 semanas', duration:'38:21', emoji:'🏙️', category:'Jogos', likes:'790K', desc:'Analisamos cada detalhe do gameplay revelado de GTA VI: física, mapa, personagens, mecânicas e expectativas.', comments:[{u:'Roberto V',c:'2025 não pode chegar logo o suficiente!'},{u:'Daniela K',c:'Impressionante o nível de detalhe!'}] },
];

const CATEGORIES = ['Todos','Tecnologia','Música','Jogos','Esportes','Culinária','Fitness','Finanças','Viagem'];
let activeCategory = 'Todos';
let subscribed = {};
let descExpanded = false;

// ── CHIPS ──────────────────────────────────────────
function renderChips() {
  const row = document.getElementById('chips-row');
  row.innerHTML = CATEGORIES.map(c =>
    `<div class="chip ${c === activeCategory ? 'active' : ''}" onclick="setCategory('${c}')">${c}</div>`
  ).join('');
}

function setCategory(cat) {
  activeCategory = cat;
  renderChips();
  renderGrid(getFilteredVideos());
}

function getFilteredVideos() {
  if (activeCategory === 'Todos') return VIDEOS;
  return VIDEOS.filter(v => v.category === activeCategory);
}

// ── GRID ───────────────────────────────────────────
function renderGrid(videos) {
  const grid = document.getElementById('video-grid');
  if (!videos.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text3);">Nenhum vídeo encontrado.</div>`;
    return;
  }
  grid.innerHTML = videos.map(v => `
    <div class="video-card" onclick="playVideo('${v.id}')">
      <div class="thumbnail">
        <div class="thumbnail-placeholder">${v.emoji}</div>
        <div class="duration">${v.duration}</div>
      </div>
      <div class="video-info">
        <div class="channel-avatar" style="background:${colorFor(v.channel)}">${v.avatar}</div>
        <div class="video-meta">
          <div class="video-title">${v.title}</div>
          <div class="video-channel">
            ${v.channel}
            <span class="verified-badge"></span>
          </div>
          <div class="video-stats">${v.views} visualizações · ${v.ago}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ── PLAYER ─────────────────────────────────────────
function playVideo(id) {
  const v = VIDEOS.find(x => x.id === id);
  if (!v) return;

  document.getElementById('home-view').style.display = 'none';
  document.getElementById('player-view').style.display = 'block';

  document.getElementById('player-embed').innerHTML = `
    <div style="width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;cursor:pointer;"
         onclick="this.innerHTML='<div style=\\'width:100%;height:100%;background:#111;display:flex;align-items:center;justify-content:center;font-size:72px;\\'>${v.emoji}</div>'">
      <div style="font-size:72px">${v.emoji}</div>
      <div style="background:var(--accent);border-radius:50%;width:56px;height:56px;display:flex;align-items:center;justify-content:center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
      </div>
      <div style="color:var(--text2);font-size:13px;">Clique para reproduzir</div>
    </div>
  `;

  document.getElementById('player-title').textContent = v.title;

  const chAvatar = document.getElementById('player-ch-avatar');
  chAvatar.textContent = v.avatar;
  chAvatar.style.background = colorFor(v.channel);

  document.getElementById('player-ch-name').textContent = v.channel;
  document.getElementById('player-ch-subs').textContent = v.subs + ' inscritos';
  document.getElementById('like-count').textContent = v.likes;
  document.getElementById('desc-views').textContent = v.views + ' visualizações · ' + v.ago;
  document.getElementById('desc-text').textContent = v.desc;

  descExpanded = false;
  document.getElementById('desc-text').classList.remove('expanded');

  const subBtn = document.getElementById('sub-btn');
  subBtn.textContent = subscribed[v.channel] ? 'Inscrito' : 'Inscrever-se';
  subBtn.className = 'sub-btn' + (subscribed[v.channel] ? ' subscribed' : '');

  document.getElementById('comments-title').textContent = v.comments.length + ' comentários';
  document.getElementById('comments-list').innerHTML = v.comments.map(c => `
    <div class="comment">
      <div class="channel-avatar" style="width:34px;height:34px;border-radius:50%;background:${colorFor(c.u)};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:white;flex-shrink:0;">${initials(c.u)}</div>
      <div class="comment-body">
        <div class="comment-author">@${c.u.replace(' ', '').toLowerCase()}</div>
        <div class="comment-text">${c.c}</div>
      </div>
    </div>
  `).join('');

  const others = VIDEOS.filter(x => x.id !== id);
  document.getElementById('up-next-list').innerHTML = others.slice(0, 8).map(o => `
    <div class="mini-card" onclick="playVideo('${o.id}')">
      <div class="mini-thumb">
        <div class="mini-thumb-placeholder">${o.emoji}</div>
        <div class="mini-duration">${o.duration}</div>
      </div>
      <div class="mini-info">
        <div class="mini-title">${o.title}</div>
        <div class="mini-channel">${o.channel}</div>
        <div class="mini-stats">${o.views} views</div>
      </div>
    </div>
  `).join('');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── NAVIGATION ─────────────────────────────────────
function showHome() {
  document.getElementById('home-view').style.display   = 'block';
  document.getElementById('player-view').style.display = 'none';
  document.getElementById('shorts-view').style.display = 'none';
  document.querySelectorAll('.nav-item').forEach((el, i) => el.classList.toggle('active', i === 0));
}

function showCategory(cat) {
  showHome();
  setCategory(cat);
}

// ── ACTIONS ────────────────────────────────────────
function toggleSub() {
  const name = document.getElementById('player-ch-name').textContent;
  subscribed[name] = !subscribed[name];
  const btn = document.getElementById('sub-btn');
  btn.textContent = subscribed[name] ? 'Inscrito' : 'Inscrever-se';
  btn.className = 'sub-btn' + (subscribed[name] ? ' subscribed' : '');
}

function toggleDesc() {
  descExpanded = !descExpanded;
  document.getElementById('desc-text').classList.toggle('expanded', descExpanded);
}

function doSearch() {
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  showHome();
  if (!q) {
    activeCategory = 'Todos';
    renderChips();
    renderGrid(VIDEOS);
    return;
  }
  activeCategory = 'Todos';
  renderChips();
  const results = VIDEOS.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.channel.toLowerCase().includes(q) ||
    v.category.toLowerCase().includes(q)
  );
  renderGrid(results);
}

// ── INIT ───────────────────────────────────────────
renderChips();
renderGrid(VIDEOS);

// ── SHORTS DATA ────────────────────────────────────
const SHORTS = [
  { id:'s1', title:'Esse bug me fez perder 3 horas 😭 #dev #programação', channel:'TechBrasil', avatar:'TB', views:'4.2M', likes:'312K', emoji:'🐛', bg:'#1a0a2e' },
  { id:'s2', title:'Receita de brigadeiro gourmet em 60 segundos 🍫', channel:'Cozinha Real', avatar:'CR', views:'8.7M', likes:'901K', emoji:'🍫', bg:'#1a0a0a' },
  { id:'s3', title:'Drible impossível que parou o estádio ⚽🔥', channel:'Futebol HD', avatar:'FH', views:'12.1M', likes:'1.4M', emoji:'⚽', bg:'#0a1a0a' },
  { id:'s4', title:'Glitch secreto no GTA VI que a Rockstar não quer que você saiba 👀', channel:'GamersGG', avatar:'GG', views:'6.5M', likes:'540K', emoji:'🕹️', bg:'#0a0f1a' },
  { id:'s5', title:'Acorde MAIS CEDO com esse hack mental ⏰✨', channel:'Fit Life', avatar:'FL', views:'3.3M', likes:'287K', emoji:'⏰', bg:'#1a150a' },
  { id:'s6', title:'Investir R$100 por mês durante 20 anos = isso 📈', channel:'Finanças BR', avatar:'FB', views:'9.2M', likes:'820K', emoji:'💸', bg:'#0a1a10' },
  { id:'s7', title:'Esse riff de guitarra é impossível de tirar da cabeça 🎸', channel:'Música BR', avatar:'MB', views:'5.6M', likes:'495K', emoji:'🎸', bg:'#1a0a18' },
  { id:'s8', title:'Lisboa em 30 segundos – vale a pena? ✈️🇵🇹', channel:'Viajante BR', avatar:'VB', views:'2.8M', likes:'231K', emoji:'🗺️', bg:'#0a1218' },
  { id:'s9', title:'Como fazer CSS Grid em 60 segundos ⚡', channel:'Dev Academy', avatar:'DA', views:'7.1M', likes:'660K', emoji:'💻', bg:'#0d0a1a' },
  { id:'s10', title:'Esse cachorro aprendeu a fazer café ☕🐶', channel:'Fit Life', avatar:'FL', views:'21.4M', likes:'3.1M', emoji:'🐶', bg:'#1a1006' },
];

let shortLikes = {};
let shortSubs  = {};

// ── SHORTS RENDER ──────────────────────────────────
function renderShorts() {
  const container = document.getElementById('shorts-container');
  container.innerHTML = SHORTS.map((s, idx) => `
    <div class="short-card" id="short-card-${s.id}">
      <div class="short-video" style="background:${s.bg}" onclick="toggleShortPlay('${s.id}')">
        <div class="short-bg" id="short-bg-${s.id}">${s.emoji}</div>
        <div class="short-gradient"></div>

        <div class="short-play-overlay" id="short-overlay-${s.id}">
          <div class="short-play-btn">
            <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>

        <button class="short-sound-btn" onclick="event.stopPropagation()" title="Som">
          <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>

        <div class="short-info">
          <div class="short-channel-row">
            <div class="short-ch-avatar" style="background:${colorFor(s.channel)}">${s.avatar}</div>
            <span class="short-ch-name">${s.channel}</span>
            <button class="short-sub-btn ${shortSubs[s.channel] ? 'subscribed' : ''}"
                    id="ssub-${s.id}"
                    onclick="event.stopPropagation(); toggleShortSub('${s.id}', '${s.channel}')">
              ${shortSubs[s.channel] ? 'Inscrito' : 'Seguir'}
            </button>
          </div>
          <div class="short-title">${s.title}</div>
          <div class="short-stats">${s.views} visualizações</div>
        </div>
      </div>

      <div class="short-actions">
        <div class="short-action ${shortLikes[s.id] ? 'liked' : ''}" id="slike-${s.id}" onclick="toggleShortLike('${s.id}')">
          <div class="short-action-icon">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
          </div>
          <span class="short-action-label" id="slike-count-${s.id}">${shortLikes[s.id] ? addK(s.likes) : s.likes}</span>
        </div>

        <div class="short-action" onclick="focusShortComment('${s.id}')">
          <div class="short-action-icon">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span class="short-action-label">Comentar</span>
        </div>

        <div class="short-action">
          <div class="short-action-icon">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </div>
          <span class="short-action-label">Compartilhar</span>
        </div>

        <div class="short-action">
          <div class="short-action-icon">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </div>
          <span class="short-action-label">Mais</span>
        </div>
      </div>
    </div>
  `).join('');
}

function addK(val) {
  const n = parseInt(val.replace(/[KM]/g, m => m === 'K' ? '000' : '000000'));
  if (isNaN(n)) return val;
  // just bump by 1 visually
  return val;
}

let shortPlaying = {};
function toggleShortPlay(id) {
  shortPlaying[id] = !shortPlaying[id];
  const overlay = document.getElementById(`short-overlay-${id}`);
  const bg = document.getElementById(`short-bg-${id}`);
  if (shortPlaying[id]) {
    overlay.style.opacity = '0';
    bg.style.animation = 'shortPulse 1.5s ease-in-out infinite';
  } else {
    overlay.style.opacity = '1';
    bg.style.animation = 'none';
  }
}

function toggleShortLike(id) {
  shortLikes[id] = !shortLikes[id];
  const el = document.getElementById(`slike-${id}`);
  if (shortLikes[id]) el.classList.add('liked');
  else el.classList.remove('liked');
}

function toggleShortSub(id, channel) {
  shortSubs[channel] = !shortSubs[channel];
  const btn = document.getElementById(`ssub-${id}`);
  btn.textContent = shortSubs[channel] ? 'Inscrito' : 'Seguir';
  btn.className = 'short-sub-btn' + (shortSubs[channel] ? ' subscribed' : '');
}

function focusShortComment(id) {
  const card = document.getElementById(`short-card-${id}`);
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── SHOW SHORTS ────────────────────────────────────
function showShorts() {
  document.getElementById('home-view').style.display   = 'none';
  document.getElementById('player-view').style.display = 'none';
  document.getElementById('shorts-view').style.display = 'block';
  document.querySelectorAll('.nav-item').forEach((el, i) => el.classList.toggle('active', i === 1));
  renderShorts();
}