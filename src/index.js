import _ from 'lodash';
import './styles/style.css'

import { makeUI } from './modules/main';

const content = document.querySelector(".content");

makeUI();

export {content}