

const getForm = document.forms[0]

//project factory function
const Project = (name) => {
    const items = [];
    return {name, items}
}

let defaultProject = Project("Default"); //default folder
const projectList = [defaultProject];
const displayList = document.getElementById("folders");
const getFolder = document.querySelector(".folder.active")

//uses form input of project name to add to project
const getProject = (e) => {

  e.preventDefault();

  const {name} = e.target.elements; //get name from user input
  
  let newProject = Project(name.value); //make a new project with that name
  projectList.push(newProject); //add that project to the project array list
  displayFolder(name.value); //display the new project folder
  getForm.reset();
}

//displays the folder that was made by appending to folders container
const displayFolder = (name) => {

    displayList.appendChild(makeFolder(name));

}

//makes a project folder given its name to:
//add to project list AND
//add to display
const makeFolder = (name) => {

    //make a list element and append the newly made folder to it
    let listContainer = document.createElement("li");
    let temp = document.createElement("button");
    temp.className = "folder";
    temp.id = projectList.length - 1;
    temp.innerHTML = `&#128193 ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    listContainer.appendChild(temp);

    //make a item list container that shares the same id as the folder (for reference later)
    makeItemList(projectList.length - 1);

    return listContainer;

}

const makeItemList = (index) => {
    const list = document.querySelector(".item-container-list");

    const itemContainer = document.createElement("div");
    itemContainer.className = `item-container-${index}`;
    list.appendChild(itemContainer);

}

//selects folder on project list
const selectFolder = () => {
    displayList.addEventListener("click", (event) => {
        for(let i = 0; i < displayList.children.length; i++){
            let currentProject = displayList.children[i].firstChild;
            let itemList = document.querySelector(`.item-container-${i}`);
            console.log(itemList);
            if(event.target.id === currentProject.id){
                event.target.classList.add("active");
                itemList.style.display = "initial";

            }
            else {
                currentProject.classList.remove("active");
                itemList.style.display = "none";
            }
        }
    })
}

export { getForm, getProject, displayList, selectFolder, projectList, getFolder }