import _ from 'lodash';

import './styles/style.css'

import {runModal} from './modules/modal.js'
import {getForm, getProject, selectFolder} from './modules/projects.js'
import {getItemForm, getItem} from  './modules/items'

const content = document.querySelector(".content");

runModal();
selectFolder();

getForm.addEventListener("submit", getProject);
getItemForm.addEventListener("submit", getItem);

export {content}