import { WATCHED_PAGE_FILMS, QUEUE_PAGE_FILMS } from '../library';
import { load } from './local-storage';
import Handlebars from 'handlebars';
import libraryFilmCard from '../templates/library-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';

const btnWatchedEl = document.querySelector('.js-btn-watched');
const btnQueueEl = document.querySelector('.js-btn-queue');
export const galleryLibEl = document.querySelector('.gallery-library__list');
export const watchedArr = load('watchedPageFilms');
export const queueArr = load('queuePageFilms');

btnWatchedEl.addEventListener('click', getDataWatched);
btnQueueEl.addEventListener('click', getDataQueue);

function getDataWatched() {
  const watchedMarkup = libraryFilmCard(watchedArr);
  galleryLibEl.innerHTML = watchedMarkup;
}

function getDataQueue() {
  const queueMarkup = libraryFilmCard(queueArr);
  galleryLibEl.innerHTML = queueMarkup;
}
