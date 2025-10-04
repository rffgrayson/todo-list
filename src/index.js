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