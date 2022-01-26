//When page loads,
// load ProjectList
// load active folder and subsequent to-do items

import { makeItem, getItem, getItemForm } from "./items";
import { runModal } from "./modal"
import { displayFolder, displaySelected, getForm, getProject, selectFolder } from "./projects";
import { getProjectList, setProjectList } from "./storage";

const init = () => {

    runModal();
    selectFolder();
    getForm.addEventListener("submit", getProject);
    getItemForm.addEventListener("submit", getItem);
}

//const load Storage (ie when page reload)

const loadStorage = () => {
    console.log(!getProjectList())
    if(!getProjectList()){
        console.log(setProjectList());
        setProjectList();
    }
    
    // console.log(getProjectList());
    getProjectList();

    displayProjects(getProjectList()); 
    displayItems(getProjectList());
   
}

const displayProjects = (projects) => {

    console.log(projects);
    projects.forEach((project, index) => {

        console.log(index);
        displayFolder(project.name); //displays each folder
        displaySelected(index); //highlights selected and opens item container

    }); 
    
}

const displayItems = (projects) => {

    projects.forEach((project, index) => {

        const itemContainer = document.querySelector(`.item-container-${index}`);
        project.items.forEach((item) => itemContainer.appendChild(makeItem(item)));

    });
}

export {init, loadStorage}