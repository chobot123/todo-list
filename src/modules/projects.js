import { appendProject, setActiveProject, Project, projectList } from "./storage";

const getForm = document.forms[0];
const displayList = document.getElementById("folders");

/**
 * Creates a project object that is appended to 
 * the projectList and is displayed
 * 
 * @param {*} e
 * @eventListener 
 */

const getProject = (e) => {

  e.preventDefault();

  const {name} = e.target.elements; //get name from user input
  
  let newProject = Project(name.value); //make a new project with that name
  //projectList.push(newProject); //add that project to the project array list
  appendProject(newProject);
  displayFolder(name.value); //display the new project folder
  getForm.reset();
}

/**
 * Displays the project,
 * uses the element returned from 'makeFolder'
 * 
 * @param {*} name 
 * @helper function
 */
const displayFolder = (name) => {
    
    displayList.appendChild(makeFolder(name));

}

/**
 * Makes a list element that appends the project
 * and makes a container for its items with the same id
 * for reference
 * 
 * @param {*} name 
 * @returns {listContainer}
 */
const makeFolder = (name) => {

    //make a list element and append the newly made folder to it
    let listContainer = document.createElement("li");
    let temp = document.createElement("button");
    let projectName = name.charAt(0).toUpperCase() + name.slice(1);
    temp.className = "folder";
    // console.log(projectList);
    projectList.forEach((project, index) => {
        if((project.name.charAt(0).toUpperCase() + project.name.slice(1)) === projectName){
            temp.id = index;
        }
    });

    temp.innerHTML = `&#128193 ${projectName}`;
    listContainer.appendChild(temp);

    //make a item list container that shares the same id as the folder (for reference later)
    makeItemList(Number(temp.id));

    return listContainer;

}

/**
 * Makes an item container to hold the project's items
 * @param {*} index 
 * @helper function
 */
const makeItemList = (index) => {
    console.log(`test`)
    
    const list = document.querySelector(".item-container-list");

    const itemContainer = document.createElement("div");
    itemContainer.className = `item-container-${index}`;
    list.appendChild(itemContainer);

}

/**
 * When the project is selected,
 * the project is highlighted via 'active' class
 * and its item container is selected and displayed, 
 * all others are hidden 
 * @eventListener Container
 */
const selectFolder = () => {
    console.log(projectList);
    displayList.addEventListener("click", (e) => {
        if(e.target.classList.contains("folder")){
            let selectedID = Number(e.target.id);
            for(let i = 0; i < displayList.children.length; i++){
                if(i === selectedID){
                    
                    setActiveProject(selectedID, true);
                    //projectList[selectedID].active = true;
                    displaySelected(selectedID);
                }
                else {
                    setActiveProject(i, false);
                    //projectList[i].active = false;
                    displaySelected(i);
                }
            }
        }
        /*
        for(let i = 0; i < displayList.children.length; i++){
            let currentProject = displayList.children[i].firstChild;
            let itemList = document.querySelector(`.item-container-${i}`);

            if(event.target.id === currentProject.id){
                event.target.classList.add("active");
                itemList.style.display = "initial";
                setActiveProject(Number(currentProject.id), true);

            }
            else {
                currentProject.classList.remove("active");
                itemList.style.display = "none";
                setActiveProject(Number(currentProject.id), false);
            }
        }*/
    })
}

const displaySelected = (projectIndex) => {
    
    let selectedProject = document.querySelectorAll(".folder")[projectIndex];
    let itemList = document.querySelector(`.item-container-${projectIndex}`);
    if(projectList[projectIndex].active === true) {
        
        selectedProject.classList.add("active");
        itemList.style.display = "initial";
    }
    else {
        selectedProject.classList.remove("active");
        itemList.style.display = "none";
    }

}

export { getForm, getProject, displayList, selectFolder, projectList, displayFolder, displaySelected }