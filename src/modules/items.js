import { projectList, getFolder } from "./projects"; //to assign to-do items to each project in the list

const Items = (check, title, dueDate, priority) => {
    check = false;
    return {
        check,
        title,
        dueDate,
        priority
    }
}

//item form
const itemForm = () => {
    
}

/*
    I want itemts to be assigned to a project
    items to be removed from project
    item to change color based on priority
    item description 
    Item Notes
    
*/