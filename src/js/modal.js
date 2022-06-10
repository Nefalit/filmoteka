import Handlebars from 'handlebars';
import { FilmsApi } from './api';
import filmModal from '../templates/modal.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import {
  CURRENT_PAGE_FILMS,
  WATCHED_PAGE_FILMS,
  QUEUE_PAGE_FILMS,
} from '../index';

const galleryListEl = document.querySelector('.container__list');
const modalEl =document.querySelector(".modal__container")
console.log(modalEl);

galleryListEl.addEventListener('click', filmCardClickHandler);

function filmCardClickHandler(ev) {
  if (ev.target.parentNode.parentNode.className !== 'container__card') {
    return;
  }

}
