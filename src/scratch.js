// grab all elements 
const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

//local Storage
class Storage {//creates storage first then methods are applied on task obj
    //michal creates obj and saves to local storage at once/return local storage when added proj &tasks
    static addTodStorage(todoArr){
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    static getStorage(){
        let storage = localStorage.getItem("todo") === null ? 
        [] : JSON.parse(localStorage.getItem("todo"));
        return storage
    }
}

// empty array 
let todoArr = Storage.getStorage();//array of all to dos..can be of  whole todolist?

// form part 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    const todo = new Todo(id, input.value);//new task add it to tasks array maybe do same for projects -> todolist and tasks->project
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    //add to storage
    Storage.addTodStorage(todoArr);
});

// make object instance 
class Todo {
    constructor(id, todo){
        this.id = id;//do for project too?
        this.todo = todo;
    }
}

// display the todo in the DOM;
class UI{
    static displayData(){
        let displayData = todoArr.map((item) => {
            return `
                <div class="todo">
                <p>${item.todo}</p>
                <span class="remove" data-id = ${item.id}>🗑️</span>
                </div>
            `
        });
        lists.innerHTML = (displayData).join(" ");
    }
    static clearInput(){
        input.value = "";
    }
    static removeTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
            let btnId = e.target.dataset.id;
            //remove from array.
            UI.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addTodStorage(todoArr);
    }
}

//once the browser is loaded
window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    //remove from the dom
    UI.removeTodo();
});