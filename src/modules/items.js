import { projectList } from "./projects"; //to assign to-do items to each project in the list
import { appendItemData, removeItemData, setProjectList } from "./storage";

const getItemForm = document.forms[2];
const itemList = document.querySelector(".list");

const Items = (title, details, dueDate, priority, indexInProject) => {

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
  const activeFolderId = document.querySelector(".folder.active").id;

  //projectList[Number(activeFolderId)].items.push(newItem); //add item to items list of the selected project
  appendItemData(Number(activeFolderId), newItem);
  assignItem(newItem); //add item to selected project

  getItemForm.reset();

}

//ASSIGNS THE ITEM TO THE CURRENT PROJECT AND MAKES A DISPLAY ELEMENT
const assignItem = (item) => {

    const activeFolderId = document.querySelector(".folder.active").id;
    const getItemContainer = document.querySelector(`.item-container-${activeFolderId}`);
    item.indexInProject = projectList[Number(activeFolderId)].items.length - 1; //assign a position index in project to call
    setProjectList();
    console.log(item.indexInProject);

    //projectList[Number(activeFolderId)].items.push(item); //add item to items list of the selected project
    //appendItemData(Number(activeFolderId), item);
   //item.indexInProject = projectList[Number(activeFolderId)].items.length - 1; //assign a position index in project to call
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
    itemDetails.innerHTML = "🗒";
    itemDetails.addEventListener("click", getDetail); //Gets all the item details for the modal on click

    itemProperties.appendChild(itemDetails);


    const itemPriority = document.createElement("button"); //priority changer button
    itemPriority.id = "item-priority";
    itemContainer.classList.add(item.priority);
    itemPriority.innerHTML = "&#128680;";
    itemPriority.addEventListener("click", changePriority) //changes priority of item

    itemProperties.appendChild(itemPriority);

    const itemNotes = document.createElement("button"); //edit item button
    itemNotes.id = "item-notes";
    itemNotes.innerHTML = "&#9997";
    itemNotes.addEventListener("click", editItem)

    itemProperties.appendChild(itemNotes); 

    const itemRemove = document.createElement("button"); //remove item button
    itemRemove.id = "item-remove";
    itemRemove.innerHTML = "&#128465";
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

    const nameBody = document.getElementById("name-details"); //gets the name input of the details modal
    const detailBody = document.getElementById("detail-details"); //gets the detail input of details modal
    const dateBody = document.getElementById("date-details"); //gets ..
    const priorityBody = document.getElementById("priority-details"); //gets ..
    
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

        currentItem.priority = "medium";

    }
    else if(currentItem.priority === "medium"){

        item.classList.remove("medium");
        item.classList.add("high");

        currentItem.priority = "high";

    }
    else if(currentItem.priority === "high"){

        item.classList.remove("high");
        item.classList.add("low");

        currentItem.priority = "low";

    }

}

//gets item details and allows edit
const editItem = (e) => {
    const currentItem = getItemFromProject(Number(e.target.parentElement.parentElement.id)); //get current item from item object (from projectlist)
    const displayItem = e.target.parentElement.parentElement; //currentItem on display
    const editButton = document.getElementById("edit-button"); //button that targets the edit form modal
    const editName = document.getElementById("edit-name"); //name property on modal
    const editDetails = document.getElementById("edit-details"); //details property on modal
    const editDate = document.getElementById("edit-date"); //date property on modal
    const getPriority = currentItem.priority; //get priority from currentItem
    const editPriority = document.getElementById(`edit-${getPriority}`); //gets id of chosen priority

    editName.value = currentItem.title; 
    editDetails.value = currentItem.details;
    editDate.value = currentItem.dueDate;
    editPriority.checked = true;

    editButton.click();
    
    //On submit, update the item's properties
    document.forms[1].addEventListener("submit", (e) => {

        e.preventDefault();
        //removes the current priority display
        displayItem.classList.remove(currentItem.priority);
        const {name, details, date, priority} = e.target.elements; //input values of updated properties
        
        currentItem.title = name.value; 
        currentItem.details = details.value; 
        currentItem.dueDate = date.value;
        currentItem.priority = priority.value;

        updateDisplay(displayItem, currentItem);

    })

    if(!displayItem.classList.contains("low")|| !displayItem.classList.contains("medium") || !displayItem.classList.contains("high")){
        displayItem.classList.add(currentItem.priority);
    }
}

//helper function to editItem that takes the new Item values and updates the display
const updateDisplay = (displayItem, currentItem) => {
    
    const newName = displayItem.children[0].children[1]; //item name
    const newDate = displayItem.children[1].children[0]; //item date
    
    newName.innerHTML = currentItem.title; //update name
    newDate.innerHTML = currentItem.dueDate; //update date
    displayItem.classList.add(currentItem.priority); //update priority

}

//remove item from display and project and updates accordingly
const removeItem = (e) => { 
    const folderID = document.querySelector(".folder.active").id; 
    const currentProject = projectList[Number(folderID)];
    const currentContainer = document.querySelector(`.item-container-${folderID}`); //current container
    const currentItem = e.target.parentElement.parentElement; //current item on display

    for(let i = 0; i < currentContainer.children.length; i++){
        if(Number(currentContainer.children[i].id) > Number(currentItem.id)){
            currentContainer.children[i].id = `${currentContainer.children[i].id - 1}`;
        }
    }

    currentContainer.removeChild(currentItem); //delete from display
    removeItemData(Number(folderID), Number(currentItem.id));
    currentProject.items.splice(Number(currentItem.id), 1); //delete from array
    
}


export {getItemForm, getItem, makeItem}