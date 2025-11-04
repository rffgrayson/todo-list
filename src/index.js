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
    }

}

const app = new TodoApp();

