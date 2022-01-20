import { makeHeader } from "./header";
import { makeProjects, addProjectBtn } from "./projects";

const init = () => {
    makeHeader();
    makeProjects();
}

export { init } 