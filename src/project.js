//individual projects each with tasks
export default class Project{
    constructor(name){
        this.name = name
        this.tasks = []
    }
    setProjectName(name){
        this.name =name
    }
    getProjectName(){
        return this.name
    }
    setTasks(tasks){//might overwrite the array to become the argument
        this.tasks = tasks
    }
    getTasks(){
        return this.tasks
    }//can func for add get task name
    addTask(newTask){
        this.tasks.push(newTask)
    }
    deleteTask(index){//can put taskname instead and exclude it
        this.tasks.splice(index,1)
    }
}