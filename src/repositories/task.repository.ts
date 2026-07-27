//Salvar em Memoria por enquanto

import type { Tarefa } from "../types/task.types";

const tarefas: Tarefa[] = [];

//Listar todas as tarefas
export function listarTarefas(): Tarefa[] {
    return tarefas;
}

//Criar uma nova tarefa
export function criarTarefa(tarefa: Tarefa): Tarefa {
    //gerar id aleatório para a tarefa
    tarefa.id = Math.floor(Math.random() * 1000);
    tarefas.push(tarefa);
    return tarefa;
}

// Buscar tarefa por id
export function buscarPorId(id: number): Tarefa | undefined {
    return tarefas.find((tarefa) => tarefa.id === id);
}

// Atualizar uma tarefa existente
export function atualizarTarefa(id: number, tarefaAtualizada: Tarefa): Tarefa | undefined {
    const index = tarefas.findIndex((tarefa) => tarefa.id === id);
    if (index !== -1) {
        tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id: tarefas[index].id }; // Mantém o id original
        return tarefas[index];
    }
    return undefined;
}

// Deletar uma tarefa
export function deletarTarefa(id: number): boolean {
    const index = tarefas.findIndex((tarefa) => tarefa.id === id);
    if (index !== -1) {
        tarefas.splice(index, 1);
        return true;
    }
    return false;
}