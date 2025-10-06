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
      <div class="button-section">
        <button class="checkmark-btn">
            <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>checkmark-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-100.000000, -1139.000000)" fill="#000000"> <path d="M122.027,1148.07 C121.548,1147.79 120.937,1147.96 120.661,1148.43 L114.266,1159.51 L110.688,1156.21 C110.31,1155.81 109.677,1155.79 109.274,1156.17 C108.871,1156.54 108.85,1157.18 109.228,1157.58 L113.8,1161.8 C114.177,1162.2 114.81,1162.22 115.213,1161.84 C115.335,1161.73 122.393,1149.43 122.393,1149.43 C122.669,1148.96 122.505,1148.34 122.027,1148.07 L122.027,1148.07 Z M116,1169 C108.268,1169 102,1162.73 102,1155 C102,1147.27 108.268,1141 116,1141 C123.732,1141 130,1147.27 130,1155 C130,1162.73 123.732,1169 116,1169 L116,1169 Z M116,1139 C107.164,1139 100,1146.16 100,1155 C100,1163.84 107.164,1171 116,1171 C124.836,1171 132,1163.84 132,1155 C132,1146.16 124.836,1139 116,1139 L116,1139 Z" id="checkmark-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
        </button>  
        <button class="delete-btn">
            <svg fill="#000000" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>trash-solid</title> <path class="clr-i-solid clr-i-solid-path-1" d="M6,9V31a2.93,2.93,0,0,0,2.86,3H27.09A2.93,2.93,0,0,0,30,31V9Zm9,20H13V14h2Zm8,0H21V14h2Z"></path><path class="clr-i-solid clr-i-solid-path-2" d="M30.73,5H23V4A2,2,0,0,0,21,2h-6.2A2,2,0,0,0,13,4V5H5A1,1,0,1,0,5,7H30.73a1,1,0,0,0,0-2Z"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
        </button>  
        <button class="add-btn">
            <svg viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus_circle [#1427]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -600.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M137.7,450 C137.7,450.552 137.2296,451 136.65,451 L134.55,451 L134.55,453 C134.55,453.552 134.0796,454 133.5,454 C132.9204,454 132.45,453.552 132.45,453 L132.45,451 L130.35,451 C129.7704,451 129.3,450.552 129.3,450 C129.3,449.448 129.7704,449 130.35,449 L132.45,449 L132.45,447 C132.45,446.448 132.9204,446 133.5,446 C134.0796,446 134.55,446.448 134.55,447 L134.55,449 L136.65,449 C137.2296,449 137.7,449.448 137.7,450 M133.5,458 C128.86845,458 125.1,454.411 125.1,450 C125.1,445.589 128.86845,442 133.5,442 C138.13155,442 141.9,445.589 141.9,450 C141.9,454.411 138.13155,458 133.5,458 M133.5,440 C127.70085,440 123,444.477 123,450 C123,455.523 127.70085,460 133.5,460 C139.29915,460 144,455.523 144,450 C144,444.477 139.29915,440 133.5,440" id="plus_circle-[#1427]"> </path> </g> </g> </g> </g></svg>
        </button>
        </div>
    </div>
    `

    const todoSection = document.querySelector(".todo-list");
    todoSection.appendChild(newDiv);
}

addTodoLibrary(todo1);

