import "./styles.css";
import { Todo, Folder } from './classes.js';
import { UImanager } from './ui.js';

class TodoApp { 
    constructor () {
        this.folders = [];
        this.todos = [];
        this.ui = new UImanager();
    }

}


let currentForm = null; 

function hideAllForms() {
    const allForm = document.querySelectorAll('.form, .overlay')
    allForm.forEach(form => {
      form.classList.remove('active')
    });
}

function toggleForm(formId) {
    if (currentForm === formId) {
        hideAllForms();
        currentForm = null;
        return;
    }
    
    hideAllForms();
    
    const form = document.querySelector(`#${formId}-form`);
    const overlay = document.querySelector('.overlay');
    
    form.classList.add('active');
    overlay.classList.add('active');
    currentForm = formId;
}

const fileBtn = document.querySelector("#file-btn");
fileBtn.addEventListener("click", () => {
    toggleForm('todo');
});

const folderBtn = document.querySelector("#folder-btn");
folderBtn.addEventListener("click", () => {
    toggleForm('folder');
});

document.querySelector(".overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        hideAllForms();
        currentForm = null;
    }
});

document.querySelector("#todo-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#todo-form input[type='text']").value;
    const description = document.querySelector("#todo-form textarea").value;
    const date = document.querySelector("#todo-form input[type='date']").value;

    const newtodo = new Todo (title,description, date);

    document.querySelector("#todo-form").reset();
    addTodoLibrary(newtodo);
    hideAllForms();
    currentForm = null;
})


document.querySelector("#folder-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#folder-form input[type='text']").value;

    const newfolder = new Folder (title);

    document.querySelector("#folder-form").reset();
    addFolderToLibrary(newfolder);
    hideAllForms();
    currentForm = null;
})


