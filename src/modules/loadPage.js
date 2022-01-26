//When page loads,
// load ProjectList
// load active folder and subsequent to-do items

import { assignItem, getItem, getItemForm } from "./items";
import { runModal } from "./modal"
import { displayFolder, displaySelected, getForm, getProject, selectFolder } from "./projects";
import { getProjectList, setProjectList, projectList } from "./storage";

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
    
    console.log(getProjectList());
    getProjectList();

    displayProjects(getProjectList()); 
    displayItems(getProjectList());
   
}

const displayProjects = (projects) => {
    
    projects.forEach((project, index) => {
        displayFolder(project.name); //displays each folder
        displaySelected(index); //highlights selected and opens item container
    }); 
}

const displayItems = (projects) => {
    let activeProjectID;

    projects.forEach((project, index) => {
        if(project.active){
            activeProjectID = index;
        }
    });
    projects[activeProjectID].items.forEach((item) => assignItem(item));
}

export {init, loadStorage}