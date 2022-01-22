import { projectList } from "./projects"; //to assign to-do items to each project in the list

const getItemForm = document.forms[1];
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


//item form
const getItem = (e) => {
  e.preventDefault();
  //get user input to make an item
  const {name, details, date, priority} = e.target.elements; 
  const newItem = Items(name.value, details.value, date.value, priority.value);
  
  assignItem(newItem); //add item to selected project

  getItemForm.reset();
}


const assignItem = (item) => {

    const activeFolderId = document.querySelector(".folder.active").id;
    const getItemContainer = document.querySelector(`.item-container-${activeFolderId}`);
    projectList[Number(activeFolderId)].items.push(item); //add item to items list of the selected project
    item.indexInProject = projectList.length - 1; //assign a position index in project to call
    getItemContainer.appendChild(makeItem(item));

}

const makeItem = (item) => {

    const itemContainer = document.createElement("div");
    itemContainer.className = "item";
    itemContainer.id = item.indexInProject;

    const titleContainer = document.createElement("div");
    titleContainer.className = "title-container";
    itemContainer.appendChild(titleContainer);

    const checkItem = document.createElement("INPUT"); //check if item is complete
    checkItem.setAttribute("type", "checkbox");
    checkItem.setAttribute("name", "complete");
    checkItem.id = "complete";
    checkItem.addEventListener("click", (e)=> {
        const currentItem = e.target.parentElement.parentElement;
        if(e.target.checked) {
            currentItem.style.opacity = "0.2";
        }
        else {
            currentItem.style.opacity = "1";
        }
    });

    titleContainer.appendChild(checkItem);

    const itemTitle = document.createElement("div");
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
    itemPriority.innerText = "Priority";
    itemProperties.appendChild(itemPriority);

    const itemNotes = document.createElement("button"); //edit item button
    itemNotes.id = "item-notes";
    itemNotes.innerText = "notes/edit";
    itemProperties.appendChild(itemNotes);

    const itemRemove = document.createElement("button"); //remove item button
    itemRemove.id = "item-remove";
    itemRemove.innerText = "Remove";
    itemProperties.appendChild(itemRemove);

    return itemContainer;

}

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


export {getItemForm, getItem}