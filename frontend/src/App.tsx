import {useState, useEffect} from 'react'

interface Tarefa {
  id?: number
  titulo: string,
  descricao?: string,
  status: 'concluida' | 'em andamento' | 'em pausa'
}
function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])

  useEffect(() => {
    async function carregarTarefas() {
      const response = await fetch('http://localhost:3000/tarefas');
      const dados = await response.json();
      setTarefas(dados);
    }
    carregarTarefas();
  }, [])

  return (
    <div>
      <h1>Task Manager</h1>
    <div>
      
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <h2>{tarefa.titulo}</h2>
            <p>{tarefa.descricao}</p>
            <p>Status: {tarefa.status}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
  )


}

export default App