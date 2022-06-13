import { WATCHED_PAGE_FILMS, QUEUE_PAGE_FILMS } from './api-variables.js';
import { load } from './local-storage';
import Handlebars from 'handlebars';
import libraryFilmCard from '../templates/library-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
export let whatArrIsOpen = 'queue';

const btnWatchedEl = document.querySelector('.js-btn-watched');
const btnQueueEl = document.querySelector('.js-btn-queue');
export const galleryLibEl = document.querySelector('.gallery-library__list');
export const watchedArr = load(WATCHED_PAGE_FILMS);
export const queueArr = load(QUEUE_PAGE_FILMS);

btnQueueEl.classList.toggle('btn--active');

btnWatchedEl.addEventListener('click', getDataWatched);
btnQueueEl.addEventListener('click', getDataQueue);

function getDataWatched() {
  whatArrIsOpen='watched';

  btnWatchedEl.classList.add('btn--active');
  btnWatchedEl.classList.remove('btn--bright');
  btnQueueEl.classList.add('btn--bright');
  btnQueueEl.classList.toggle('btn--active');
  const watchedArr1 = load(WATCHED_PAGE_FILMS);
  const watchedMarkup = libraryFilmCard(watchedArr1);
  galleryLibEl.innerHTML = watchedMarkup;
}


export function getDataQueue() {
  whatArrIsOpen = 'queue';

  btnQueueEl.classList.add('btn--active');
  btnQueueEl.classList.remove('btn--bright');
  btnWatchedEl.classList.add('btn--bright');
  btnWatchedEl.classList.toggle('btn--active');
  const queueArr1 = load(WATCHED_PAGE_FILMS);
  const queueMarkup = libraryFilmCard(queueArr1);
  galleryLibEl.innerHTML = queueMarkup;
}
