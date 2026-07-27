import http from "http";
import { criarTarefaController, listarTarefasController, buscarTarefaPorIdController, atualizarTarefaController, deletarTarefaController } from "./controllers/task.controller";

const PORT: number = 3000;

const server = http.createServer((req, res) => {

    // Roteamento básico para as rotas de tarefas
    if (req.method === "GET" && req.url === "/tarefas") {
        listarTarefasController(req, res);
        return;
    }

    // Roteamento para criar uma nova tarefa
    if (req.method === "POST" && req.url === "/tarefas") {
        criarTarefaController(req, res);
        return;
    }

    // Roteamento para buscar uma tarefa por id
    if (req.method === "GET" && req.url?.startsWith("/tarefas/")) {
        const id = parseInt(req.url.split("/")[2], 10);
        buscarTarefaPorIdController(req, res, id);
        return;
    }

    // Roteamento para atualizar uma tarefa existente
    if (req.method === "PUT" && req.url?.startsWith("/tarefas/")) {
        const id = parseInt(req.url.split("/")[2], 10);
        atualizarTarefaController(req, res, id);
        return;
    }

    // Roteamento para deletar uma tarefa existente
    if (req.method === "DELETE" && req.url?.startsWith("/tarefas/")) {
        const id = parseInt(req.url.split("/")[2], 10);
        deletarTarefaController(req, res, id);
        return;
    }


    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Not Found' }));
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});