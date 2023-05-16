import Storage from "./storage";
import projectsCombined from "./projectsCombined"; 
import Task from "./task";
import Project from "./project";

export default function userInterface() {
  const listOfProjects = document.querySelector(".list-of-projects");
  const projectNameForm = document.querySelector("#project-name-form");
  const input = document.querySelector("#project-input");
  const lists = document.querySelector("[data-lists]");

  let plannerArray = Storage.getStorage();

  //get project name from the form
  projectNameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProject = new Project(input.value);
    plannerArray = [...plannerArray, newProject];


    UI.displayProjects();
    UI.clearProjectPane();

  });

  class UI {
    static displayProjects() {
  
      //shd be able to access button once project made
  
      let displayProjects = plannerArray.map((item) => {
        return `   
        <div class="project-tile-parent">
        <div class="project-tile">

        <div class="item-name">
        <h3 class="name">${item.name}</h3>
        </div>

        <div class="project-icons">
        <svg class="project-delete-bin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#110050" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        <svg class="project-edit-pencil" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#110050" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        <button class="add-task">
        <svg  class="task-plus"xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#110050" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
    </button>  
        </div>

          </div>

        <div  class="edit-pane" >
          <input type="text" class="toedit-project-name">
          <div class="edit-buttons">
              <button class="project-edit-btn">Save</button>
              <button class="project-cancel-btn">Cancel</button>
          </div>
          </div>

        </div>
          
              `;
      });

      lists.innerHTML = displayProjects.join(" ");
      UI.activateDeleteProject();
      UI.activateEditProject();
      UI.activateSaveProject();
      UI.activateCancelProject();
      UI.displayTasks();
    }
    static clearProjectPane() {
      
      projectNameForm.reset();
    }

    static activateDeleteProject() {
      let projectDeleteBin = document.querySelectorAll(".project-delete-bin");
      projectDeleteBin.forEach((dB, i) => {
        dB.addEventListener("click", () => {
          deleteProject(i);
          UI.displayProjects();
        });
      });

      function deleteProject(i) {
      plannerArray.splice(i, 1);
      }
    }
    static activateEditProject() {
      const projectEditPencil = document.querySelectorAll(
        ".project-edit-pencil"
      );
    
      const editPane = document.querySelectorAll(".edit-pane");
      projectEditPencil.forEach((ep, i) => {
        ep.addEventListener("click", () => {
          editPane[i].style.display = "block";
        });
      });
    }

    static activateCancelProject() {
      const cancelProject = document.querySelectorAll(".project-cancel-btn");
      const editPane = document.querySelectorAll(".edit-pane");
      cancelProject.forEach((cB, i) => {
        cB.addEventListener("click", () => {
          editPane[i].style.display = "none";
        });
      });
    }

    static activateSaveProject() {
      const saveProject = document.querySelectorAll(".project-edit-btn");
      const newInput = document.querySelectorAll(".toedit-project-name");
      saveProject.forEach((sp, i) => {
        sp.addEventListener("click", () => {
          updateItem(newInput[i].value, i);
          UI.displayProjects();
        });
      });
      function updateItem(text, i) {
        plannerArray[i].name = text;
        const editPane = document.querySelectorAll(".edit-pane");
        editPane[i].style.display = "none";
      }
    }

    static displayTasks() {
      const titleBanner = document.querySelector(".title-banner");
      if (plannerArray.length == 0) {
        titleBanner.innerHTML = "Add Project";
      } else {
        titleBanner.innerHTML = "Click a Project";
      }
      const projectTile = document.querySelectorAll(".project-tile");
      projectTile.forEach((pT, i) => {
        pT.addEventListener("click", () => {
          displayActualTasks(i);
          UI.showTasks(i);
          UI.activateDeleteProjectTask(i)
        });
      });
      function displayActualTasks(i) {
        const titleBanner = document.querySelector(".title-banner");
        const addtaskarea = document.querySelector(".add-taskarea");
        titleBanner.innerHTML = plannerArray[i].name;
        //all tasks to be displayed
        //button underneath
        addtaskarea.innerHTML = `
        <div class="add-task-banner">
        <div class="add-task-text">
            <h4>  Add a task</h4>
        </div>

        <div class="add-taskbtn-div">
            <button class="add-task">
                <svg  class="task-plus"xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#110050" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
        </div>
    </div>
        `;
        const addTaskBanner = document.querySelector(".add-task-banner");
        addTaskBanner.addEventListener("click", () => {
          addNewTask(i);
        });

        function addNewTask(i) {
          let formContent = document.querySelector(".form-content");
          formContent.innerHTML = `
        <form class="form" >
    <div class="desc">
        <label class="task-text-label" for="task-text">Task</label>
        <input type="text" name="task-text" id="task-text" placeholder="type in task">
    </div>
    <div class="date">
        <label for="task-date">Due Date</label>
        <input type="date" name="task-date" id="task-date">
    </div>
    <div class="form-priority">
    <label class="task-priority-label" for="task-priority">Priority</label>
    <input type="text" name="task-priority" id="task-priority" placeholder="High/Mild/Low">
       </div>
       <div class="form-btns">
       <button class="form-submit-btn">SUBMIT</button>
       <button class="form-cancel-btn">CANCEL</button>
    </div>
</form>
     `;
          
          //cancel button
          const cancelTaskForm = document.querySelector(".form-cancel-btn");
          cancelTaskForm.addEventListener("click", () => {
            formContent.innerHTML = "";
          });
          //adding a task
          let taskDescription = document.querySelector("#task-text");
          let taskDate = document.querySelector("#task-date");
          let taskPriority = document.querySelector("#task-priority");
          const newTaskForm = document.querySelector(".form");

          newTaskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProjectTask = new Task(
              taskDescription.value,
              taskDate.value,
              taskPriority.value
            );
            plannerArray[i].addTask(newProjectTask);
  
            newTaskForm.reset();
            formContent.innerHTML = "";
            
            //changing colors according to priority:

            // a function to display tasks
            UI.showTasks(i);
            //function to delete actual task
            UI.activateDeleteProjectTask(i)
          });
        }
      } 
 
    } 

    
    static  showTasks(i) {
      const taskArea = document.querySelector(".tasks-area");
      let userTasks = plannerArray[i].tasks.map((item) => {
        return `          
<div class="task">
          
<div class="task-details">
    <input type="checkbox" class="check-box" value="complete" name="complete">
    <div class="task-part">
    <div class="text-task-part">
    <p class="task-description">${item.name}</p>
    </div>
    <div class="icon-task-part">
    <svg class="delete-bin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#110050" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
    
     </div>
    </div>
</div>
<div class="prio-time">
    <h5 class="pane-time">Due date:  ${item.dueDate}</h5>
    <h5 class="taskpane-priority">Priority: ${item.priority}</h5>
</div>

</div> 
`;
      });

      taskArea.innerHTML = userTasks.join(" ");
      const taskPanePriority =
        document.querySelectorAll(".taskpane-priority");
      taskPanePriority.forEach((p) => {
        if (p.innerHTML.includes("High")) {
          p.style.color = " rgb(196, 8, 8)";
        } else if (p.innerHTML.includes("Low")) {
          p.style.color = " green";
        }
        if (p.innerHTML.includes("Mild")) {
          p.style.color = " orange";
        }
      });
      //making  a finished task seem complete
      const taskCheckMark = document.querySelectorAll(".check-box");
      taskCheckMark.forEach((c, i) => {
        c.addEventListener("click", () => {
          
          checkTask(i);
        });
      });
      function checkTask(i) {
        const taskCheckMark = document.querySelectorAll(".check-box");
        const descriptionText =
          document.querySelectorAll(".task-description");
        const checkboxClasses = taskCheckMark[i].classList;
        const paragraphs = descriptionText[i].classList;
        checkboxClasses.toggle("checked");
        paragraphs.toggle("complete");

      
      }



    }
    //deleting a task
   static  activateDeleteProjectTask(i){
    let deleteTaskBtns  = document.querySelectorAll(".delete-bin")
    deleteTaskBtns.forEach((b,m)=>{
      b.addEventListener("click",()=>{
      plannerArray[i].deleteTask(m)
      UI.showTasks(i)
    
      })
    })
   }
  } 

  window.addEventListener("DOMContentLoaded", () => {
    UI.displayProjects();
    
  });
} 