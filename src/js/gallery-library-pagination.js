import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import libraryFilmCard from '../templates/library-card.hbs';
import { load } from './local-storage';
import { WATCHED_PAGE_FILMS, QUEUE_PAGE_FILMS } from './api-variables.js';

const galleryList = document.querySelector('.gallery-library__list');
const watchedBtn = document.querySelector('.js-btn-watched');
const queuedBtn = document.querySelector('.js-btn-queue');
const paginationBox = document.querySelector('#pagination');
const libWarnText = document.querySelector('.lib__empty');

const showPerPage = 20;
export let selectedList = 'queue';

export function renderGallery(arr) {
  galleryList.innerHTML = '';
  galleryList.insertAdjacentHTML('beforeend', libraryFilmCard(arr));
}

watchedBtn.addEventListener('click', getDataWatched);

let currentPageWatched = 1;
export let firstIdxWatched = 0;
let lastIdxWatched = 20;
export function getDataWatched() {
  paginationBox.classList.add('visually-hidden');
  libWarnText.classList.add('visually-hidden');

  const watchedArr1 = load(WATCHED_PAGE_FILMS);
  if (watchedArr1 === undefined || !watchedArr1.length) {
    galleryList.innerHTML = '';
    libWarnText.classList.remove('visually-hidden');
    return;
  }
  renderGallery(watchedArr1.slice(firstIdxWatched, lastIdxWatched));

  if (watchedArr1 && watchedArr1.length > 20) {
    paginationBox.classList.remove('visually-hidden');

    const pagination = new Pagination('pagination', {
      totalItems: watchedArr1.length,
      itemsPerPage: showPerPage,
      visiblePages: 5,
      centerAlign: true,
    });

    pagination.movePageTo(currentPageWatched);

    pagination.on('afterMove', event => {
      const watchedArr1 = load(WATCHED_PAGE_FILMS);
      currentPageWatched = event.page;
      firstIdxWatched = (currentPageWatched - 1) * showPerPage;
      lastIdxWatched = firstIdxWatched + showPerPage;

      renderGallery(watchedArr1.slice(firstIdxWatched, lastIdxWatched));
    });
  } else {
    renderGallery(watchedArr1);
    firstIdxWatched = 0;
    currentPageWatched = 1;
    lastIdxWatched = 20;
  }
  watchedBtn.classList.add('btn--active');
  watchedBtn.classList.remove('btn--bright');
  queuedBtn.classList.add('btn--bright');
  queuedBtn.classList.remove('btn--active');
  selectedList = 'watched';
}

queuedBtn.addEventListener('click', getDataQueue);

let currentPageQueue = 1;
export let firstIdxQueue = 0;
let lastIdxQueue = 20;
export function getDataQueue() {
  paginationBox.classList.add('visually-hidden');
  libWarnText.classList.add('visually-hidden');

  const queueArr1 = load(QUEUE_PAGE_FILMS);
  if (queueArr1 === undefined || !queueArr1.length) {
    galleryList.innerHTML = '';
    libWarnText.classList.remove('visually-hidden');
    return;
  }
  renderGallery(queueArr1.slice(firstIdxQueue, lastIdxQueue));

  if (queueArr1 && queueArr1.length > 20) {
    paginationBox.classList.remove('visually-hidden');

    const pagination = new Pagination('pagination', {
      totalItems: queueArr1.length,
      itemsPerPage: showPerPage,
      visiblePages: 5,
      centerAlign: true,
    });

    pagination.movePageTo(currentPageQueue);

    pagination.on('afterMove', event => {
      const queueArr1 = load(QUEUE_PAGE_FILMS);
      currentPageQueue = event.page;
      firstIdxQueue = (currentPageQueue - 1) * showPerPage;
      lastIdxQueue = firstIdxQueue + showPerPage;

      renderGallery(queueArr1.slice(firstIdxQueue, lastIdxQueue));
    });
  } else {
    renderGallery(queueArr1);
    firstIdxQueue = 0;
    currentPageQueue = 1;
    lastIdxQueue = 20;
  }

  queuedBtn.classList.add('btn--active');
  queuedBtn.classList.remove('btn--bright');
  watchedBtn.classList.add('btn--bright');
  watchedBtn.classList.remove('btn--active');
  selectedList = 'queue';
}
