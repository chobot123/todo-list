import { content } from "../index"

const listContainer = document.createElement("div");
listContainer.className = "list-container";

const sidebar = document.createElement("div");
sidebar.className = "sidebar";

listContainer.appendChild(sidebar);

const makeProjects = () => {
    const projects = document.createElement("div");
    projects.id = "projects-title";
    sidebar.appendChild(projects);

    const projectsTitle = document.createElement("div");
    projectsTitle.id = "projects-title";
    projects.innerHTML = "PROJECTS";
    projects.appendChild(projectsTitle);

    const folders = document.createElement("UL");
    folders.id = "folders";

    const addProject = document.createElement("button");
    addProject.id = "add-project";
    addProject.innerHTML = `+Add New Project`;
    projects.appendChild(addProject);
}


export { makeProjects }

<div class="list-container">
            <div class="sidebar">
                <div class="projects">
                    <div id="projects-title">PROJECTS</div>
                    <ul id="folders">
                        <li><button id="folder">&#128193 Default</button></li>
                        <li><button id="folder">&#128193 Default</button></li>
                    </ul>
                </div> 
                <button id="add-project">+Add New Project</div>