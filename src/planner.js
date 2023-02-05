import Project from "./project"
import Task from "./task"
export default class Planner{
    constructor(){
        this.projects = []
    }
    setProjects(projects){
        this.projects = projects
    }
    getProjects(){//returns array of projects
        return this.projects
    }
    getProject(projectName){//returns single project
        return this.projects.find((project)=>project.getProjectName()===projectName)

    }
    addProject(newProject){
        this.projects.push(newProject)
    }
    deleteProject(index){//can use project name and exclude it
    this.projects.splice(index,1)
    }
}