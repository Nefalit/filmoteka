import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import libraryFilmCard from '../templates/library-card.hbs';

const galleryList = document.querySelector('.gallery-library__list');
const watchedBtn = document.querySelector('.js-btn-watched');
const queuedBtn = document.querySelector('.js-btn-queue');

const watchedItemsArr = JSON.parse(localStorage.getItem('watchedPageFilms'));
const queueItemsArr = JSON.parse(localStorage.getItem('queuePageFilms'));
const watchedTotalItems = watchedItemsArr.length;
const queueTotalItems = queueItemsArr.length;
const showPerPage = 20;
let currentPage = 1;
let selectedList = '';

export const pagination = new Pagination('pagination', {
  totalItems: watchedTotalItems,
  itemsPerPage: showPerPage,
  visiblePages: 5,
  centerAlign: true,
  page: 1,
});

export function renderGallery(arr) {
  galleryList.innerHTML = '';
  galleryList.insertAdjacentHTML('beforeend', libraryFilmCard(arr));
}

const filtereQueuedArr = queueItemsArr.filter((item, idx) => idx < showPerPage);

const filteredwatchedArr = watchedItemsArr.filter(
  (item, idx) => idx < showPerPage
);
renderGallery(filteredwatchedArr);

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
  currentPage = event.page;
  const firstIdx = (currentPage - 1) * showPerPage;
  const lastIdx = firstIdx + showPerPage;
  const arrToRender =
    selectedList === 'watched' ? watchedItemsArr : queueItemsArr;

  renderGallery(arrToRender.slice(firstIdx, lastIdx));
});
