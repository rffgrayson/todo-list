import "./styles.css";
import { Todo, Folder } from './classes.js';
import { TodoForm, FolderForm, UI } from './ui.js';

class TodoApp { 
    constructor () {
        this.folders = [];
        this.todos = [];
        this.ui = new UI();
        this.todoForm = new TodoForm();
        this.folderForm = new FolderForm();
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
    
        this.folders.forEach(folder => this.ui.renderFolder(folder));
        this.todoForm.populateFolders(this.folders);
    
        const todos = [
            // === Work ===
            new Todo("Fix login bug", "The login button fails on mobile", "2025-11-09", "high", workFolder.id),
            new Todo("Refactor ABAP class", "Clean up string handling in IF_OO_ADT_CLASSRUN", "2025-11-11", "medium", workFolder.id),
            new Todo("Write SAP report", "Generate employee summary ALV report", "2025-11-12", "high", workFolder.id),
            new Todo("Test RAP demo", "Test CRUD operations in RAP model", "2025-11-13", "medium", workFolder.id),
            new Todo("Debug Fiori app", "Fix data binding issue in UI5 XML view", "2025-11-15", "high", workFolder.id),
    
            // === Learning ===
            new Todo("Finish TOP DOM module", "Complete The Odin Project DOM manipulation section", "2025-11-10", "medium", learningFolder.id),
            new Todo("FSO part 2", "Finish React + server communication exercises", "2025-11-18", "high", learningFolder.id),
            new Todo("ABAP exception practice", "Write sample TRY…CATCH class example", "2025-11-09", "low", learningFolder.id),
            new Todo("AWS Cloud notes", "Summarize AWS Cloud Practitioner storage section", "2025-11-20", "medium", learningFolder.id),
            new Todo("German vocab", "Revise 20 new words + grammar cases", "2025-11-10", "low", learningFolder.id),
            new Todo("Read ML chapter", "Start chapter 3 of Hands-On Machine Learning", "2025-11-14", "medium", learningFolder.id),
    
            // === Projects ===
            new Todo("WebKaiser landing", "Finish hero section and CTA buttons", "2025-11-16", "high", projectsFolder.id),
            new Todo("TheGrayson portfolio", "Update agency site layout with shadcn/ui", "2025-11-22", "medium", projectsFolder.id),
            new Todo("AI try-on prototype", "Integrate face landmark detection", "2025-11-25", "high", projectsFolder.id),
            new Todo("Real estate app", "Build property filter system", "2025-11-28", "medium", projectsFolder.id),
            new Todo("n8n automation", "Automate project deployment pipeline", "2025-11-17", "low", projectsFolder.id),
    
            // === Fitness ===
            new Todo("Upper workout", "Bench + Cable Row + Incline Dumbbell Press", "2025-11-09", "high", fitnessFolder.id),
            new Todo("Leg day", "Deadlift + Hack Squat + Leg Curl + Calf Raise", "2025-11-10", "high", fitnessFolder.id),
            new Todo("Push day", "Bench + OHP + Triceps", "2025-11-12", "high", fitnessFolder.id),
            new Todo("Pull day", "Barbell Row + Pulldown + Curls", "2025-11-13", "high", fitnessFolder.id),
            new Todo("Track macros", "Stay near 1800 kcal, 150g protein", "2025-11-09", "medium", fitnessFolder.id),
            new Todo("10k steps", "Reach daily step goal", "2025-11-09", "low", fitnessFolder.id),
    
            // === Personal ===
            new Todo("Gift idea", "Find Naruto-themed gift for girlfriend", "2025-11-11", "medium", personalFolder.id),
            new Todo("Psoriasis care", "Buy skincare for her condition", "2025-11-13", "low", personalFolder.id),
            new Todo("Clean workspace", "Organize desk and cables", "2025-11-09", "low", personalFolder.id),
            new Todo("Call parents", "Check in and update weekly", "2025-11-10", "low", personalFolder.id),
            new Todo("Plan weekend", "Pick a cafe or park date", "2025-11-15", "medium", personalFolder.id),
    
            // === Planning ===
            new Todo("2025 goal review", "Check progress on SAP, WebDev, AI goals", "2025-11-20", "high", planningFolder.id),
            new Todo("Freelance prep", "Create Upwork/Fiverr profile drafts", "2025-11-25", "medium", planningFolder.id),
            new Todo("YouTube plan", "Outline dev journey video topics", "2025-11-23", "medium", planningFolder.id),
            new Todo("F&B notes", "Brainstorm small roadside stall menu", "2025-11-21", "low", planningFolder.id),
            new Todo("December roadmap", "Plan December learning + fitness targets", "2025-11-30", "high", planningFolder.id),
        ];
    
        todos.forEach(todo => {
            this.todos.push(todo);
            const folder = this.folders.find(f => f.id === todo.folderId);
            folder.addTodo(todo);
            this.ui.renderTodo(todo, folder);
        });
    
        this.ui.showTodosInFolder(this.folders[0].id);
    }
    
    
    initializeEventListeners() {
        document.querySelector('#file-btn').addEventListener('click', () => {
            this.todoForm.show();
        });
        document.querySelector('#folder-btn').addEventListener('click', () => {     
            this.folderForm.show();
        });
        document.querySelector('.overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.todoForm.hide();
                this.folderForm.hide();
            }
        });

        this.todoForm.onSubmit((data) => this.handleTodoSubmit(data));
        this.folderForm.onSubmit((data) => this.handleFolderSubmit(data));

        document.querySelector('.folder-section').addEventListener('click', (e) => {
            const folderDiv = e.target.closest('.folder');
            if (folderDiv) {
                const folderId = folderDiv.dataset.folderId;
                this.currentFolder = this.folders.find(folder => folder.id === folderId);
                this.ui.showTodosInFolder(folderId);
            }
        })
        document.querySelector('#show-all-todos-btn').addEventListener('click', ()=> {
            this.ui.showAllTodos();
        })
        document.querySelector('.todo-section').addEventListener('click',(e) => {
            const button = e.target.closest('button');
            if (!button) return;
            const todoDiv = e.target.closest(".todo");
            if (!todoDiv) return;

            
        })
    }

    handleTodoSubmit(data) {
        const folder = this.folders.find(f => f.id === data.folderId);
        
        if (!folder) {
            alert('Please select a folder');
            return;
        }

        const newTodo = new Todo(
            data.title, 
            data.description, 
            data.due, 
            data.priority, 
            data.folderId
        );
        
        this.todos.push(newTodo);
        folder.addTodo(newTodo);
        this.ui.renderTodo(newTodo, folder);
    }

   handleFolderSubmit(data) {
        const newFolder = new Folder(data.title);
        this.folders.push(newFolder);
        this.ui.renderFolder(newFolder);
        this.todoForm.populateFolders(this.folders);
    }

}

const app = new TodoApp();

