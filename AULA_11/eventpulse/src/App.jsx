import React, { useState, useEffect } from 'react';
import './App.css';
import faviconBotao from './assets/engrenagem.png'; // Favicon do botão flutuante

function App() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("Palestra");
  const [eventVagas, setEventVagas] = useState("10");
  const [eventList, setEventList] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState(""); // Feature 2: Filtro por pesquisa
  const [showModal, setShowModal] = useState(false); // Feature 5: Modal de alterações

  // Carregar dados iniciais do LocalStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("@eventpulse_data");
    if (savedEvents) setEventList(JSON.parse(savedEvents));
  }, []);

  // Sincronizar alterações com o LocalStorage
  useEffect(() => {
    localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
  }, [eventList]);

  const addEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    const newEvent = {
      id: crypto.randomUUID(),
      title: eventTitle,
      type: eventType,
      status: "Agendado",
      date: new Date().toLocaleDateString(),
      vagas: parseInt(eventVagas) // Feature 3: Vagas disponíveis
    };
    setEventList([newEvent, ...eventList]);
    setEventTitle("");
    setEventVagas("10");
  };

  const toggleStatus = (id) => {
    setEventList(eventList.map(evt => {
      if (evt.id === id) {
        const nextStatus = evt.status === "Agendado" ? "Em Andamento" : 
        evt.status === "Em Andamento" ? "Encerrado" : "Agendado";
        return { ...evt, status: nextStatus };
      }
      return evt;
    }));
  };

  const deleteEvent = (id) => {
    setEventList(eventList.filter(evt => evt.id !== id));
  };

  // Feature 3: Diminuir vagas ao inscrever
  const inscreverAluno = (id) => {
    setEventList(eventList.map(evt => {
      if (evt.id === id && evt.vagas > 0) {
        return { ...evt, vagas: evt.vagas - 1 };
      }
      return evt;
    }));
  };

  // Feature 4: Limpar cronograma com confirmação
  const limparCronograma = () => {
    if (window.confirm("Tem certeza? Vai apagar saporra")) {
      setEventList([]);
      localStorage.removeItem("@eventpulse_data");
    }
  };

  // Feature 2: Filtro de pesquisa
  let filteredEvents = eventList.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === "Todos" ||
      (filter === "Agendados" && evt.status === "Agendado") ||
      (filter === "Em Andamento" && evt.status === "Em Andamento") ||
      (filter === "Encerrados" && evt.status === "Encerrado");
    
    return matchesSearch && matchesFilter;
  });

  // Feature 1: Destaque cronológico - Workshops no início
  filteredEvents = filteredEvents.sort((a, b) => {
    if (a.type === "Workshop" && b.type !== "Workshop") return -1;
    if (a.type !== "Workshop" && b.type === "Workshop") return 1;
    return 0;
  });

  return (
    <div className="app-container">
      <header>
        <h1>EventPulse</h1>
        <p>Gestão de Eventos Acadêmicos</p>
        {/* Feature 4: Botão Limpar Cronograma */}
        <button className="clear-btn" onClick={limparCronograma}>
          Limpar Cronograma
        </button>
      </header>

      <section className="form-section">
        <form onSubmit={addEvent}>
          <input
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Nome do evento ou atividade..."
          />
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="Palestra">Palestra</option>
            <option value="Workshop">Workshop</option>
            <option value="Painel">Painel</option>
          </select>
          {/* Feature 3: Seletor de vagas */}
          <select value={eventVagas} onChange={(e) => setEventVagas(e.target.value)}>
            <option value="10">10 vagas</option>
            <option value="30">30 vagas</option>
            <option value="50">50 vagas</option>
          </select>
          <button type="submit">Agendar</button>
        </form>
      </section>

      {/* Feature 2: Input de pesquisa */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Pesquisar por título do evento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </section>

      <section className="filter-section">
        {["Todos", "Agendados", "Em Andamento", "Encerrados"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      <main className="event-grid">
        {filteredEvents.map(item => (
          <div
            key={item.id}
            className={`event-card ${item.type.toLowerCase()} 
${item.status.toLowerCase().replace(" ", "-")}`}
          >
            <div className="event-content">
              <h3>{item.title}</h3>
              <span className="event-tag">Tipo: {item.type}</span>
              <span className="status-badge">Status: {item.status}</span>
              {/* Feature 3: Exibir vagas disponíveis */}
              <span className="vagas-badge">Vagas: {item.vagas}</span>
              <small>Registrado em: {item.date}</small>
            </div>
            <div className="event-actions">
              <button onClick={() => toggleStatus(item.id)} className="status-btn">
                {item.status === "Agendado" ? "Iniciar" : item.status === "Em Andamento" 
? "Encerrar" : "Reiniciar"}
              </button>
              {/* Feature 3: Botão inscrever aluno */}
              <button 
                onClick={() => inscreverAluno(item.id)} 
                className={`inscricao-btn ${item.vagas === 0 ? 'desabilitado' : ''}`}
                disabled={item.vagas === 0}
              >
                {item.vagas === 0 ? "Esgotado" : "Inscrever"}
              </button>
              <button onClick={() => deleteEvent(item.id)} className="delete">
                Remover
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Feature 5: Botão flutuante com favicon no canto inferior direito */}
      <button className="floating-btn" onClick={() => setShowModal(true)} title="Ver alterações">
        <img 
          src={faviconBotao} 
          alt="Engrenagem" 
          className="floating-icon-img"
        />
      </button>

      {/* Feature 5: Modal com alterações CSS */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h2>Alterações Realizadas no CSS</h2>
            
            <h3>Alterações CSS:</h3>
            <ul>
              <li>
                <strong>1. Header com degradê:</strong> Adicionado gradiente visual 
                no cabeçalho para destaque marcante com cores azul a roxo.
              </li>
              <li>
                <strong>2. Cards com shadow aumentada:</strong> Box-shadow mais 
                pronunciada nos event-cards para profundidade e modernidade.
              </li>
              <li>
                <strong>3. Animação no hover:</strong> Cards fazem uma transição 
                suave com transform e elevação ao passar o mouse.
              </li>
              <li>
                <strong>Bônus - Botão flutuante:</strong> Botão redondo fixo no 
                canto inferior direito com ícone de engrenagem.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;