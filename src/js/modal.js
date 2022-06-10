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
const modalEl = document.querySelector('.modal__window');
const modalInfoFilm = document.querySelector('.modal__info-film');
const btnCloseModal = document.querySelector('.modal__button-close-modal');

galleryListEl.addEventListener('click', filmCardClickHandler);

function filmCardClickHandler(ev) {
  modalEl.classList.remove('is-hidden');
  if (ev.target.parentNode.parentNode.className !== 'container__card') {
    return;
  }

  const collectionFilmsFromLS = JSON.parse(
    localStorage.getItem('currentPageFilms')
  );

  const idElementByClick = Number(ev.target.parentNode.parentNode.id);
  const indexObdectFilm = collectionFilmsFromLS.findIndex(
    elem => elem.id === idElementByClick
  );

  // modalInfoFilm.innerHTML = filmModal(collectionFilmsFromLS[indexObdectFilm])

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
}

btnCloseModal.addEventListener('click', filmCardCloseWindow);

function filmCardCloseWindow() {
  modalEl.classList.add('is-hidden');
}
