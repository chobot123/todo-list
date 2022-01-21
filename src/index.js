import _ from 'lodash';

import './styles/style.css'

import {runModal} from './modules/modal.js'
import {getForm, getProject, selectFolder} from './modules/projects.js'

const content = document.querySelector(".content");

runModal();
selectFolder();

getForm.addEventListener("submit", getProject);

export {content}