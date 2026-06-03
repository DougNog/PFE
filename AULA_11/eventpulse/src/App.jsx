// ============================================================
// IMPORTAÇÕES - Trazendo as dependências necessárias
// ============================================================

import React, { useState, useEffect } from 'react';
// useState: Hook para gerenciar estado (dados que mudam na aplicação)
// useEffect: Hook para executar efeitos colaterais (carregar dados, sincronizar, etc)

import './App.css';
// Importa o arquivo CSS com estilos da aplicação

import faviconBotao from './assets/engrenagem.png';
// Importa a imagem da engrenagem para usar no botão flutuante

// ============================================================
// COMPONENTE PRINCIPAL - App
// ============================================================

function App() {
  
  // ============================================================
  // ESTADOS DA APLICAÇÃO - Variáveis que podem mudar
  // ============================================================

  // Estado para armazenar o título do evento que o usuário está digitando
  const [eventTitle, setEventTitle] = useState("");
  
  // Estado para armazenar o tipo de evento selecionado (Palestra, Workshop, Painel)
  const [eventType, setEventType] = useState("Palestra");
  
  // Estado para armazenar a quantidade de vagas disponíveis no evento
  const [eventVagas, setEventVagas] = useState("10");
  
  // Estado para armazenar a lista completa de eventos
  // Cada evento é um objeto com: id, title, type, status, date, vagas
  const [eventList, setEventList] = useState([]);
  
  // Estado para armazenar o filtro de status atualmente selecionado
  // Pode ser: "Todos", "Agendados", "Em Andamento", "Encerrados"
  const [filter, setFilter] = useState("Todos");
  
  // FEATURE 2: Estado para armazenar o termo de busca/pesquisa
  // Permite filtrar eventos por título digitando na barra de pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  
  // FEATURE 5: Estado para controlar se o modal está visível ou não
  // True = modal aberto, False = modal fechado
  const [showModal, setShowModal] = useState(false);

  // ============================================================
  // EFEITO 1: Carregar dados ao abrir a aplicação
  // ============================================================

  useEffect(() => {
    // Este efeito executa apenas uma vez, quando o componente é montado
    // Ele busca os dados salvos no LocalStorage (memória do navegador)
    
    const savedEvents = localStorage.getItem("@eventpulse_data");
    // Tenta buscar dados com a chave "@eventpulse_data" do LocalStorage
    
    if (savedEvents) setEventList(JSON.parse(savedEvents));
    // Se encontrou dados, converte a string JSON em um objeto JavaScript
    // e atualiza o estado eventList com esses dados
  }, []);
  // O array vazio [] significa que este efeito roda apenas na primeira renderização

  // ============================================================
  // EFEITO 2: Sincronizar dados com LocalStorage sempre que a lista mudar
  // ============================================================

  useEffect(() => {
    // Este efeito executa sempre que eventList muda
    // Garante que os dados estejam sempre salvos no navegador
    
    localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
    // Converte a lista de eventos em JSON (string) e salva no LocalStorage
  }, [eventList]);
  // O array [eventList] como dependência significa: rode este efeito quando eventList mudar

  // ============================================================
  // FUNÇÃO 1: Adicionar novo evento
  // ============================================================

  const addEvent = (e) => {
    // Função chamada ao clicar no botão "Agendar"
    
    e.preventDefault();
    // Previne o comportamento padrão do formulário (recarregar página)
    
    if (!eventTitle.trim()) return;
    // Se o título está vazio (ou apenas espaços), interrompe a função
    // trim() remove espaços em branco do início e final
    
    const newEvent = {
      // Cria um novo objeto de evento com as seguintes propriedades:
      
      id: crypto.randomUUID(),
      // Gera um ID único usando criptografia (identificador do evento)
      
      title: eventTitle,
      // O título digitado pelo usuário
      
      type: eventType,
      // O tipo selecionado (Palestra, Workshop, Painel)
      
      status: "Agendado",
      // Status inicial sempre é "Agendado"
      
      date: new Date().toLocaleDateString(),
      // A data atual em formato local (ex: 13/05/2026)
      
      vagas: parseInt(eventVagas)
      // FEATURE 3: Converte o número de vagas de string para número inteiro
    };
    
    setEventList([newEvent, ...eventList]);
    // Adiciona o novo evento no início da lista
    // [...eventList] espalha (copia) todos os eventos existentes
    
    setEventTitle("");
    // Limpa o campo de título para o próximo evento
    
    setEventVagas("10");
    // Reseta as vagas para o valor padrão
  };

  // ============================================================
  // FUNÇÃO 2: Alterar status do evento
  // ============================================================

  const toggleStatus = (id) => {
    // Função chamada quando clica no botão "Iniciar", "Encerrar" ou "Reiniciar"
    // id: o identificador único do evento
    
    setEventList(eventList.map(evt => {
      // map() percorre cada evento na lista e retorna uma versão atualizada
      
      if (evt.id === id) {
        // Se encontrou o evento com o ID correto:
        
        const nextStatus = evt.status === "Agendado" ? "Em Andamento" : 
        evt.status === "Em Andamento" ? "Encerrado" : "Agendado";
        // Ciclo de status:
        // Agendado → Em Andamento → Encerrado → Agendado (volta ao início)
        
        return { ...evt, status: nextStatus };
        // Retorna o evento com o status atualizado
        // {...evt} cria uma cópia do evento e substitui apenas o status
      }
      
      return evt;
      // Se não é o evento procurado, retorna sem mudanças
    }));
  };

  // ============================================================
  // FUNÇÃO 3: Deletar/Remover evento
  // ============================================================

  const deleteEvent = (id) => {
    // Função chamada quando clica no botão "Remover"
    
    setEventList(eventList.filter(evt => evt.id !== id));
    // filter() cria uma nova lista com todos os eventos EXCETO aquele com o ID fornecido
    // evt.id !== id significa "mantenha apenas os eventos com ID diferente"
  };

  // ============================================================
  // FUNÇÃO 4: Inscrever aluno (FEATURE 3)
  // ============================================================

  const inscreverAluno = (id) => {
    // Função chamada quando clica no botão "Inscrever"
    // Diminui em 1 a quantidade de vagas disponíveis
    
    setEventList(eventList.map(evt => {
      // Percorre cada evento
      
      if (evt.id === id && evt.vagas > 0) {
        // Se é o evento certo E ainda há vagas disponíveis:
        
        return { ...evt, vagas: evt.vagas - 1 };
        // Retorna o evento com uma vaga a menos
      }
      
      return evt;
      // Caso contrário, retorna o evento sem mudanças
    }));
  };

  // ============================================================
  // FUNÇÃO 5: Limpar cronograma (FEATURE 4)
  // ============================================================

  const limparCronograma = () => {
    // Função chamada quando clica no botão "Limpar Cronograma"
    // Remove TODOS os eventos após confirmação do usuário
    
    if (window.confirm("Tem certeza? Vai apagar saporra")) {
      // Mostra um diálogo pedindo confirmação
      // Se o usuário clicar "OK" (true), continua; se "Cancelar" (false), interrompe
      
      setEventList([]);
      // Define a lista de eventos como vazia
      
      localStorage.removeItem("@eventpulse_data");
      // Remove os dados salvos do LocalStorage
    }
  };

  // ============================================================
  // LÓGICA DE FILTRAGEM (FEATURE 2 + Sistema de Filtros)
  // ============================================================

  let filteredEvents = eventList.filter(evt => {
    // Começa com a lista completa de eventos
    
    const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase());
    // Verifica se o título do evento contém o termo de busca
    // toLowerCase() converte para minúsculas para comparação case-insensitive
    // includes() retorna true se a string contém o termo
    
    const matchesFilter = 
      filter === "Todos" ||
      // Se o filtro é "Todos", passa todos os eventos
      
      (filter === "Agendados" && evt.status === "Agendado") ||
      // Se o filtro é "Agendados", passa apenas eventos com status "Agendado"
      
      (filter === "Em Andamento" && evt.status === "Em Andamento") ||
      // Se o filtro é "Em Andamento", passa apenas esses eventos
      
      (filter === "Encerrados" && evt.status === "Encerrado");
      // Se o filtro é "Encerrados", passa apenas esses eventos
    
    return matchesSearch && matchesFilter;
    // Retorna o evento apenas se AMBAS as condições forem verdadeiras
    // (tanto o termo de busca quanto o filtro de status)
  });

  // ============================================================
  // ORDENAÇÃO DE EVENTOS (FEATURE 1)
  // ============================================================

  filteredEvents = filteredEvents.sort((a, b) => {
    // sort() ordena os eventos com base em uma comparação
    
    if (a.type === "Workshop" && b.type !== "Workshop") return -1;
    // Se o primeiro evento é Workshop e o segundo não é, coloca o Workshop primeiro
    // -1 significa "a vem antes de b"
    
    if (a.type !== "Workshop" && b.type === "Workshop") return 1;
    // Se o primeiro não é Workshop mas o segundo é, coloca o Workshop primeiro
    // 1 significa "a vem depois de b"
    
    return 0;
    // Se ambos são Workshop ou nenhum é, mantém a ordem atual
  });

  // ============================================================
  // RETORNO DO COMPONENTE - Interface do usuário
  // ============================================================

  return (
    <div className="app-container">
      {/* Contêiner principal da aplicação */}

      {/* ===== CABEÇALHO ===== */}
      <header>
        <h1>EventPulse</h1>
        {/* Título principal da aplicação */}
        
        <p>Gestão de Eventos Acadêmicos</p>
        {/* Subtítulo descrevendo a função da aplicação */}
        
        {/* FEATURE 4: Botão para limpar todos os eventos */}
        <button className="clear-btn" onClick={limparCronograma}>
          Limpar Cronograma
        </button>
        {/* Quando clicado, chama a função limparCronograma */}
      </header>

      {/* ===== FORMULÁRIO DE NOVO EVENTO ===== */}
      <section className="form-section">
        <form onSubmit={addEvent}>
          {/* Formulário que chama addEvent quando enviado */}
          
          <input
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Nome do evento ou atividade..."
          />
          {/* Campo de entrada para o nome do evento */}
          {/* value={eventTitle}: mostra o valor atual do estado */}
          {/* onChange: atualiza o estado sempre que o usuário digita */}
          {/* e.target.value: pega o texto digitado */}
          
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            {/* Dropdown para selecionar o tipo de evento */}
            
            <option value="Palestra">Palestra</option>
            <option value="Workshop">Workshop</option>
            <option value="Painel">Painel</option>
            {/* Opções disponíveis */}
          </select>
          
          {/* FEATURE 3: Seletor de quantidade de vagas */}
          <select value={eventVagas} onChange={(e) => setEventVagas(e.target.value)}>
            {/* Dropdown para escolher quantas vagas o evento terá */}
            
            <option value="10">10 vagas</option>
            <option value="30">30 vagas</option>
            <option value="50">50 vagas</option>
            {/* Opções de quantidades de vagas */}
          </select>
          
          <button type="submit">Agendar</button>
          {/* Botão que envia o formulário e chama addEvent */}
        </form>
      </section>

      {/* ===== BARRA DE PESQUISA (FEATURE 2) ===== */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Pesquisar por título do evento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* Campo de entrada para buscar eventos por título */}
        {/* Atualiza o estado searchTerm conforme o usuário digita */}
      </section>

      {/* ===== BOTÕES DE FILTRO ===== */}
      <section className="filter-section">
        {["Todos", "Agendados", "Em Andamento", "Encerrados"].map(f => (
          // map() cria um botão para cada filtro disponível
          
          <button
            key={f}
            className={filter === f ? "active" : ""}
            // Se o filtro atual é igual a f, adiciona a classe "active" (ativa o botão)
            
            onClick={() => setFilter(f)}
            // Quando clicado, atualiza o filtro para este valor
          >
            {f}
            {/* Texto do botão é o nome do filtro */}
          </button>
        ))}
      </section>

      {/* ===== GRADE DE EVENTOS ===== */}
      <main className="event-grid">
        {filteredEvents.map(item => (
          // map() itera sobre cada evento filtrado e cria um card para cada um
          
          <div
            key={item.id}
            className={`event-card ${item.type.toLowerCase()} 
${item.status.toLowerCase().replace(" ", "-")}`}
            // key={item.id}: identificador único para React (melhora performance)
            // className: adiciona classes CSS baseadas no tipo e status do evento
            // toLowerCase(): converte para minúsculas para as classes CSS
            // replace(" ", "-"): converte "Em Andamento" em "em-andamento" (valid CSS class)
          >
            {/* ===== CONTEÚDO DO CARD ===== */}
            <div className="event-content">
              <h3>{item.title}</h3>
              {/* Título do evento */}
              
              <span className="event-tag">Tipo: {item.type}</span>
              {/* Mostra o tipo do evento (Palestra, Workshop, Painel) */}
              
              <span className="status-badge">Status: {item.status}</span>
              {/* Mostra o status atual do evento (Agendado, Em Andamento, Encerrado) */}
              
              {/* FEATURE 3: Mostrar vagas disponíveis */}
              <span className="vagas-badge">Vagas: {item.vagas}</span>
              {/* Exibe quantas vagas ainda estão disponíveis no evento */}
              
              <small>Registrado em: {item.date}</small>
              {/* Mostra a data em que o evento foi criado */}
            </div>

            {/* ===== BOTÕES DE AÇÃO DO CARD ===== */}
            <div className="event-actions">
              {/* Botão para alterar status */}
              <button onClick={() => toggleStatus(item.id)} className="status-btn">
                {item.status === "Agendado" ? "Iniciar" : 
                item.status === "Em Andamento" ? "Encerrar" : "Reiniciar"}
              </button>
              {/* Mostra texto diferente dependendo do status atual:
                  - "Iniciar" se está Agendado
                  - "Encerrar" se está Em Andamento
                  - "Reiniciar" se está Encerrado */}
              
              {/* FEATURE 3: Botão para inscrever aluno */}
              {/* disabled={item.vagas === 0}: desabilita o botão se não há vagas */}
              <button 
                onClick={() => inscreverAluno(item.id)} 
                className={`inscricao-btn ${item.vagas === 0 ? 'desabilitado' : ''}`}
                disabled={item.vagas === 0}
              >
                {item.vagas === 0 ? "Esgotado" : "Inscrever"}
                {/* Mostra "Inscrever" se há vagas, ou "Esgotado" se não há */}
              </button>
              
              {/* Botão para remover evento */}
              <button onClick={() => deleteEvent(item.id)} className="delete">
                Remover
              </button>
              {/* Quando clicado, remove este evento da lista */}
            </div>
          </div>
        ))}
      </main>

      {/* ===== BOTÃO FLUTUANTE (FEATURE 5) ===== */}
      <button 
        className="floating-btn" 
        onClick={() => setShowModal(true)} 
        title="Ver alterações"
      >
        {/* Botão fixo no canto inferior direito */}
        {/* Quando clicado, abre o modal com informações */}
        {/* title: mostra uma dica ao passar o mouse */}
        
        <img 
          src={faviconBotao} 
          alt="Engrenagem" 
          className="floating-icon-img"
        />
        {/* Imagem da engrenagem dentro do botão */}
      </button>

      {/* ===== MODAL COM ALTERAÇÕES (FEATURE 5) ===== */}
      {showModal && (
        // Renderiza o modal apenas se showModal for true
        
        <div 
          className="modal-overlay" 
          onClick={() => setShowModal(false)}
        >
          {/* Fundo escuro do modal */}
          {/* Quando clicado, fecha o modal */}
          
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conteúdo do modal */}
            {/* e.stopPropagation(): impede que clicar aqui feche o modal */}
            
            <button 
              className="modal-close" 
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            {/* Botão X para fechar o modal */}
            
            <h2>Alterações Realizadas no CSS</h2>
            {/* Título do modal */}
            
            <h3>Alterações CSS:</h3>
            {/* Subtítulo da lista */}
            
            <ul>
              {/* Lista de alterações realizadas */}
              
              <li>
                <strong>1. Header com degradê:</strong> Adicionado gradiente visual 
                no cabeçalho para destaque marcante com cores azul a roxo.
                {/* Descreve a primeira alteração CSS */}
              </li>
              
              <li>
                <strong>2. Cards com shadow aumentada:</strong> Box-shadow mais 
                pronunciada nos event-cards para profundidade e modernidade.
                {/* Descreve a segunda alteração CSS */}
              </li>
              
              <li>
                <strong>3. Animação no hover:</strong> Cards fazem uma transição 
                suave com transform e elevação ao passar o mouse.
                {/* Descreve a terceira alteração CSS */}
              </li>
              
              <li>
                <strong>Bônus - Botão flutuante:</strong> Botão redondo fixo no 
                canto inferior direito com ícone de engrenagem.
                {/* Descreve o bônus - o botão flutuante */}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
// Exporta o componente App para ser usado em outros arquivos