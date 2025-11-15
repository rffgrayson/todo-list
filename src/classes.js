class Todo {
    constructor(title, description, due, priority, folderId) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.folderId = folderId;
        this.id = crypto.randomUUID();
        this.status = false;
    }

    changeStatus (todoid) {
        if (todoid === this.id) {
            this.status = !this.status;
        }
    }

    static fromJSON(data) {
        const todo = new Todo(
            data.title,
            data.description,
            data.due,
            data.priority,
            data.folderId
        );
        todo.id = data.id;
        todo.status = data.status;
        return todo;
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
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    static fromJSON(data) {
        const folder = new Folder(data.title);
        folder.id = data.id;
        return folder;
    }
}

export { Todo, Folder };
