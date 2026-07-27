
import { atualizarTarefaExistente, buscarTarefaPorId, criarNovaTarefa, listarTodasTarefas, deletarTarefaExistente } from "../services/task.service";
import type { Request, Response } from "express";

// Listar todas as tarefas
export function listarTarefasController(req: Request, res: Response): void {
    const tarefas = listarTodasTarefas();
    res.status(200).json(tarefas);
}

// Criar uma nova tarefa
export function criarTarefaController(req: Request, res: Response): void {
    try {
        const novaTarefa = criarNovaTarefa(req.body); // req.body já vem pronto do express.json()
        res.status(201).json(novaTarefa);
    } catch (error) {
        const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido";
        res.status(400).json({ message: mensagemErro });
    }
}

// Buscar tarefa por id
export function buscarTarefaPorIdController(req: Request, res: Response, id: number): void {
    try {
        const tarefa = buscarTarefaPorId(id);
        if (tarefa) {
            res.status(200).json(tarefa);
        } else {
            res.status(404).json({ message: "Tarefa não encontrada" });
        }
    } catch (error) {
        const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido";
        res.status(400).json({ message: mensagemErro });
    }
}

// Atualizar uma tarefa existente
export function atualizarTarefaController(req: Request, res: Response, id: number): void {
    try {
        const tarefa = atualizarTarefaExistente(id, req.body);
        if (!tarefa) {
            res.status(404).json({ message: "Tarefa não encontrada" });
            return;
        }
        res.status(200).json(tarefa);
    } catch (error) {
        const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido";
        res.status(400).json({ message: mensagemErro });
    }
}

// Deletar tarefa existente
export function deletarTarefaController(req: Request, res: Response, id: number): void {
    try {
        const sucesso = deletarTarefaExistente(id);
        if (sucesso) {
            res.status(204).end(); // No Content
        } else {
            res.status(404).json({ message: "Tarefa não encontrada" });
        }
    } catch (error) {
        const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido";
        res.status(400).json({ message: mensagemErro });
    }
}





