import Handlebars from 'handlebars';
import { FilmsApi } from './api';
import filmModal from '../templates/modal.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import {
  CURRENT_PAGE_FILMS,
  WATCHED_PAGE_FILMS,
  QUEUE_PAGE_FILMS,
} from '../index';
import { save, load } from './local-storage';

const galleryListEl = document.querySelector('.container__list');
const modalEl = document.querySelector('.modal__window');
const modalInfoFilm = document.querySelector('.modal__info-film');
const btnCloseModal = document.querySelector('.modal__button-close-modal');
galleryListEl.addEventListener('click', filmCardClickHandler);

export function filmCardClickHandler(ev) {
  if (ev.target.parentNode.parentNode.className !== 'container__card') {
    return;
  }
  modalEl.classList.remove('is-hidden');

  const collectionFilmsFromLS = JSON.parse(
    localStorage.getItem(CURRENT_PAGE_FILMS)
  );

  const idElementByClick = Number(ev.target.parentNode.parentNode.id);
  const indexObdectFilm = collectionFilmsFromLS.findIndex(
    elem => elem.id === idElementByClick
  );

  const requedFilm = collectionFilmsFromLS[indexObdectFilm];
  const popularity =
    collectionFilmsFromLS[indexObdectFilm].popularity.toFixed(1);
  const {
    poster_path,
    title,
    vote_average,
    release_date,
    original_title,
    genre_ids,
    overview,
  } = collectionFilmsFromLS[indexObdectFilm];

  modalInfoFilm.innerHTML = filmModal({
    poster_path,
    title,
    vote_average,
    release_date,
    original_title,
    genre_ids,
    overview,
    popularity,
  });

  const btnWatchedEl = document.querySelector('.modal__button-watched');
  const btnQueueEl = document.querySelector('.modal__button-queue');
  btnWatchedEl.addEventListener('click', saveToWatchedStorage);
  btnQueueEl.addEventListener('click', saveToQueueStorage);

  function saveToWatchedStorage(ev) {
    save(WATCHED_PAGE_FILMS, requedFilm);
  }
  function saveToQueueStorage(ev) {
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
    modalEl.classList.add('is-hidden');
    btnCloseModal.removeEventListener('click', filmCardCloseWindow);
    btnWatchedEl.removeEventListener('click', saveToWatchedStorage);
    btnQueueEl.removeEventListener('click', saveToQueueStorage);
  }
}
