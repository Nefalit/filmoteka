import Handlebars from 'handlebars';
// import libraryCard from '../templates/library-card.hbs';
import { getYear, getPosterUrl, getShortPopularity } from './handlebars.js';
import filmModal from '../templates/modal.hbs';
import { WATCHED_PAGE_FILMS, QUEUE_PAGE_FILMS } from './api-variables.js';
import { galleryLibEl } from './header-library';
import { watchedArr, queueArr, getDataQueue } from './header-library';
import { save, load } from './local-storage';

getDataQueue()
const backdrop = document.querySelector('.backdrop');
const modalInfoFilm = document.querySelector('.modal__info-film');
const btnCloseModal = document.querySelector('.modal__button-close-modal');
galleryLibEl.addEventListener('click', libCardClickHandler);

function libCardClickHandler(event) {
  if (event.target.nodeName === 'UL') {
    return;
  }
  const currentId = Number(event.target.closest('.gallery-library__card').id);
  const unitedStorageArr = [...watchedArr, ...queueArr];
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
    save(WATCHED_PAGE_FILMS, currentFilm);
    console.log(currentFilm);
  }
  function saveToLibQueueStorage() {
    save(QUEUE_PAGE_FILMS, currentFilm);
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
    backdrop.classList.add('visually-hidden');
    btnCloseModal.removeEventListener('click', filmCardCloseWindow);
    btnWatchedEl.removeEventListener('click', saveToLibWatchedStorage);
    btnQueueEl.removeEventListener('click', saveToLibQueueStorage);
    document.removeEventListener('keydown', filmCardCloseWindowByEsc);
    backdrop.removeEventListener('click', backdropCloseModal);
  }
}
