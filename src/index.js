import "./styles.css";
import { Todo, Folder } from './classes.js';
import { UImanager } from './ui.js';

class TodoApp { 
    constructor () {
        this.folders = [];
        this.todos = [];
        this.ui = new UImanager();
        this.currentFolder = null;
        this.initializeDefaultFolder();
        this.initializeEventListeners();
    }

    initializeDefaultFolder() {
        const defaultFolder = new Folder("Default");
        this.folders.push(defaultFolder);
        this.currentFolder = defaultFolder;
        this.ui.renderFolder(defaultFolder);
    }
    
    initializeEventListeners() {
        document.querySelector('#file-btn').addEventListener('click', () => {
            this.ui.showForm('todo');
        });
        document.querySelector('#folder-btn').addEventListener('click', () => {     
            this.ui.showForm('folder');
        });
        document.querySelector('.overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.ui.hideAllForms();
            }
        });

        document.querySelector('#todo-form button[type="submit"]').addEventListener('click', (e) => {
            e.preventDefault();
            this.TodoSubmitHandler();
        })

        document.querySelector('#folder-form button[type="submit"]').addEventListener('click', (e) => {
            e.preventDefault();
            this.FolderSubmitHandler();
        })
    }

    TodoSubmitHandler() {
        const todoData = this.ui.retrieveTodoForm();
        const newTodo = new Todo(todoData.title, todoData.description, todoData.due);
        this.todos.push(newTodo);
        this.currentFolder.addTodo(newTodo);
        this.ui.renderTodo(newTodo);
        this.ui.hideAllForms();
    }

    FolderSubmitHandler() {
        const folderData = this.ui.retrieveFolderForm();
        const newFolder = new Folder(folderData.title);
        this.folders.push(newFolder);
        this.ui.renderFolder(newFolder);
        this.ui.hideAllForms();
    }

}

const app = new TodoApp();
