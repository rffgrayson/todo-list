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

        this.todoForm.onSubmit((data) =>{
            if (this.todoForm.editingTodoId) {
                 const todo = this.todos.find(t => t.id === this.todoForm.editingTodoId);
                    if (todo) {
                        todo.title = data.title;
                        todo.description = data.description;
                        todo.due = data.due;
                        todo.priority = data.priority;
                        if (todo.folderId !== data.folderId) {
                                const oldFolder = this.folders.find(f => f.id === todo.folderId);
                                if (oldFolder) 
                                    oldFolder.removeTodo(todo.id);
                                const todoDiv = document.getElementById(todo.id);
                                    todoDiv.classList.add('hidden');
                                const newFolder = this.folders.find(f => f.id === data.folderId);
                                    if (newFolder) {
                                        todo.folderId = data.folderId;
                                        newFolder.addTodo(todo);
                                    }
                                }
                const folder = this.folders.find(f => f.id === todo.folderId);
                this.ui.overwriteTodo(todo, folder);
            }        
            } else {this.handleTodoSubmit(data)}
            this.todoForm.editingTodoId = null;
        });


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
            const todoDiv = button.closest(".todo");
            if (!todoDiv) return;
            const todoId = todoDiv.id;
            
        if (button.classList.contains("delete-btn")){
            this.deleteTodo(todoId);
        } else if (button.classList.contains("checkmark-btn")) {
            this.changeStatus(todoId);
        } 
        else {
            this.updateTodo(todoId);
        }

        })
        document.querySelector('#save-btn').addEventListener('click', () => {
            if (this.saveToStorage()) {
                alert('💾 Data saved successfully!');
            }
        })
        document.querySelector('#load-btn').addEventListener('click', () => {
            if (this.loadFromStorage()) {
                alert('💾 Data loaded successfully!');
            }
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

    deleteTodo (todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        this.folders.forEach(folder => folder.removeTodo(todoId));
        this.ui.removeTodo(todoId);
    }

    changeStatus (todoId) {
        this.todos.forEach(todo => todo.changeStatus(todoId));
        this.ui.toggleStatus(todoId);
    }

    updateTodo (todoId) {
        const todo = this.todos.find(t => t.id === todoId);
        this.todoForm.show();
        this.todoForm.populateForEdit(todo);
    }

    saveToStorage () {
        try {
                const data = {
                    folders:this.folders.map(folder => ({
                        id: folder.id,
                        title: folder.title,
                        todo: folder.todos.map(t => t.id)
                        })),
                    todos:this.todos.map(todo => ({
                        id: todo.id,
                        title: todo.title,
                        description: todo.description,
                        due: todo.due,
                        priority: todo.priority,
                        folderId: todo.folderId,
                        status: todo.status
                    }))
                };

                localStorage.setItem('todoAppData', JSON.stringify(data));
                return true; 
            }
                catch (error) {
                    alert("failed to save data. Your browser might have localStorage disable");
                    return false;
            }
    }

    loadFromStorage () {
        try {
            const savedData = localStorage.getItem("todoAppData");
            if (!savedData) {
                alert ("no saved data found");
            }

            const data = JSON.parse(savedData);

            this.folders = data.folders.map(folderData => Folder.fromJSON(folderData));

            this.todos = data.todos.map(todoData => Todo.fromJSON(todoData));

            this.folders.forEach(folder => {
                const folderTodos = this.todos.filter(todo => todo.folderId === folder.id);
                folder.todos = folderTodos;
            });

            this.folders.forEach(folder => {
                this.ui.renderFolder(folder);
            })
            this.todoForm.populateFolders(this.folders);

            this.todos.forEach(todo => {
                const folder = this.folders.find(folder => folder.id === todo.folderId);
                if (folder) {
                    this.ui.renderTodo(todo,folder);
                }
            })
            return true;
        }  catch (error) {
            alert("failed to load save data");
            return false;
        
        }
    }
}

const app = new TodoApp();

