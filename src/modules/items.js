import { projectList } from "./projects"; //to assign to-do items to each project in the list

const getItemForm = document.forms[1];
const itemList = document.querySelector(".list");

const Items = (title, details, dueDate, priority, indexInProject) => {
    priority = "low";
    return {
        title,
        details,
        dueDate,
        priority,
        indexInProject
    }
}

//GET INPUT
//  ASSIGN TO A FOLDER
//  MAKE THAT ITEM IN THAT FOLDER


//GETS USER INPUT AND DISPLAYS THE ITEM
const getItem = (e) => {
  e.preventDefault();
  //get user input to make an item
  const {name, details, date, priority} = e.target.elements; 
  const newItem = Items(name.value, details.value, date.value, priority.value);
  
  assignItem(newItem); //add item to selected project

  getItemForm.reset();
}

//ASSIGNS THE ITEM TO THE CURRENT PROJECT AND MAKES A DISPLAY ELEMENT
const assignItem = (item) => {

    const activeFolderId = document.querySelector(".folder.active").id;
    const getItemContainer = document.querySelector(`.item-container-${activeFolderId}`);

    projectList[Number(activeFolderId)].items.push(item); //add item to items list of the selected project
    item.indexInProject = projectList[Number(activeFolderId)].items.length - 1; //assign a position index in project to call
    getItemContainer.appendChild(makeItem(item));

}

//DISPLAYS THE ITEM AND IMPLEMENTS ITS FUNCTIONS
const makeItem = (item) => {
    /*
    
    itemContainer
        titleContainer
            checkItem
            itemTitle

        itemProperties
            itemDue
            itemDetails
            itemPriority
            itemNotes
            itemRemove

    */

    const itemContainer = document.createElement("div"); //item
    itemContainer.className = "item";
    itemContainer.id = item.indexInProject;

    const titleContainer = document.createElement("div"); //container for item title and if item is checked off
    titleContainer.className = "title-container";
    itemContainer.appendChild(titleContainer);

    const checkItem = document.createElement("INPUT"); //check if item is complete
    checkItem.setAttribute("type", "checkbox");
    checkItem.setAttribute("name", "complete");
    checkItem.id = "complete";
    checkItem.addEventListener("click", getChecked); //event listener for checking off item

    titleContainer.appendChild(checkItem);

    const itemTitle = document.createElement("div"); //title of item
    itemTitle.id = "item-title";
    itemTitle.innerHTML = item.title;

    titleContainer.appendChild(itemTitle);
    

    const itemProperties = document.createElement("div"); //container for below
    itemProperties.className = "item-properties";

    itemContainer.appendChild(itemProperties);

    const itemDue = document.createElement("div"); //due date 
    itemDue.id = "item-due";
    itemDue.innerText = item.dueDate;

    itemProperties.appendChild(itemDue);

    const itemDetails = document.createElement("button"); //item details button
    itemDetails.className = "item-details";
    itemDetails.innerHTML = "Details";
    itemDetails.addEventListener("click", getDetail); //Gets all the item details for the modal on click

    itemProperties.appendChild(itemDetails);


    const itemPriority = document.createElement("button"); //priority changer button
    itemPriority.id = "item-priority";
    itemPriority.classList.add(item.priority);
    itemContainer.classList.add(item.priority);
    itemPriority.innerText = "Priority";
    itemPriority.addEventListener("click", changePriority) //changes priority of item

    itemProperties.appendChild(itemPriority);

    const itemNotes = document.createElement("button"); //edit item button
    itemNotes.id = "item-notes";
    itemNotes.innerText = "notes/edit";
    itemProperties.appendChild(itemNotes);

    const itemRemove = document.createElement("button"); //remove item button
    itemRemove.id = "item-remove";
    itemRemove.innerText = "Remove";
    itemRemove.addEventListener("click", removeItem); //deletes item

    itemProperties.appendChild(itemRemove);

    return itemContainer;

}

//updates if the to-do is completed or not via opacity
const getChecked = (e) => {

    const currentItem = e.target.parentElement.parentElement;
    if(e.target.checked) {
        currentItem.style.opacity = "0.2";
    }
    else {
        currentItem.style.opacity = "1";
    }
}

//displays the information of the item in an modal on clicking the details button
const getDetail = (e) => {

    const getButton = document.getElementById("details-button");
    const itemIndex = Number(e.target.parentElement.parentElement.id); //gets index of current item
    const projectIndex = Number(document.querySelector(".folder.active").id); //gets current project index
    const currentItem = projectList[projectIndex].items[itemIndex]; //gets item from projectList

    const nameBody = document.getElementById("name-body"); //gets the name input of the details modal
    const detailBody = document.getElementById("detail-body"); //gets the detail input of details modal
    const dateBody = document.getElementById("date-body"); //gets ..
    const priorityBody = document.getElementById("priority-body"); //gets ..
    
    nameBody.innerHTML = currentItem.title;
    detailBody.innerHTML = currentItem.details;
    dateBody.innerHTML = currentItem.dueDate;
    priorityBody.innerHTML = currentItem.priority;

    getButton.click();

}

//helper function to get the current item in projectList
const getItemFromProject = (index) => {

    const projectIndex = Number(document.querySelector(".folder.active").id); //gets current project index
    const currentItem = projectList[projectIndex].items[index]; //gets item from projectList
    return currentItem;
}

//changes priority low->mid->high by one step per click
const changePriority = (e) => {

    const item = e.target.parentElement.parentElement; //item that is affected (from display)
    const itemIndex = Number(e.target.parentElement.parentElement.id); //gets index of current item
    const currentItem = getItemFromProject(itemIndex); //gets current item from project list

    if(currentItem.priority === "low"){

        item.classList.remove("low");
        item.classList.add("medium");
        e.target.classList.remove("low");
        e.target.classList.add("medium");

        currentItem.priority = "medium";

    }
    else if(currentItem.priority === "medium"){

        item.classList.remove("medium");
        item.classList.add("high");
        e.target.classList.remove("medium");
        e.target.classList.add("high");

        currentItem.priority = "high";

    }
    else if(currentItem.priority === "high"){

        item.classList.remove("high");
        item.classList.add("low");
        e.target.classList.remove("high");
        e.target.classList.add("low");

        currentItem.priority = "low";

    }

}

//remove item from display and project and updates accordingly
const removeItem = (e) => { 
    const folderID = document.querySelector(".folder.active").id; 
    const currentFolder = projectList[Number(folderID)];
    const currentContainer = document.querySelector(`.item-container-${folderID}`); //current container
    const currentItem = e.target.parentElement.parentElement; //current item on display

    for(let i = 0; i < currentContainer.children.length; i++){
        if(Number(currentContainer.children[i].id) > Number(currentItem.id)){
            currentContainer.children[i].id = `${currentContainer.children[i].id - 1}`;
        }
    }

    currentContainer.removeChild(currentItem); //delete from display
    currentFolder.items.splice(Number(currentItem.id), 1); //delete from array
    
}


export {getItemForm, getItem}