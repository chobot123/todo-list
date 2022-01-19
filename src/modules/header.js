import {content} from "../index"

const makeHeader = () => {
    const title = document.createElement("div");
    title.id = "title";
    title.innerHTML = `&#9745 My To-Do List`;
}

export {makeHeader}