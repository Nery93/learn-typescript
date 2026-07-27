
import { criarTarefaController, listarTarefasController, buscarTarefaPorIdController, atualizarTarefaController, deletarTarefaController } from "./controllers/task.controller";
import express from "express";

const app = express(); // Inicializa o Express
app.use(express.json()); // Middleware para parsear JSON

const PORT: number = 3000;

app.get("/tarefas", (req, res) => {
    listarTarefasController(req, res);
});

app.post("/tarefas", (req, res) => {
    criarTarefaController(req, res);
});

app.get("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    buscarTarefaPorIdController(req, res, id); // A função já lida com a resposta, 
    // então não precisamos enviar outra resposta aqui
});

app.put("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    atualizarTarefaController(req, res, id);
    // A função já lida com a resposta, então não precisamos enviar outra resposta aqui
});

app.delete("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    deletarTarefaController(req, res, id);
    // A função já lida com a resposta, então não precisamos enviar outra resposta aqui
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

