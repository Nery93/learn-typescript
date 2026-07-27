// Service aqui vai conter a logica de negocio, ou seja, a logica que vai manipular os dados 
// do banco de dados e retornar para o controller

import type { Tarefa } from "../types/task.types";
import { listarTarefas, criarTarefa, buscarPorId, atualizarTarefa, deletarTarefa } from "../repositories/task.repository";

//Listar todas as tarefas
export function listarTodasTarefas(): Tarefa[] {

    // validações de negocio podem ser feitas aqui, por exemplo, se o usuario tem permissão para listar as tarefas

    return listarTarefas();
}

// função privada para validar o id da tarefa antes de buscar, atualizar ou deletar
function validarId(id: number): void {
    if (id <= 0) {
        throw new Error("O id da tarefa deve ser um número positivo.");
    }
    if (!Number.isInteger(id)) {
        throw new Error("O id da tarefa deve ser um número inteiro.");
    }
}

// função privada para validar os dados da tarefa antes de criar ou atualizar
function validarDadosTarefa(tarefa: Tarefa): void {
    if (!tarefa.titulo || tarefa.titulo.trim() === "") {
        throw new Error("O título da tarefa é obrigatório.");
    }
    if (tarefa.titulo.length > 100) {
        throw new Error("O título da tarefa não pode ter mais de 100 caracteres.");
    }
    if (!tarefa.status || !["concluida", "em andamento", "em pausa"].includes(tarefa.status)) {
        throw new Error("O status da tarefa é inválido.");
    }
    if (tarefa.descricao && tarefa.descricao.length > 500) {
        throw new Error("A descrição da tarefa não pode ter mais de 500 caracteres.");
    }
}

//Criar uma nova tarefa
export function criarNovaTarefa(tarefa: Tarefa): Tarefa {

    // validações de negocio podem ser feitas aqui, por exemplo, se o usuario tem permissão para criar uma tarefa
    if(tarefa.id !== undefined) {
        throw new Error("Não é permitido criar uma tarefa com id definido.");
    }
    validarDadosTarefa(tarefa);

    return criarTarefa(tarefa);
}

// Buscar tarefa por id
export function buscarTarefaPorId(id: number): Tarefa | undefined {
    // validações de negocio podem ser feitas aqui, por exemplo, 
    // se o usuario tem permissão para buscar a tarefa
    validarId(id);
    return buscarPorId(id);
}

// Atualizar uma tarefa existente
export function atualizarTarefaExistente(id: number, tarefaAtualizada: Tarefa): Tarefa | undefined {
    // validações de negocio podem ser feitas aqui, por exemplo, 
    // se o usuario tem permissão para atualizar a tarefa
    validarId(id);
    validarDadosTarefa(tarefaAtualizada);
    return atualizarTarefa(id, tarefaAtualizada);
}

// Deletar uma tarefa
export function deletarTarefaExistente(id: number): boolean {
    // validações de negocio podem ser feitas aqui, por exemplo, 
    // se o usuario tem permissão para deletar a tarefa

    validarId(id);
    if (!buscarPorId(id)) {
        throw new Error("A tarefa com o id fornecido não existe.");
    }
    return deletarTarefa(id);
}