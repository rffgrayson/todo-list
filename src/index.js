class Todo {
    constructor(title, description, due) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.status = false;
    }

    changeStatus () {
      this.status = !this.status;
      return this.status;
    }
}


const todo1 = new Todo("Study", "Finish Odin Project assignment", "2025-10-10");
console.log(todo1);
todo1.changeStatus();
console.log(todo1);
console.log("todo1.status:", todo1.status);


class Folder {
    constructor(category) {
        this.category = category;
        this.list = [];
    }

    addTodo (todo) {
        this.list.push(todo);
    }
}


const file1 = new Folder("test");
console.log(file1);
file1.addTodo(todo1);
console.log(file1);
console.log("todo1.status:", todo1.status);
console.log("folder todo status:", file1.list[0].status);

todo1.changeStatus();
console.log(todo1);
console.log(file1);
console.log("todo1.status:", todo1.status);
console.log("folder todo status:", file1.list[0].status);
