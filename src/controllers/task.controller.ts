
import { atualizarTarefaExistente, buscarTarefaPorId, criarNovaTarefa, listarTodasTarefas, deletarTarefaExistente } from "../services/task.service";
import type { NextFunction, Request, Response } from "express";

// Listar todas as tarefas
export function listarTarefasController(req: Request, res: Response): void {
    const tarefas = listarTodasTarefas();
    res.status(200).json(tarefas);
}

// Criar uma nova tarefa
export function criarTarefaController(req: Request, res: Response, next: NextFunction): void {
    try {
        const novaTarefa = criarNovaTarefa(req.body); // req.body já vem pronto do express.json()
        res.status(201).json(novaTarefa);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}

// Buscar tarefa por id
export function buscarTarefaPorIdController(req: Request, res: Response, id: number, next: NextFunction): void {
    try {
        const tarefa = buscarTarefaPorId(id);
        if (tarefa) {
            res.status(200).json(tarefa);
        } else {
            res.status(404).json({ message: "Tarefa não encontrada" });
        }
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}

// Atualizar uma tarefa existente
export function atualizarTarefaController(req: Request, res: Response, id: number, next: NextFunction): void {
    try {
        const tarefa = atualizarTarefaExistente(id, req.body);
        if (!tarefa) {
            res.status(404).json({ message: "Tarefa não encontrada" });
            return;
        }
        res.status(200).json(tarefa);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}

// Deletar tarefa existente
export function deletarTarefaController(req: Request, res: Response, id: number, next: NextFunction): void {
    try {
        const sucesso = deletarTarefaExistente(id);
        if (sucesso) {
            res.status(204).end(); // No Content
        } else {
            res.status(404).json({ message: "Tarefa não encontrada" });
        }
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}





