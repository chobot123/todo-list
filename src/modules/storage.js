/**
 * Creates a project object with its name and associated item
 * @param {*} name 
 * @returns {name, items}
 * 
 * @factory function
 */
 const Project = (name) => {
    const items = [];
    const active = false;
    return {name, items, active}
}

let defaultProject = Project("Default"); //default folder
defaultProject.active = true;
let projectList = [defaultProject];

const setProjectList = () => {

    localStorage.setItem("projectList", JSON.stringify(projectList));
}

const getProjectList = () => {

    if(JSON.parse(localStorage.getItem("projectList")) !== null){
        
        projectList = JSON.parse(localStorage.getItem("projectList"));
        
    }
    console.log(JSON.parse(localStorage.getItem("projectList")))
    return JSON.parse(localStorage.getItem("projectList"));
    

}

const setActiveProject = (projectIndex, activeStatus) => {
    // projectList = getProjectList();
    projectList[projectIndex].active = activeStatus;
    setProjectList();
}

const appendProject = (project) => {

    // projectList = getProjectList();
    projectList.push(project);
    setProjectList();
}

const appendItemData = (projectIndex, item) => {

    // projectList = getProjectList();
    projectList[projectIndex].items.push(item);
    setProjectList();
}

const removeItemData = (projectIndex, itemIndex) => {

    // projectList = getProjectList();
    projectList[projectIndex].items.splice(itemIndex, 1);
    setProjectList();

} 

export {appendProject, appendItemData, removeItemData, setActiveProject, setProjectList, getProjectList, Project, projectList}
