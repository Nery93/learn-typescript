import { useState, useEffect } from "react";

interface Tarefa {
  id?: number;
  titulo: string;
  descricao?: string;
  status: "concluida" | "em andamento" | "em pausa";
}
function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarTarefas() {
      const response = await fetch("http://localhost:3000/tarefas");
      const dados = await response.json();
      setTarefas(dados);
      setCarregando(false);
    }
    carregarTarefas();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <ul>
          {carregando ? (
            <p>Carregando tarefas...</p>
          ) : tarefas.length === 0 ? (
            <p>Nenhuma tarefa encontrada.</p>
          ) : (
            tarefas.map((tarefa) => (
              <li key={tarefa.id}>
                <h2>{tarefa.titulo}</h2>
                <p>{tarefa.descricao}</p>
                <p>Status: {tarefa.status}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
