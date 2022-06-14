import Handlebars from 'handlebars';
import { FilmsApi } from './api';
import filmModal from '../templates/modal.hbs';
import { getYear, getPosterUrl, getShortPopularity } from './handlebars.js';
import {
  CURRENT_PAGE_FILMS,
  WATCHED_PAGE_FILMS,
  QUEUE_PAGE_FILMS,
} from './api-variables.js';
import { save, load } from './local-storage';
import Notiflix from 'notiflix';

const galleryListEl = document.querySelector('.container__list');
const backdrop = document.querySelector('.backdrop');
const modalInfoFilm = document.querySelector('.modal__info-film');
const btnCloseModal = document.querySelector('.modal__button-close-modal');
galleryListEl.addEventListener('click', filmCardClickHandler);

export function filmCardClickHandler(ev) {
  document.body.style.overflow = 'hidden';
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
    save(WATCHED_PAGE_FILMS, requedFilm);
  }
  function saveToQueueStorage() {
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
