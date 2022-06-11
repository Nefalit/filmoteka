import { WATCHED_PAGE_FILMS, QUEUE_PAGE_FILMS } from '../library';
import { load } from './local-storage';
import Handlebars from 'handlebars';
import libraryFilmCard from '../templates/library-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';

const btnWatchedEl = document.querySelector('.js-btn-watched');
const btnQueueEl = document.querySelector('.js-btn-queue');
const galleryLibEl = document.querySelector('.gallery-library__list');

btnWatchedEl.addEventListener('click', getDataWatched);
btnQueueEl.addEventListener('click', getDataQueue);

function getDataWatched() {
  const watchedArr = load('watchedPageFilms');
  const watchedMarkup = libraryFilmCard(watchedArr);
  galleryLibEl.innerHTML = watchedMarkup;
}

function getDataQueue() {
  const queueArr = load('queuePageFilms');
  const queueMarkup = libraryFilmCard(queueArr);
  galleryLibEl.innerHTML = queueMarkup;
}
