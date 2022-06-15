import Handlebars from 'handlebars';
import {
  getYear,
  getPosterUrl,
  getShortPopularity,
  getShortGenres,
} from './handlebars.js';
import filmModal from '../templates/modal.hbs';
import { WATCHED_PAGE_FILMS, QUEUE_PAGE_FILMS } from './api-variables.js';
import { save, load } from './local-storage';
import {
  selectedList,
  getDataQueue,
  getDataWatched,
  firstIdxWatched,
  firstIdxQueue,
} from './gallery-library-pagination';

const galleryLibEl = document.querySelector('.gallery-library__list');

const backdrop = document.querySelector('.backdrop');
const modalInfoFilm = document.querySelector('.modal__info-film');
const btnCloseModal = document.querySelector('.modal__button-close-modal');
galleryLibEl.addEventListener('click', libCardClickHandler);

getDataQueue();

function libCardClickHandler(event) {
  const watchedArr = load(WATCHED_PAGE_FILMS);
  const queueArr = load(QUEUE_PAGE_FILMS);
  if (event.target.nodeName === 'UL') {
    return;
  }
  const currentId = Number(event.target.closest('.gallery-library__card').id);
  const unitedStorageArr =
    watchedArr && queueArr
      ? [...watchedArr, ...queueArr]
      : watchedArr
      ? [...watchedArr]
      : [...queueArr];
  const currentFilmIdx = unitedStorageArr.findIndex(el => el.id === currentId);
  const currentFilm = unitedStorageArr[currentFilmIdx];

  const markup = filmModal(currentFilm);

  modalInfoFilm.innerHTML = markup;

  backdrop.classList.remove('visually-hidden');
  backdrop.addEventListener('click', backdropCloseModal);

  const btnWatchedEl = document.querySelector('.modal__button-watched');
  const btnQueueEl = document.querySelector('.modal__button-queue');
  btnWatchedEl.addEventListener('click', saveToLibWatchedStorage);
  btnQueueEl.addEventListener('click', saveToLibQueueStorage);

  function saveToLibWatchedStorage() {
    const queueArr = load(QUEUE_PAGE_FILMS);

    const requiredInd = queueArr.findIndex(el => el.id === currentFilm.id);
    queueArr.splice(requiredInd, 1);
    localStorage.setItem(QUEUE_PAGE_FILMS, JSON.stringify(queueArr));

    save(WATCHED_PAGE_FILMS, currentFilm);
//     firstIdxQueue = 0;
  }

  function saveToLibQueueStorage() {
    const watchedArr = load(WATCHED_PAGE_FILMS);
    const requiredInd = watchedArr.findIndex(el => el.id === currentFilm.id);
    watchedArr.splice(requiredInd, 1);
    localStorage.setItem(WATCHED_PAGE_FILMS, JSON.stringify(watchedArr));

    save(QUEUE_PAGE_FILMS, currentFilm);
//     firstIdxWatched = 0;
  }

  btnCloseModal.addEventListener('click', filmCardCloseWindow);
  document.addEventListener('keydown', filmCardCloseWindowByEsc);

  function backdropCloseModal(event) {
    if (event.target.classList.contains('backdrop')) {
      filmCardCloseWindow();
    }
  }

  function filmCardCloseWindowByEsc(ev) {
    if (ev.code !== 'Escape') {
      return;
    }
    filmCardCloseWindow();
  }

  function filmCardCloseWindow() {
    if (selectedList === 'queue') {
      getDataQueue();
    } else {
      getDataWatched();
    }

    backdrop.classList.add('visually-hidden');
    btnCloseModal.removeEventListener('click', filmCardCloseWindow);
    btnWatchedEl.removeEventListener('click', saveToLibWatchedStorage);
    btnQueueEl.removeEventListener('click', saveToLibQueueStorage);
    document.removeEventListener('keydown', filmCardCloseWindowByEsc);
    backdrop.removeEventListener('click', backdropCloseModal);
  }
}
