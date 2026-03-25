import { useState } from 'react'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080810;
    color: #eeeef5;
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    min-height: 100vh;
  }

  .app {
    max-width: 880px;
    margin: 0 auto;
    padding: 64px 24px 100px;
    animation: fadeUp 0.6s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Header */
  .header {
    margin-bottom: 80px;
    position: relative;
  }
  .header-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7c6af7;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .header-eyebrow::after {
    content: '';
    flex: 1;
    max-width: 60px;
    height: 1px;
    background: #7c6af7;
    opacity: 0.4;
  }
  .header-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 9vw, 6.5rem);
    font-weight: 800;
    line-height: 0.9;
    letter-spacing: -0.03em;
    color: #fff;
    margin-bottom: 20px;
  }
  .header-title span { color: #7c6af7; }
  .header-sub {
    font-size: 1rem;
    color: #5a5a72;
    font-weight: 400;
  }
  .header-dot {
    position: absolute;
    top: 0; right: 0;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(124,106,247,0.18) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* Sections */
  .section { margin-bottom: 72px; animation: fadeUp 0.6s ease both; }
  .section:nth-of-type(2) { animation-delay: 0.08s; }
  .section:nth-of-type(3) { animation-delay: 0.16s; }

  .section-header {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 28px;
  }
  .section-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: #3a3a52;
    letter-spacing: 0.1em;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 3.5vw, 2rem);
    font-weight: 700;
    color: #eeeef5;
    letter-spacing: -0.02em;
  }
  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(124,106,247,0.3), transparent);
  }
  .section-note {
    margin-top: 18px;
    font-size: 0.78rem;
    color: #3a3a52;
    font-family: 'JetBrains Mono', monospace;
  }

  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 14px;
  }

  /* Saudacao */
  .saudacao {
    background: #0f0f1a;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px;
    padding: 28px 22px;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .saudacao::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(124,106,247,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .saudacao:hover {
    transform: translateY(-5px);
    border-color: rgba(124,106,247,0.35);
    box-shadow: 0 16px 48px rgba(124,106,247,0.12);
  }
  .saudacao:hover::before { opacity: 1; }
  .saudacao-emoji { font-size: 1.9rem; display: block; margin-bottom: 14px; }
  .saudacao-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #a598f8;
    margin-bottom: 6px;
  }
  .saudacao-desc { font-size: 0.78rem; color: #3e3e58; line-height: 1.5; }

  /* Intervalo */
  .intervalo {
    background: #0f0f1a;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px;
    padding: 40px;
    max-width: 420px;
    display: flex;
    align-items: center;
    gap: 36px;
    position: relative;
    overflow: hidden;
  }
  .intervalo::after {
    content: 'BREAK';
    position: absolute;
    bottom: -10px; right: 16px;
    font-family: 'Syne', sans-serif;
    font-size: 4.5rem;
    font-weight: 800;
    color: rgba(255,196,64,0.04);
    letter-spacing: -0.04em;
    pointer-events: none;
    user-select: none;
  }
  .intervalo-clock { display: flex; align-items: center; gap: 6px; }
  .clock-block { display: flex; flex-direction: column; align-items: center; }
  .clock-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 3.8rem;
    font-weight: 500;
    color: #ffc440;
    line-height: 1;
    letter-spacing: -0.04em;
  }
  .clock-lbl {
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a4a32;
    margin-top: 5px;
  }
  .clock-sep {
    font-family: 'JetBrains Mono', monospace;
    font-size: 3rem;
    color: #ffc440;
    line-height: 1;
    margin-bottom: 14px;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0.1; } }
  .intervalo-info { display: flex; flex-direction: column; gap: 4px; }
  .intervalo-emoji { font-size: 1.6rem; margin-bottom: 6px; }
  .intervalo-label {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffc440;
  }
  .intervalo-sub { font-size: 0.78rem; color: #4a4a32; }

  /* Alarme */
  .alarme {
    background: #0f0f1a;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px;
    padding: 40px;
    max-width: 420px;
    display: flex;
    align-items: center;
    gap: 32px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .alarme.ativo {
    border-color: rgba(255,80,80,0.4);
    box-shadow: 0 0 60px rgba(255,80,80,0.1);
  }
  .alarme-btn {
    position: relative;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    flex-shrink: 0;
  }
  .alarme-icon {
    font-size: 3.2rem;
    display: block;
    transition: transform 0.2s ease;
    user-select: none;
  }
  .alarme-btn:hover .alarme-icon { transform: scale(1.12); }
  .alarme-icon.shake { animation: shake 0.25s ease infinite; }
  @keyframes shake {
    0%, 100% { transform: rotate(-18deg); }
    50%       { transform: rotate(18deg); }
  }
  .ripple {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .ripple span {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #ff5050;
    border-radius: 50%;
    animation: ripple 1.2s ease-out infinite;
    opacity: 0;
  }
  .ripple span:nth-child(2) { animation-delay: 0.4s; }
  .ripple span:nth-child(3) { animation-delay: 0.8s; }
  @keyframes ripple {
    0%   { width: 10px; height: 10px; opacity: 0.7; }
    100% { width: 90px; height: 90px; opacity: 0; }
  }
  .alarme-body { display: flex; flex-direction: column; gap: 6px; }
  .alarme-status {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #3e3e58;
    transition: color 0.3s ease;
  }
  .ativo .alarme-status { color: #ff5050; }
  .alarme-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #eeeef5;
    transition: color 0.3s ease;
  }
  .ativo .alarme-title { color: #ff8080; }
  .alarme-hint { font-size: 0.78rem; color: #3e3e58; }

  @media (max-width: 520px) {
    .app { padding: 40px 16px 80px; }
    .grid { grid-template-columns: 1fr; }
    .intervalo, .alarme { flex-direction: column; align-items: flex-start; gap: 20px; }
    .header-dot { display: none; }
  }
`

function App() {
  return (
    <>
      <style>{styles}</style>
      <div className="app">

        <header className="header">
          <div className="header-dot" />
          <div className="header-eyebrow">React — aula 01</div>
          <h1 className="header-title">Olá,<br /><span>React!</span></h1>
          <p className="header-sub">Estou alterando meu primeiro componente.</p>
        </header>

        <section className="section">
          <div className="section-header">
            <span className="section-num">01</span>
            <h2 className="section-title">Minha primeira aula de react</h2>
            <div className="section-line" />
          </div>
          <div className="grid">
            <Saudacao />
          </div>
          <p className="section-note">// posso repetir o componente quantas vezes quiser</p>
        </section>

        <section className="section">
          <div className="section-header">
            <span className="section-num">02</span>
            <h2 className="section-title">Intervalo</h2>
            <div className="section-line" />
          </div>
          <Intervalo hora="10" minuto="30" />
        </section>

        <section className="section">
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">Alarme</h2>
            <div className="section-line" />
          </div>
          <Alarme />
        </section>

      </div>
    </>
  )
}

function Saudacao() {
  return (
    <div className="saudacao">
      <span className="saudacao-emoji">👋</span>
      <h2 className="saudacao-name">Olá Alunos!</h2>
      <p className="saudacao-desc">este componente foi criado separadamente</p>
    </div>
  )
}

function Intervalo({ hora, minuto }) {
  return (
    <div className="intervalo">
      <div className="intervalo-clock">
        <div className="clock-block">
          <span className="clock-num">{hora}</span>
          <span className="clock-lbl">horas</span>
        </div>
        <span className="clock-sep">:</span>
        <div className="clock-block">
          <span className="clock-num">{minuto}</span>
          <span className="clock-lbl">min</span>
        </div>
      </div>
      <div className="intervalo-info">
        <span className="intervalo-emoji">☕</span>
        <span className="intervalo-label">É hora do intervalo!</span>
        <span className="intervalo-sub">Descanse um pouco</span>
      </div>
    </div>
  )
}

function Alarme() {
  const [ativo, setAtivo] = useState(false)

  return (
    <div className={`alarme${ativo ? ' ativo' : ''}`}>
      <button className="alarme-btn" onClick={() => setAtivo(!ativo)}>
        <span className={`alarme-icon${ativo ? ' shake' : ''}`}>🔔</span>
        {ativo && (
          <div className="ripple">
            <span /><span /><span />
          </div>
        )}
      </button>
      <div className="alarme-body">
        <span className="alarme-status">{ativo ? '● tocando agora' : '○ em espera'}</span>
        <h2 className="alarme-title">
          {ativo ? 'O alarme está tocando!' : 'Alarme pronto'}
        </h2>
        <p className="alarme-hint">
          {ativo ? 'Clique no sino para parar' : 'Clique no sino para ativar'}
        </p>
      </div>
    </div>
  )
}

export default App