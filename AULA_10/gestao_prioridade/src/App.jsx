// Importa o React e dois hooks importantes:
// useState -> para criar e controlar estados
// useEffect -> para executar efeitos colaterais, como salvar e carregar dados
import React, { useState, useEffect } from 'react';

// Importa o arquivo de estilos da aplicação
import './App.css';

// Cria o componente principal da aplicação
function App() {
  // Estado que guarda o texto digitado no input de nova tarefa
  const [taskText, setTaskText] = useState("");

  // Estado que guarda a prioridade selecionada no select
  // Começa com "Baixa" como valor padrão
  const [priority, setPriority] = useState("Baixa");

  // Estado que guarda a lista completa de tarefas
  // Cada item dessa lista será um objeto com várias propriedades
  const [taskList, setTaskList] = useState([]);

  // Estado que controla o filtro atual da tela:
  // "Todas", "Pendentes" ou "Concluídas"
  const [filter, setFilter] = useState("Todas");

  // Estado que guarda o texto digitado no campo de busca
  const [search, setSearch] = useState("");

  // Estado que guarda o id da tarefa que está sendo editada
  // null significa que nenhuma tarefa está em edição
  const [editingId, setEditingId] = useState(null);

  // Estado que guarda temporariamente o novo texto durante a edição
  const [editingText, setEditingText] = useState("");

  // useEffect que roda apenas UMA vez quando o componente é carregado
  // Isso acontece porque o array de dependências está vazio []
  useEffect(() => {
    // Tenta buscar no localStorage os dados salvos anteriormente
    const saved = localStorage.getItem("@taskflow_data");

    // Se encontrou algo salvo...
    if (saved) {
      // Converte a string JSON de volta para array/objeto JavaScript
      // e coloca o resultado dentro de taskList
      setTaskList(JSON.parse(saved));
    }
  }, []);

  // useEffect que roda sempre que taskList for alterada
  // Serve para manter o localStorage sincronizado com a lista atual
  useEffect(() => {
    // Converte o array de tarefas em texto JSON
    // e salva no localStorage com a chave "@taskflow_data"
    localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
  }, [taskList]);

  // Função chamada quando o formulário é enviado
  const addTask = (e) => {
    // Impede o comportamento padrão do form
    // Sem isso, a página poderia recarregar
    e.preventDefault();

    // Verifica se o texto está vazio ou só com espaços
    // trim() remove espaços do começo e do fim
    if (!taskText.trim()) return;

    // Cria um novo objeto representando a tarefa
    const newTask = {
      // Gera um identificador único para a tarefa
      id: crypto.randomUUID(),

      // Salva o texto digitado pelo usuário
      text: taskText,

      // Salva a prioridade selecionada
      priority: priority,

      // Toda tarefa nova começa como não concluída
      completed: false,

      // Guarda a data de criação no formato local do navegador
      createdAt: new Date().toLocaleDateString()
    };

    // Atualiza a lista colocando a nova tarefa no começo do array
    // ...taskList espalha as antigas tarefas depois da nova
    setTaskList([newTask, ...taskList]);

    // Limpa o input de texto depois de criar a tarefa
    setTaskText("");

    // Reseta a prioridade para "Baixa" após criar
    setPriority("Baixa");
  };

  // Função para marcar uma tarefa como concluída ou reabrir
  const toggleTask = (id) => {
    // Percorre toda a lista de tarefas com map
    setTaskList(
      taskList.map((t) =>
        // Se encontrar a tarefa com o mesmo id...
        t.id === id
          // ...cria uma cópia dela e inverte completed
          ? { ...t, completed: !t.completed }
          // Se não for a tarefa clicada, mantém igual
          : t
      )
    );
  };

  // Função para excluir uma tarefa
  const deleteTask = (id) => {
    // Exibe uma caixa de confirmação do navegador
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta tarefa?");

    // Se o usuário cancelar, a função para aqui
    if (!confirmDelete) return;

    // Mantém no array apenas as tarefas cujo id seja diferente
    // do id da tarefa que será removida
    setTaskList(taskList.filter((t) => t.id !== id));
  };

  // Função para iniciar a edição de uma tarefa
  const startEditing = (task) => {
    // Define qual tarefa entrou em modo de edição
    setEditingId(task.id);

    // Carrega o texto atual da tarefa dentro do input de edição
    setEditingText(task.text);
  };

  // Função para cancelar a edição
  const cancelEditing = () => {
    // Sai do modo de edição
    setEditingId(null);

    // Limpa o texto temporário de edição
    setEditingText("");
  };

  // Função para salvar a edição feita em uma tarefa
  const saveEdit = (id) => {
    // Impede salvar texto vazio ou só com espaços
    if (!editingText.trim()) return;

    // Atualiza a lista de tarefas
    setTaskList(
      taskList.map((t) =>
        // Se for a tarefa que está sendo editada...
        t.id === id
          // ...retorna uma cópia com o texto alterado
          ? { ...t, text: editingText }
          // Caso contrário, mantém a tarefa como está
          : t
      )
    );

    // Sai do modo edição após salvar
    setEditingId(null);

    // Limpa o campo temporário de edição
    setEditingText("");
  };

  // Cria uma lista filtrada baseada em duas coisas:
  // 1) no status da tarefa (Todas, Pendentes, Concluídas)
  // 2) no texto digitado na busca
  const filteredTasks = taskList.filter((t) => {
    // Verifica se o texto da tarefa contém o texto buscado
    // toLowerCase() deixa tudo minúsculo para evitar diferença
    // entre maiúsculas e minúsculas
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());

    // Se o filtro selecionado for "Pendentes"
    // mostra apenas tarefas não concluídas e que combinam com a busca
    if (filter === "Pendentes") return !t.completed && matchesSearch;

    // Se o filtro selecionado for "Concluídas"
    // mostra apenas tarefas concluídas e que combinam com a busca
    if (filter === "Concluídas") return t.completed && matchesSearch;

    // Se o filtro for "Todas", retorna apenas pelo critério da busca
    return matchesSearch;
  });

  // Cria uma nova lista ordenada por prioridade
  // Fazemos uma cópia com [...filteredTasks] para não alterar o array original
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Define um "peso" para cada prioridade
    // Quanto menor o número, mais no topo ela fica
    const order = {
      "Alta": 1,
      "Média": 2,
      "Baixa": 3
    };

    // Compara os pesos das prioridades
    // Alta vem antes de Média, que vem antes de Baixa
    return order[a.priority] - order[b.priority];
  });

  // Retorna o JSX da interface
  return (
    // Container principal da aplicação
    <div className="app-container">
      {/* Cabeçalho do app */}
      <header>
        {/* Título principal */}
        <h1>TaskFlow</h1>

        {/* Subtítulo */}
        <p>Gestão de Produtividade</p>
      </header>

      {/* Seção do formulário de criação de tarefas */}
      <section className="form-section">
        {/* Quando o formulário é enviado, chama addTask */}
        <form onSubmit={addTask}>
          {/* Input controlado do texto da tarefa */}
          <input
            // O valor exibido no input vem do estado taskText
            value={taskText}
            // Sempre que o usuário digita, o estado é atualizado
            onChange={(e) => setTaskText(e.target.value)}
            // Texto de ajuda dentro do input
            placeholder="Descrição da tarefa..."
          />

          {/* Select controlado para escolher a prioridade */}
          <select
            // Valor atual do select vem do estado priority
            value={priority}
            // Atualiza a prioridade ao mudar a seleção
            onChange={(e) => setPriority(e.target.value)}
          >
            {/* Opções disponíveis */}
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>

          {/* Botão de envio do formulário */}
          <button type="submit">Criar</button>
        </form>
      </section>

      {/* Seção da busca em tempo real */}
      <section className="search-section">
        <input
          // Tipo texto
          type="text"
          // Texto de ajuda
          placeholder="Buscar tarefa..."
          // Valor atual da busca
          value={search}
          // Atualiza o estado search conforme a pessoa digita
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Seção dos botões de filtro */}
      <section className="filter-section">
        {/* Cria os botões dinamicamente com map */}
        {["Todas", "Pendentes", "Concluídas"].map((f) => (
          <button
            // key ajuda o React a identificar cada botão da lista
            key={f}
            // Se o filtro atual for igual ao botão, aplica a classe "active"
            className={filter === f ? "active" : ""}
            // Ao clicar, troca o filtro
            onClick={() => setFilter(f)}
          >
            {/* Texto do botão */}
            {f}
          </button>
        ))}
      </section>

      {/* Área principal onde as tarefas são exibidas */}
      <main className="task-grid">
        {/* Se houver tarefas depois do filtro/ordenação, renderiza a lista */}
        {sortedTasks.length > 0 ? (
          sortedTasks.map((item) => (
            <div
              // key única para cada card
              key={item.id}
              // Monta classes dinâmicas:
              // task-card -> estilo base
              // item.priority.toLowerCase() -> baixa / média / alta
              // done -> se estiver concluída
              className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}
            >
              {/* Conteúdo principal da tarefa */}
              <div className="task-content">
                {/* Se esta tarefa estiver em edição, mostra input */}
                {editingId === item.id ? (
                  <>
                    <input
                      // Classe CSS específica do input de edição
                      className="edit-input"
                      // Valor atual do texto em edição
                      value={editingText}
                      // Atualiza o texto temporário conforme a pessoa digita
                      onChange={(e) => setEditingText(e.target.value)}
                    />

                    {/* Mostra a prioridade mesmo em modo edição */}
                    <span>Prioridade: {item.priority}</span>

                    {/* Mostra a data de criação */}
                    <small>Criada em: {item.createdAt}</small>
                  </>
                ) : (
                  <>
                    {/* Se não estiver em edição, mostra o texto normal */}
                    <h3>{item.text}</h3>

                    {/* Exibe a prioridade */}
                    <span>Prioridade: {item.priority}</span>

                    {/* Exibe a data de criação */}
                    <small>Criada em: {item.createdAt}</small>
                  </>
                )}
              </div>

              {/* Área dos botões de ação */}
              <div className="task-actions">
                {/* Se a tarefa está em edição, mostra botões de salvar/cancelar */}
                {editingId === item.id ? (
                  <>
                    {/* Salva a edição da tarefa atual */}
                    <button onClick={() => saveEdit(item.id)}>Salvar</button>

                    {/* Cancela a edição */}
                    <button onClick={cancelEditing}>Cancelar</button>
                  </>
                ) : (
                  <>
                    {/* Botão para concluir ou reabrir */}
                    <button onClick={() => toggleTask(item.id)}>
                      {/* Texto do botão muda conforme o status da tarefa */}
                      {item.completed ? "Reabrir" : "Concluir"}
                    </button>

                    {/* Botão para entrar em modo edição */}
                    <button onClick={() => startEditing(item)}>
                      Editar
                    </button>

                    {/* Botão para remover tarefa */}
                    <button
                      onClick={() => deleteTask(item.id)}
                      className="delete"
                    >
                      Remover
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          // Se não houver tarefas para mostrar, exibe mensagem
          <p className="empty-message">Nenhuma tarefa encontrada.</p>
        )}
      </main>
    </div>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default App;