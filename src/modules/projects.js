import { over } from "lodash";
import { content } from "../index"

const listContainer = document.createElement("div");
listContainer.className = "list-container";

const sidebar = document.createElement("div");
sidebar.className = "sidebar";

listContainer.appendChild(sidebar);

//project factory function
const Project = (name) => {
    const items = [];
    return {name, items}
}

const makeProjects = () => {

    const projects = document.createElement("div");
    projects.id = "projects-title";
    sidebar.appendChild(projects);

    const projectsTitle = document.createElement("div");
    projectsTitle.id = "projects-title";
    projectsTitle.innerHTML = "PROJECTS";
    projects.appendChild(projectsTitle);

    const folders = document.createElement("UL");
    folders.id = "folders";
    projects.appendChild(folders);

}


const makeModal = () => {

    /*
            <div class="sidebar">
                <div class="projects">
                    <div id="projects-title">PROJECTS</div>
                    <ul id="folders">
                        <li><button id="folder">&#128193 Default</button></li>
                        <li><button id="folder">&#128193 Default</button></li>
                    </ul>
                </div> 
                <button id="add-project" data-modal-target="#modal">+Add New Project</button>
                <div class="modal" id="modal">
                    <div class="modal-header">
                      <div class="title">Add New Project</div>
                      <button data-close-button class="close-button">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="get">
                            <label for="name">Project Name:</label>
                            <input type="text" id="name" name="name" placeholder="Project Name">
                            <p>
                                <button id="add" type="submit">Add Book</button>
                            </p>
                        </form>
                    </div>
                </div>
                <div id="overlay"></div>
            </div>
    
    */

            
    const modalButton = document.createElement("button");
    modalButton.id = "add-project";
    modalButton.setAttribute("data-modal-target", `#modal`);
    modalButton.innerHTML = `+ Add New Project`;
    sidebar.appendChild(modalButton);

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal";
    modalContainer.id = "modal";
    sidebar.appendChild(modalContainer);
    
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalContainer.appendChild(modalHeader);

    const modalTitle = document.createElement("div");
    modalTitle.className="modal-title";
    modalTitle.innerHTML = `Add New Project`;
    modalHeader.appendChild(modalTitle);

    const modalClose = document.createElement("button");
    modalClose.setAttribute("data-close-button", "");
    modalClose.className = "close-button";
    modalClose.innerHTML = `&times;`;
    modalHeader.appendChild(modalClose);

    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalContainer.appendChild(modalBody);

    const modalForm = document.createElement("form");
    modalForm.setAttribute("action", "");
    modalForm.setAttribute("method", "get");
    modalBody.appendChild(modalForm);

    const projectName = document.createElement("label");
    projectName.setAttribute("for", "name");
    projectName.innerHTML = `Project Name:`;
    modalForm.appendChild(projectName);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.id = "name";
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("placeholder", "Project Name");
    modalForm.appendChild(nameInput);

    const buttonContainer = document.createElement("p");
    const modalAdd = document.createElement("button");
    modalAdd.id = "add";
    modalAdd.setAttribute("type", "submit");
    modalAdd.innerHTML = `Add Book`;
    buttonContainer.appendChild(modalAdd);
    modalForm.appendChild(modalAdd);s

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    sidebar.appendChild(overlay);

}



export { makeProjects }