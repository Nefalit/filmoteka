import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import libraryFilmCard from '../templates/library-card.hbs';
import { load } from './local-storage';
import { WATCHED_PAGE_FILMS, QUEUE_PAGE_FILMS } from './api-variables.js';

const galleryList = document.querySelector('.gallery-library__list');
const watchedBtn = document.querySelector('.js-btn-watched');
const queuedBtn = document.querySelector('.js-btn-queue');

const watchedItemsArr = load(WATCHED_PAGE_FILMS);
const queueItemsArr = load(QUEUE_PAGE_FILMS);
const watchedTotalItems = watchedItemsArr?.length || 0;
const queueTotalItems = queueItemsArr?.length || 0;
const showPerPage = 20;
let selectedList = '';

export const pagination = new Pagination('pagination', {
  totalItems: queueTotalItems,
  itemsPerPage: showPerPage,
  visiblePages: 5,
  centerAlign: true,
  page: 1,
});

export function renderGallery(arr) {
  galleryList.innerHTML = '';
  galleryList.insertAdjacentHTML('beforeend', libraryFilmCard(arr));
}

const filtereQueuedArr =
  queueItemsArr?.filter((item, idx) => idx < showPerPage) || [];
renderGallery(filtereQueuedArr);

const filteredwatchedArr =
  watchedItemsArr?.filter((item, idx) => idx < showPerPage) || [];

watchedBtn.addEventListener('click', event => {
  if (selectedList === 'watched') return;
  pagination.setTotalItems(watchedTotalItems);
  pagination.movePageTo(1);
  selectedList = 'watched';
  renderGallery(filteredwatchedArr);
});

queuedBtn.addEventListener('click', event => {
  if (selectedList === 'queue') return;

  pagination.setTotalItems(queueTotalItems);
  pagination.movePageTo(1);
  selectedList = 'queue';
  renderGallery(filtereQueuedArr);
});

pagination.on('afterMove', event => {
  const currentPage = event.page;
  const firstIdx = (currentPage - 1) * showPerPage;
  const lastIdx = firstIdx + showPerPage;
  const arrToRender =
    selectedList === 'watched' ? watchedItemsArr : queueItemsArr;

  if (!arrToRender) return;

  renderGallery(arrToRender.slice(firstIdx, lastIdx));
});
