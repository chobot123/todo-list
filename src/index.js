import _, { initial } from 'lodash';

import './styles/style.css'

import { init, loadStorage } from './modules/loadPage';


window.addEventListener("DOMContentLoaded", loadStorage);
init();


// runModal();
// selectFolder();

// getForm.addEventListener("submit", getProject);
// getItemForm.addEventListener("submit", getItem);
