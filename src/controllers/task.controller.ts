
import { atualizarTarefaExistente, buscarTarefaPorId, criarNovaTarefa, listarTodasTarefas, deletarTarefaExistente } from "../services/task.service";
import type { IncomingMessage, ServerResponse } from "http";

// Listar todas as tarefas
export function listarTarefasController(req: IncomingMessage, res: ServerResponse): void {

    const tarefas = listarTodasTarefas();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(tarefas));
}

// Criar uma nova tarefa
export function criarTarefaController(req: IncomingMessage, res: ServerResponse): void {
    let body = '';

    req.on("data", (pedaco) => {
        body += pedaco;
    });

    req.on("end", () => {

        const tarefa = JSON.parse(body);
        try {
            const novaTarefa = criarNovaTarefa(tarefa);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(novaTarefa));
        } catch (error) {
            const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido";
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: mensagemErro }));
        }
    });
}

// Buscar tarefa por id
export function buscarTarefaPorIdController(req: IncomingMessage, res: ServerResponse, id: number): void {
    try {
        const tarefa = buscarTarefaPorId(id);
        if (tarefa) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(tarefa));
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
        }
    } catch (error) {
        const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido";
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: mensagemErro }));
    }
}

// Atualizar uma tarefa existente
export function atualizarTarefaController(req: IncomingMessage, res: ServerResponse, id: number): void {
    let body = '';

    req.on("data", (pedaco) => {
        body += pedaco;
    });

    req.on("end", () => {

        const tarefaAtualizada = JSON.parse(body);
        try {
            const tarefa = atualizarTarefaExistente(id, tarefaAtualizada);
            if (tarefa) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(tarefa));
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
            }
        } catch (error) {
            const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido";
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: mensagemErro }));
        }
    });
}

// Deletar tarefa existente
export function deletarTarefaController(req: IncomingMessage, res: ServerResponse, id: number): void {
    try {
        const sucesso = deletarTarefaExistente(id);
        if (sucesso) {
            res.statusCode = 204; // No Content
            res.end();
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
        }
    } catch (error) {
        const mensagemErro = error instanceof Error ? error.message : "Erro desconhecido";
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: mensagemErro }));
    }
}





