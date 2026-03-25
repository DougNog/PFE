import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (

    <div>
      <h1>Olá, React!</h1>
      <p>Estou alterando meu primeiro componente.</p>

      <div style={{ padding: '20px' }}>
        <h1>Minha primeira aula de react</h1>

        {/* Aqui chamamos o componente que criamos acima */}
        <Saudacao />
        <Saudacao />
        <Saudacao />

        <p>note que posso repetir o componente quantas vezes quiser</p>
        <hr />
      </div>

      <div>
        <h1>Intervalo</h1>

        {/* Aqui chamamos o componente que criamos acima */}
        <Intervalo hora="10" minuto="30" />
        <hr />
      </div>

      <div>
        <h1>Alarme</h1>

        {/* Aqui chamamos o componente que criamos acima */}
        <Alarme />
      </div>

    </div>
    
  )
}

function Saudacao() {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#007bff' }}>Olá Alunos!</h2>
      <p>este componente foi criado separadamente</p>
    </div>

  );
}

function Intervalo({ hora, minuto }) {
  return (
    <div style={{ backgroundColor: '#65307e', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#007bff' }}>É hora do intervalo!</h2>
      <h3>Hora: {hora}</h3>
      <h3>Minuto: {minuto}</h3>
    </div>
  );
}

function Alarme() {
  return (
    <div style={{ backgroundColor: '#01f2fa', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
      <h2 style={{ color: '#007bff' }}>O alarme esra tocando!</h2>
      <p>este componente foi criado separadamente</p>
    </div>

  );
}

export default App