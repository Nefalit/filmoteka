import Handlebars from 'handlebars';
import { FilmsApi } from './api';
import filmModal from '../templates/modal.hbs';
import {
  getYear,
  getPosterUrl,
  getShortPopularity,
  getShortGenres,
} from './handlebars.js';
import {
  CURRENT_PAGE_FILMS,
  QUEUE_PAGE_FILMS,
  WATCHED_PAGE_FILMS,
} from './api-variables.js';
import { save, load } from './local-storage';
import Notiflix from 'notiflix';

const galleryListEl = document.querySelector('.container__list');
const backdrop = document.querySelector('.backdrop');
const modalInfoFilm = document.querySelector('.modal__info-film');
const btnCloseModal = document.querySelector('.modal__button-close-modal');
galleryListEl.addEventListener('click', filmCardClickHandler);

export function filmCardClickHandler(ev) {
  if (ev.target.parentNode.parentNode.className !== 'container__card') {
    return;
  }

  const collectionFilmsFromLS = JSON.parse(
    localStorage.getItem(CURRENT_PAGE_FILMS)
  );

  const idElementByClick = Number(ev.target.parentNode.parentNode.id);
  const indexObdectFilm = collectionFilmsFromLS.findIndex(
    elem => elem.id === idElementByClick
  );

  const requedFilm = collectionFilmsFromLS[indexObdectFilm];

  modalInfoFilm.innerHTML = filmModal(requedFilm);
  document.body.style.overflow = 'hidden';

  backdrop.classList.remove('visually-hidden');
  backdrop.addEventListener('click', backdropCloseModal);

  function backdropCloseModal(event) {
    if (event.target.classList.contains('backdrop')) {
      filmCardCloseWindow();
    }
  }

  const btnWatchedEl = document.querySelector('.modal__button-watched');
  const btnQueueEl = document.querySelector('.modal__button-queue');
  btnWatchedEl.addEventListener('click', saveToWatchedStorage);
  btnQueueEl.addEventListener('click', saveToQueueStorage);

  function saveToWatchedStorage(ev) {
    const queueArr = load(QUEUE_PAGE_FILMS);
    if (queueArr) {
      const requiredInd = queueArr.findIndex(el => el.id === requedFilm.id);
      if (requiredInd !== -1) {
        queueArr.splice(requiredInd, 1);
        localStorage.setItem(QUEUE_PAGE_FILMS, JSON.stringify(queueArr));
      }
    }
    save(WATCHED_PAGE_FILMS, requedFilm);
  }

  function saveToQueueStorage() {
    const watchedArr = load(WATCHED_PAGE_FILMS);
    if (watchedArr) {
      const requiredInd = watchedArr.findIndex(el => el.id === requedFilm.id);
      if (requiredInd !== -1) {
        watchedArr.splice(requiredInd, 1);
        localStorage.setItem(WATCHED_PAGE_FILMS, JSON.stringify(watchedArr));
      }
    }
    save(QUEUE_PAGE_FILMS, requedFilm);
  }

  btnCloseModal.addEventListener('click', filmCardCloseWindow);
  document.addEventListener('keydown', filmCardCloseWindowByEsc);

  function filmCardCloseWindowByEsc(ev) {
    if (ev.code !== 'Escape') {
      return;
    }
    filmCardCloseWindow();
  }

  function filmCardCloseWindow() {
    backdrop.classList.add('visually-hidden');
    btnCloseModal.removeEventListener('click', filmCardCloseWindow);
    btnWatchedEl.removeEventListener('click', saveToWatchedStorage);
    btnQueueEl.removeEventListener('click', saveToQueueStorage);
    document.removeEventListener('keydown', filmCardCloseWindowByEsc);
    backdrop.removeEventListener('click', backdropCloseModal);
    document.body.style.overflow = 'auto';
  }
}
