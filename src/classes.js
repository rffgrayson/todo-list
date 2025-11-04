class Todo {
    constructor(title, description, due) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.status = false;
        this.id = "todo" + crypto.randomUUID();
    }

    changeStatus () {
      this.status = !this.status;
      return this.status;
    }
}

class Folder {
    constructor(title) {
        this.title = title;
        this.todos = [];
        this.id = "folder" + crypto.randomUUID();
    }

    addTodo (todo) {
        if (todo.folderId = this.id) {
            this.todos.push(todo);
        }
    }

    removeTodo (todoId) {
        this.todos.filter(todo => todo.id !== todoId);
    }

    clearInput () {
        document.querySelectorAll('input, textarea').forEach(input => input.value = '');
    }
}

export { Todo, Folder };
