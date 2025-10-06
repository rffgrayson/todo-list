import "./styles.css";


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

    removeTodo (todo) {
        this.list.remove(todo);
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

const fileBtn = document.querySelector("#file-btn");

fileBtn.addEventListener("click", ()=> {

});
    
function addTodoLibrary (todo) {
    console.log(todo);
    const newDiv = document.createElement("div");
    newDiv.classList.toggle(`todo`);
    newDiv.id = `${todo.id}`;
    newDiv.innerHTML += `
    <div class="todo-item" data-priority="high">
      <div class="item-section">
        <span class="todo-title">${todo.title}</span>
        <span class="todo-description">${todo.description}</span>
        <span class="todo-date">Due:${todo.due}</span>
      </div>
      <button class="delete-btn">x
        </button>  
    </div>
    `

    const todoSection = document.querySelector(".todo-list");
    todoSection.appendChild(newDiv);
}

addTodoLibrary(todo1);

