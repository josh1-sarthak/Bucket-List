import "./style.css";
import todoFactory from './Bucket.js';

const content = document.querySelector('#content');
const leftPane= document.createElement('div');
leftPane.setAttribute('id', 'left-pane');
const rightPane = document.createElement('div');
rightPane.setAttribute('id', 'right-pane');
content.appendChild(leftPane); //leftPane = defaultProjectCard + ProjectContainer(all projects) + TodoButton + ProjectButton
content.appendChild(rightPane); //rightPane = todoCard

const TodoButton = document.createElement('button');
TodoButton.setAttribute('class', 'todoButton');
TodoButton.textContent='Add Todo';
leftPane.appendChild(TodoButton);

const ProjectButton = document.createElement('button');
ProjectButton.setAttribute('class', 'projectButton');
ProjectButton.textContent='Add Project';
leftPane.appendChild(ProjectButton);

const defaultProjectCard = document.createElement('div');
defaultProjectCard.setAttribute('class', 'defaultProjectCard');
defaultProjectCard.textContent='default';
leftPane.appendChild(defaultProjectCard);

const ProjectContainer = document.createElement('div');
leftPane.appendChild(ProjectContainer);

let defaultTodos=[];

const addTodo = () => {
    const title = prompt("Todo-title");
    const description = prompt("Todo-description");
    const dueDate = prompt("Todo-Due date");
    const priority = prompt("Todo-priority");
    const project = prompt("Todo-project");
    const todoX = todoFactory(title, description, dueDate, priority, project);
    defaultTodos.push(todoX);
    displayTodos();
}

const displayTodos = () => {
    rightPane.innerHTML=''; //to repaint the screen everytime and not get previous items appended
    defaultTodos.map((todo)=>{
    const todoCard = document.createElement('div');
    todoCard.setAttribute('class', `todoCard todoContent ${todo.project}`); 
    todoCard.innerHTML = `<input type="checkbox"> <todoTitle> ${todo.title} </todoTitle> <span class="dueDate">${todo.dueDate} </span>`;
    const details = document.createElement('div');
    details.setAttribute('class', 'details');
    details.innerHTML=`
    <strong> description </strong>: ${todo.description} <br>
    <strong> priority </strong>: ${todo.priority} <br>
    <strong> project </strong>: ${todo.project} <br>
    `;
    todoCard.appendChild(details);

    todoCard.addEventListener('click', () => {
        if (details.style.display === 'block'){
            details.style.display = 'none';
        }
        else {
            details.style.display = 'block';
        }
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent="Remove";
    deleteBtn.setAttribute('class', 'deleteBtn');
    todoCard.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', (e) =>{
        const index = defaultTodos.indexOf(todo);
        if (index > -1){
            defaultTodos.splice(index, 1); //remove todo from default list
        }
        rightPane.removeChild(todoCard); //remove todo from DOM

    })

    const editBtn = document.createElement('button');
    editBtn.textContent="Edit";
    editBtn.setAttribute('class', 'editBtn');
    details.appendChild(editBtn);

    editBtn.addEventListener('click', (e) => {
        let field=prompt(`Which field you want to edit- priority | title | description | dueDate | project ?`);
        let editVal =prompt(`Enter ${field} value`);
        field==='priority'? todo.priority=editVal : 
        field==='title'? todo.title=editVal:
        field==='description'? todo.description=editVal:
        field==='dueDate'? todo.dueDate=editVal:
        field==='project'? todo.project=editVal:
        null;
        displayTodos();
    })

    rightPane.appendChild(todoCard);
})
}
    
TodoButton.addEventListener('click', addTodo);

const projectList=[];
const addProject = () => {
    const projectName = prompt('Enter project name');
    projectList.push(projectName);
    displayProjects();

}

const displayProjects = () => {
        ProjectContainer.innerHTML=''; // used ProjectContainer not leftPane,as leftPane.innerHTML would remove everything including buttons
        projectList.map((project)=>{
        const projectCard = document.createElement('div');
        projectCard.setAttribute('class', 'projectCard');
        projectCard.innerHTML=project;
        ProjectContainer.appendChild(projectCard);

        projectCard.addEventListener('click', (e) => {
            showCards(e, project);
        })

        const showCards = (e, project) => { //project===todo.project (should match project property in todo)
            let todoContent = document.querySelectorAll('.todoContent');
            for (let i=0; i<todoContent.length; i++){
                todoContent[i].classList.add('hide');
            }

            let projectContent = document.querySelectorAll(`.${project}`); //since multiple todos have same project type,we need to use classes instead of ID's to select them in bunch and remove their hide classes
            for (let i=0; i<projectContent.length; i++){
                projectContent[i].classList.remove('hide');
            }

        }
        });
};
    
ProjectButton.addEventListener('click', addProject);
defaultProjectCard.addEventListener('click', displayTodos);
