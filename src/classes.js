class Todo {
    constructor(title, description, due, priority, folderId) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.folderId = folderId;
        this.id = "todo" + crypto.randomUUID();
    }
}

class Folder {
    constructor(title) {
        this.title = title;
        this.todos = [];
        this.id = "folder" + crypto.randomUUID();
    }

    addTodo (todo) {
        if (todo.folderId === this.id) {
            this.todos.push(todo);
        }
    }

    removeTodo (todoId) {
        this.todos.filter(todo => todo.id !== todoId);
    }
}

export { Todo, Folder };
