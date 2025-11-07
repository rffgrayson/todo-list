import "./styles.css";
import { Todo, Folder } from './classes.js';
import { UImanager } from './ui.js';

class TodoApp { 
    constructor () {
        this.folders = [];
        this.todos = [];
        this.ui = new UImanager();
        this.currentFolder = null;
        this.initializeEventListeners();
        this.loadSampleData();
    }
    
    loadSampleData() {
    const workFolder = new Folder("Work");
    const learningFolder = new Folder("Learning");
    const projectsFolder = new Folder("Projects");
    const fitnessFolder = new Folder("Fitness");
    const personalFolder = new Folder("Personal");
    const planningFolder = new Folder("Planning");

    this.folders.push(workFolder, learningFolder, projectsFolder, fitnessFolder, personalFolder, planningFolder);

    [workFolder, learningFolder, projectsFolder, fitnessFolder, personalFolder, planningFolder].forEach(folder => {
        this.ui.renderFolder(folder);
        this.ui.addFolderSelection(folder);
    });

    const todos = [
        // === Work ===
        new Todo("Fix login bug", "The login button fails on mobile", "2025-11-09", "high", workFolder.id),
        new Todo("Code review", "Check naming conventions in ABAP", "2025-11-10", "medium", workFolder.id),
        new Todo("Test RAP svc", "Verify OData exposure", "2025-11-12", "medium", workFolder.id),
        new Todo("Doc ABAP cls", "Add string & math examples", "2025-11-13", "low", workFolder.id),
        new Todo("Team meeting", "Discuss open SAP tickets", "2025-11-08", "low", workFolder.id),

        // === Learning ===
        new Todo("TOP JS DOM", "Finish DOM manipulation sec", "2025-11-11", "high", learningFolder.id),
        new Todo("FSO React part", "Do server comm exercises", "2025-11-15", "medium", learningFolder.id),
        new Todo("HOML Ch2", "Review end-to-end ML proj", "2025-11-16", "medium", learningFolder.id),
        new Todo("Learn LangChain", "Try small OpenAI chain", "2025-11-20", "low", learningFolder.id),
        new Todo("arXiv summary", "Summarize 1 AI paper", "2025-11-09", "low", learningFolder.id),

        // === Projects ===
        new Todo("Portfolio site", "Add portfolio + layout", "2025-11-12", "medium", projectsFolder.id),
        new Todo("theGrayson.studio", "Build contact API", "2025-11-14", "high", projectsFolder.id),
        new Todo("Try-On MVP", "User upload + shadcn UI", "2025-11-17", "high", projectsFolder.id),
        new Todo("Estate API", "Mock listing backend", "2025-11-19", "medium", projectsFolder.id),
        new Todo("CI/CD setup", "Add GitHub Actions", "2025-11-10", "medium", projectsFolder.id),

        // === Fitness ===
        new Todo("Upper day", "Bench + row + curls", "2025-11-07", "medium", fitnessFolder.id),
        new Todo("Lower heavy", "Deadlift + squat prog", "2025-11-08", "high", fitnessFolder.id),
        new Todo("Push day", "Press + triceps iso", "2025-11-10", "medium", fitnessFolder.id),
        new Todo("Pull day", "Face pull + curls", "2025-11-12", "medium", fitnessFolder.id),
        new Todo("Legs hyper", "Front squat focus", "2025-11-14", "medium", fitnessFolder.id),

        // === Personal ===
        new Todo("Buy groceries", "Eggs, oats, coffee", "2025-11-07", "low", personalFolder.id),
        new Todo("Call family", "Weekly call to parents", "2025-11-09", "low", personalFolder.id),
        new Todo("Clean desk", "Organize cables + setup", "2025-11-08", "low", personalFolder.id),
        new Todo("Read book", "The First 20 Hours", "2025-11-13", "low", personalFolder.id),
        new Todo("German practice", "Duolingo + video", "2025-11-10", "medium", personalFolder.id),

        // === Planning ===
        new Todo("Review goals", "Check 2025 progress", "2025-11-20", "high", planningFolder.id),
        new Todo("YouTube plan", "Outline first devlog", "2025-11-18", "medium", planningFolder.id),
        new Todo("AWS prep", "Revise EC2, S3, IAM", "2025-11-15", "medium", planningFolder.id),
        new Todo("F&B plan", "Finalize costing", "2025-11-22", "low", planningFolder.id),
        new Todo("Monthly review", "List wins + lessons", "2025-11-30", "low", planningFolder.id)
    ];

    todos.forEach(todo => {
        this.todos.push(todo);
        const folder = this.folders.find(f => f.id === todo.folderId);
        folder.addTodo(todo);
        this.ui.renderTodo(todo);
    });

    this.ui.showTodosInFolder(this.folders[0].id);
    }
    
    initializeEventListeners() {
        document.querySelector('#file-btn').addEventListener('click', () => {
            this.ui.toggleForm('todo');
        });
        document.querySelector('#folder-btn').addEventListener('click', () => {     
            this.ui.toggleForm('folder');
        });
        document.querySelector('.overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.ui.hideAllForms();
            }
        });

        document.querySelector('#todo-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.TodoSubmitHandler();
            this.ui.clearInput();
        })

        document.querySelector('#folder-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.FolderSubmitHandler();
            this.ui.clearInput();
        })
        document.querySelector('.folder-section').addEventListener('click', (e) => {
            const folderDiv = e.target.closest('.folder');
            if (folderDiv) {
                const folderId = folderDiv.dataset.folderId;
                this.currentFolder = this.folders.find(folder => folder.id === folderId);
                this.ui.showTodosInFolder(folderId);
            }
        })
    }

    TodoSubmitHandler() {
        const todoData = this.ui.retrieveTodoForm();
        console.log(todoData.folderId);
        const newTodo = new Todo(todoData.title, todoData.description, todoData.due, todoData.priority, todoData.folderId);
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
        this.ui.addFolderSelection(newFolder);
        this.ui.hideAllForms();
    }

}

const app = new TodoApp();

