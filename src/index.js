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
    
function addTodoLibrary (todo) {
    console.log(todo);
    const newDiv = document.createElement("div");
    newDiv.classList.toggle(`todo`);
    newDiv.id = `${todo.id}`;
    newDiv.innerHTML += `
    <div class="todo-item" data-priority="high">
      <div class="item-section">
        <div class="todo-header">
            <span class="todo-title">${todo.title}</span>
            <span class="todo-date">Due:${todo.due}</span>
        </div>
        <span class="todo-description">${todo.description}</span>
      </div>
      <div class="button-section">
        <button class="checkmark-btn">
          <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>checkmark-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-102.000000, -1141.000000)" fill="#000000"> <path d="M124.393,1151.43 C124.393,1151.43 117.335,1163.73 117.213,1163.84 C116.81,1164.22 116.177,1164.2 115.8,1163.8 L111.228,1159.58 C110.85,1159.18 110.871,1158.54 111.274,1158.17 C111.677,1157.79 112.31,1157.81 112.688,1158.21 L116.266,1161.51 L122.661,1150.43 C122.937,1149.96 123.548,1149.79 124.027,1150.07 C124.505,1150.34 124.669,1150.96 124.393,1151.43 L124.393,1151.43 Z M118,1141 C109.164,1141 102,1148.16 102,1157 C102,1165.84 109.164,1173 118,1173 C126.836,1173 134,1165.84 134,1157 C134,1148.16 126.836,1141 118,1141 L118,1141 Z" id="checkmark-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
        </button>  
        <button class="delete-btn">
            <svg fill="#000000" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>trash-solid</title> <path class="clr-i-solid clr-i-solid-path-1" d="M6,9V31a2.93,2.93,0,0,0,2.86,3H27.09A2.93,2.93,0,0,0,30,31V9Zm9,20H13V14h2Zm8,0H21V14h2Z"></path><path class="clr-i-solid clr-i-solid-path-2" d="M30.73,5H23V4A2,2,0,0,0,21,2h-6.2A2,2,0,0,0,13,4V5H5A1,1,0,1,0,5,7H30.73a1,1,0,0,0,0-2Z"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
        </button>  
        <button class="add-btn">
          <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-466.000000, -1089.000000)" fill="#000000"> <path d="M488,1106 L483,1106 L483,1111 C483,1111.55 482.553,1112 482,1112 C481.447,1112 481,1111.55 481,1111 L481,1106 L476,1106 C475.447,1106 475,1105.55 475,1105 C475,1104.45 475.447,1104 476,1104 L481,1104 L481,1099 C481,1098.45 481.447,1098 482,1098 C482.553,1098 483,1098.45 483,1099 L483,1104 L488,1104 C488.553,1104 489,1104.45 489,1105 C489,1105.55 488.553,1106 488,1106 L488,1106 Z M482,1089 C473.163,1089 466,1096.16 466,1105 C466,1113.84 473.163,1121 482,1121 C490.837,1121 498,1113.84 498,1105 C498,1096.16 490.837,1089 482,1089 L482,1089 Z" id="plus-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
        </button>
        </div>
    </div>
    `;

    const todoSection = document.querySelector(".todo-section");
    todoSection.appendChild(newDiv);
}

function addFolderToLibrary (folder) {
    console.log(folder);
    const newDiv = document.createElement("div");
    newDiv.classList.toggle("folder");
    newDiv.innerHTML += `
    <div class="folder-icon">
        <svg class="default-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M3 6.47214C3 6.16165 3.07229 5.85542 3.21115 5.57771L4 4H9L10 6H20C20.5523 6 21 6.44772 21 7V9V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V9V6.47214Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 20H20C20.5523 20 21 19.5523 21 19V11C21 9.89543 20.1046 9 19 9H5C3.89543 9 3 9.89543 3 11V19C3 19.5523 3.44772 20 4 20Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <svg class="hover-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M4 9V6.47214C4 6.16165 4.07229 5.85542 4.21115 5.57771L5 4H10L11 6H21C21.5523 6 22 6.44772 22 7V9V18C22 19.1046 21.1046 20 20 20H18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.2362 9H2.30925C1.64988 9 1.17099 9.62698 1.34449 10.2631L3.59806 18.5262C3.83537 19.3964 4.62569 20 5.52759 20H19.6908C20.3501 20 20.829 19.373 20.6555 18.7369L18.201 9.73688C18.0823 9.30182 17.6872 9 17.2362 9Z" stroke="#000000"></path> </g></svg>
    </div>    
    <div class="folder-title">
        ${folder.title}
    </div>
    `;

    const folderSection = document.querySelector(".folder-section");
    folderSection.appendChild(newDiv);
};

// --- Todos ---
const todo1 = new Todo("Buy groceries", "Milk, eggs, bread, and fruit", "2025-10-15");
addTodoLibrary(todo1);

const todo2 = new Todo("Finish project report", "Complete the financial analysis section", "2025-10-20");
addTodoLibrary(todo2);

const todo3 = new Todo("Workout session", "Leg day at the gym", "2025-10-17");
addTodoLibrary(todo3);

const todo4 = new Todo("Book dentist appointment", "Routine cleaning and check-up", "2025-10-22");
addTodoLibrary(todo4);

const todo5 = new Todo("Call mom", "Weekly catch-up call", "2025-10-16");
addTodoLibrary(todo5);

const todo6 = new Todo("Read a book", "Finish reading 'Atomic Habits'", "2025-10-25");
addTodoLibrary(todo6);

const todo7 = new Todo("Plan weekend trip", "Find spots to visit in Penang", "2025-10-18");
addTodoLibrary(todo7);

const folder1 = new Folder("Personal");
addFolderToLibrary(folder1);
const folder2 = new Folder("Work");
addFolderToLibrary(folder2);
const folder3 = new Folder("Health & Fitness");
addFolderToLibrary(folder3);


folder1.addTodo(todo1); 
folder1.addTodo(todo5); 
folder1.addTodo(todo7); 

folder2.addTodo(todo2);

folder3.addTodo(todo3); 
folder3.addTodo(todo4); 
folder3.addTodo(todo6); 

console.log(folder1);
console.log(folder2);
console.log(folder3);
