
import { criarTarefaController, listarTarefasController, buscarTarefaPorIdController, atualizarTarefaController, deletarTarefaController } from "./controllers/task.controller";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";

const app = express(); // Inicializa o Express
app.use(express.json()); // Middleware para parsear JSON

const PORT: number = 3000;

app.get("/tarefas", (req, res) => {
    listarTarefasController(req, res);
});

app.post("/tarefas", (req, res, next) => {
    criarTarefaController(req, res, next);
});

app.get("/tarefas/:id", (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    buscarTarefaPorIdController(req, res, id, next); // A função já lida com a resposta, 
    // então não precisamos enviar outra resposta aqui
});

app.put("/tarefas/:id", (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    atualizarTarefaController(req, res, id, next);
    // A função já lida com a resposta, então não precisamos enviar outra resposta aqui
});

app.delete("/tarefas/:id", (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    deletarTarefaController(req, res, id, next);
    // A função já lida com a resposta, então não precisamos enviar outra resposta aqui
});

app.use(errorHandler); // Middleware de tratamento de erros deve ser registrado após todas as rotas

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});


