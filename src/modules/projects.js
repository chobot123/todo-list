

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
  console.log(e.target);
  console.log(e.target.elements);
  const {name} = e.target.elements; //get name from user input
  console.log(name.value);
  let newProject = Project(name.value); //make a new project with that name
  projectList.push(newProject); //add that project to the project array list
  displayFolder(name.value); //display the new project folder
  getForm.reset();
}

//makes a project folder given its name to:
//add to project list AND
//add to display
const makeFolder = (name) => {

    let listContainer = document.createElement("li");

    let temp = document.createElement("button");
    temp.className = "folder";
    temp.id = projectList.length - 1;
    temp.innerHTML = `&#128193 ${name.charAt(0).toUpperCase() + name.slice(1)}`;

    listContainer.appendChild(temp);
    return listContainer;

}

//displays the folder that was made by appending to folders container
const displayFolder = (name) => {
    const folders = document.getElementById("folders");
    folders.appendChild(makeFolder(name));

}

//selects folder on project list
const selectFolder = () => {
    displayList.addEventListener("click", (event) => {
        for(let i = 0; i < displayList.children.length; i++){
            let currentProject = displayList.children[i].firstChild;
            if(event.target.id === currentProject.id){
                event.target.classList.add("active");
            }
            else {currentProject.classList.remove("active")}
        }
    })
}




export { getForm, getProject, projectList, displayList, selectFolder, getFolder}