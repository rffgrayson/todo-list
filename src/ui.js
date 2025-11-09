class Form {
    constructor(formId) {
        this.form = document.querySelector(`#${formId}`);
        this.overlay = document.querySelector('.overlay');
    }

    show() {
        this.hideAllForms();
        this.form.classList.add('active');
        this.overlay.classList.add('active');
    }

    hide() {
        this.form.classList.remove('active');
        this.overlay.classList.remove('active');
    }

    hideAllForms() {
        const allForm = document.querySelectorAll('.form, .overlay')
        allForm.forEach(form => {
            form.classList.remove('active')
            });
    }

    reset() {
        this.form.reset();
    }

    onSubmit(callback) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.form.checkValidity()) {
                callback(this.getData());
                this.reset();
                this.hide();
            }
        });
    }
}
class TodoForm extends Form {
    constructor() {
        super('todo-form');
    }

    getData() {
        return {
            title: this.form.querySelector("input[name='title']").value,
            description: this.form.querySelector("textarea[name='description']").value,
            due: this.form.querySelector("input[name='due']").value,
            priority: this.form.querySelector("input[name='priority']:checked")?.value,
            folderId: this.form.querySelector("select[name='project']").value,
        };
    }

    populateFolders(folders) {
        const select = this.form.querySelector('select');
        select.innerHTML = '<option value="">Choose...</option>';
        folders.forEach(folder => {
            select.innerHTML += `<option value="${folder.id}">${folder.title}</option>`;
        });
    }

}

class FolderForm extends Form {
    constructor() {
        super('folder-form');
    }

    getData() {
        return {
            title: this.form.querySelector("input[name='title']").value,
        };
    }
}

class UI {
    constructor() {
        this.todoSection = document.querySelector('.todo-section');
        this.folderSection = document.querySelector('.folder-section');
    }

    renderTodo (todo, folder) {
        const div = document.createElement("div");
        div.classList.toggle(`todo`);
        div.id = todo.id;
        div.dataset.folderId = todo.folderId;
        
        div.innerHTML += `
        <div class="todo-item" data-priority="${todo.priority}">
          <div class="item-section">
            <div class="todo-header">
                <span class="todo-title">${todo.title}</span>
            </div>
            <span class="todo-description">${todo.description}</span>
            <div class="todo-footer">
                <div class="todo-footer-title">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <span>${folder.title}</span>
                </div>
                <div class="todo-footer-due">
                    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,14a1,1,0,1,0-1-1A1,1,0,0,0,12,14Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,14Zm-5,4a1,1,0,1,0-1-1A1,1,0,0,0,12,18Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,18ZM7,14a1,1,0,1,0-1-1A1,1,0,0,0,7,14ZM19,4H18V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V10H20ZM20,8H4V7A1,1,0,0,1,5,6H19a1,1,0,0,1,1,1ZM7,18a1,1,0,1,0-1-1A1,1,0,0,0,7,18Z"></path></g></svg>
                    <span>${todo.due}</span>
                </div>
            </div>
          </div>
          <div class="button-section">
            <button class="checkmark-btn">
              <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>checkmark-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-102.000000, -1141.000000)" fill="#000000"> <path d="M124.393,1151.43 C124.393,1151.43 117.335,1163.73 117.213,1163.84 C116.81,1164.22 116.177,1164.2 115.8,1163.8 L111.228,1159.58 C110.85,1159.18 110.871,1158.54 111.274,1158.17 C111.677,1157.79 112.31,1157.81 112.688,1158.21 L116.266,1161.51 L122.661,1150.43 C122.937,1149.96 123.548,1149.79 124.027,1150.07 C124.505,1150.34 124.669,1150.96 124.393,1151.43 L124.393,1151.43 Z M118,1141 C109.164,1141 102,1148.16 102,1157 C102,1165.84 109.164,1173 118,1173 C126.836,1173 134,1165.84 134,1157 C134,1148.16 126.836,1141 118,1141 L118,1141 Z" id="checkmark-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
            </button>  
            <button class="delete-btn">
                <svg fill="#000000" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>trash-solid</title> <path class="clr-i-solid clr-i-solid-path-1" d="M6,9V31a2.93,2.93,0,0,0,2.86,3H27.09A2.93,2.93,0,0,0,30,31V9Zm9,20H13V14h2Zm8,0H21V14h2Z"></path><path class="clr-i-solid clr-i-solid-path-2" d="M30.73,5H23V4A2,2,0,0,0,21,2h-6.2A2,2,0,0,0,13,4V5H5A1,1,0,1,0,5,7H30.73a1,1,0,0,0,0-2Z"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
            </button>  
            <button class="edit-btn">
              <svg viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit [#1479]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"> </path> </g> </g> </g> </g></svg>
            </button>
            </div>
        </div>
        `;

        this.todoSection.appendChild(div);
    }
    
    renderFolder (folder) {
        const div = document.createElement("div");
        div.classList.toggle("folder");
        div.dataset.folderId = folder.id;
        div.innerHTML += `
        <div class="folder-icon">
         <svg class="default-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <!-- <rect width="24" height="24" fill="white"></rect> ← REMOVE THIS LINE -->
                <path d="M3 6.47214C3 6.16165 3.07229 5.85542 3.21115 5.57771L4 4H9L10 6H20C20.5523 6 21 6.44772 21 7V9V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V9V6.47214Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> 
                <path d="M4 20H20C20.5523 20 21 19.5523 21 19V11C21 9.89543 20.1046 9 19 9H5C3.89543 9 3 9.89543 3 11V19C3 19.5523 3.44772 20 4 20Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> 
            </g>
         </svg>
        
         <svg class="hover-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <!-- <rect width="24" height="24" fill="white"></rect> ← REMOVE THIS LINE TOO -->
                <path d="M4 9V6.47214C4 6.16165 4.07229 5.85542 4.21115 5.57771L5 4H10L11 6H21C21.5523 6 22 6.44772 22 7V9V18C22 19.1046 21.1046 20 20 20H18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> 
                <path d="M17.2362 9H2.30925C1.64988 9 1.17099 9.62698 1.34449 10.2631L3.59806 18.5262C3.83537 19.3964 4.62569 20 5.52759 20H19.6908C20.3501 20 20.829 19.373 20.6555 18.7369L18.201 9.73688C18.0823 9.30182 17.6872 9 17.2362 9Z" stroke="#000000"></path> 
            </g>
         </svg>
        </div>  
        <div class="folder-title">
            ${folder.title}
        </div>
        `;

        this.folderSection.appendChild(div);
    }

    showTodosInFolder(folderId) {
        const todos = document.querySelectorAll('.todo');
        todos.forEach(todo => {
            if (todo.dataset.folderId === folderId) {
                todo.classList.remove('hidden');
            } else {
                todo.classList.add('hidden');
            }
        });
    }

    showAllTodos() {
        const todos = document.querySelectorAll('.todo');
        todos.forEach(todo => {
            todo.classList.remove('hidden');
        });
    }

    removeTodo(todoId) {
        const element = document.getElementById(todoId);
        if (element) {
            element.remove();
        }
    }
}

export { TodoForm, FolderForm, UI };
