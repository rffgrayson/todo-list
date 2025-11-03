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
        this.list = [];
    }

    addTodo (todo) {
        this.list.push(todo);
    }

    removeTodo (todo) {
        this.list.remove(todo);
    }
}

export { Todo, Folder };