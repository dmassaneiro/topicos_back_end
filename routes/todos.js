var express = require("express");

var todos = express.Router();

var todoIndex = 6;
var todosList = [
    {
        "title": "Tarefas de teste",
        "description": "Descrição da tarefa",
        "id": 0,
        "completed": false
    },
    {
        "title": "Tarefas de teste",
        "description": "Descrição da tarefa",
        "id": 1,
        "completed": false
    },
    {
        "title": "Tarefas de teste",
        "description": "Descrição da tarefa",
        "id": 2,
        "completed": false
    },
    {
        "title": "Tarefas de teste",
        "description": "Descrição da tarefa",
        "id": 3,
        "completed": false
    },
    {
        "title": "Tarefas de teste",
        "description": "Descrição da tarefa",
        "id": 4,
        "completed": false
    },
    {
        "title": "Tarefas de teste",
        "description": "Descrição da tarefa",
        "id": 5,
        "completed": false
    }
];

todos.get('/', function (req, res, next) {
    console.log("Recebemos uma requisição GET");

    res.status(200).json(todosList);
});

todos.get('/:todoId', function (req, res, next) {
    console.log("Recebemos uma requisição POST");

    var todo = findTodoById(req.params.todoId);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(200).json(todosFiltered[0]);
    }
});

todos.post('/', function (req, res, next) {
    console.log("Recebemos uma requisição POST");
    console.log("Titulo: " + req.body.title);
    console.log("Descrição: " + req.body.description);

    // recebe os dados da Todo
    var todo = req.body;
    todo.id = todoIndex++;
    todo.completed = false;

    // insere a Todo no "banco de dados".
    todosList.push(todo);

    res.status(201).send();
});

todos.put('/:todoId', function (req, res, next) {

    var todo = findTodoById(req.params.todoId);

    if (todo) {
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.completed = req.body.completed;

        res.status(200).json(todo);
    } else {
        res.status(404).send();
    }
});

todos.delete('/:todoId', function (req, res, next) {
    //busca o indice da todo no banco de dados
    var index = todosList.findIndex(function (todo, index) {
        return todo.id === parseInt(req.params.todoId);
    });
    if (index >= 0) {
        //remove a todo do banco
        todosList.splice(index, 1);

        res.status(200).send();
    } else {
        res.status(404).send();
    }

});

function findTodoById(todoId) {
    var todosFiltered =
        todosList.filter(function (todo, index) {
            return todo.id === parseInt(todoId);
        });
    if (todosFiltered.length > 0)
        return todosFiltered[0];
    return null;
}

module.exports = todos;