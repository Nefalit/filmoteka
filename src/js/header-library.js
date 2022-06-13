import { WATCHED_PAGE_FILMS, QUEUE_PAGE_FILMS } from './api-variables.js';
import { load } from './local-storage';
import Handlebars from 'handlebars';
import libraryFilmCard from '../templates/library-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';

const btnWatchedEl = document.querySelector('.js-btn-watched');
const btnQueueEl = document.querySelector('.js-btn-queue');
export const galleryLibEl = document.querySelector('.gallery-library__list');
export const watchedArr = load(WATCHED_PAGE_FILMS);
export const queueArr = load(QUEUE_PAGE_FILMS);

btnQueueEl.classList.add('btn--active');

btnWatchedEl.addEventListener('click', getDataWatched);
btnQueueEl.addEventListener('click', getDataQueue);

function getDataWatched() {
  btnWatchedEl.classList.add('btn--active');
  btnWatchedEl.classList.remove('btn--bright');
  btnQueueEl.classList.add('btn--bright');
  btnQueueEl.classList.remove('btn--active');
  const watchedMarkup = libraryFilmCard(watchedArr);
  galleryLibEl.innerHTML = watchedMarkup;
}

export function getDataQueue() {
  btnQueueEl.classList.add('btn--active');
  btnQueueEl.classList.remove('btn--bright');
  btnWatchedEl.classList.add('btn--bright');
  btnWatchedEl.classList.remove('btn--active');
  const queueMarkup = libraryFilmCard(queueArr);
  galleryLibEl.innerHTML = queueMarkup;
}
