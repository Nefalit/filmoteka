import filmCard from '../templates/film-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import { filmsApi } from './gallery-home';
import { galleryEl } from './gallery-home';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { paginationOptions } from './gallery-home';
import { container } from './gallery-home';
import { load } from './local-storage';
import { CURRENT_PAGE_FILMS } from '..';
import Notiflix from 'notiflix';

export const searchForm = document.querySelector('.js-search-form');
export const searchInput = document.querySelector('.js-search-input');
export const searchBtn = document.querySelector('.js-search-btn');
export const searchWarn = document.querySelector('.js-search-warn');
const containerForSearchedMovies = document.querySelector('#pagination1');

searchWarn.classList.add('is-hidden');
searchBtn.classList.remove('is-hidden');

searchForm.addEventListener('submit', searchFormSubmitHandler);
searchInput.addEventListener('input', searchInputHandler);

async function getQueryPage(query) {
  return await filmsApi
    .searchFilmsByQuery(query)
    .then(result => {
      if (!result.length) {
        searchBtn.classList.add('is-hidden');
        searchWarn.classList.remove('is-hidden');
        galleryEl.innerHTML =
          '<li class="container__card"><img src="../images/body/template.jpg" alt="template"></li>';
        containerForSearchedMovies.classList.add('visually-hidden');
        return;
      }
      searchWarn.classList.add('is-hidden');
      const markupSearchpage = filmCard(result);
      localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(result));
      galleryEl.innerHTML = markupSearchpage;
    })
    .catch(err => console.log(err));
}

function searchInputHandler(event) {
  filmsApi.page = 1;
  searchBtn.classList.remove('is-hidden');
  searchWarn.classList.add('is-hidden');
  const input = event.target.value;
  if (input === '') {
    searchBtn.classList.remove('is-hidden');
    searchWarn.classList.add('is-hidden');
  }
}

export async function searchFormSubmitHandler(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;
  const query = searchQuery.value;
  filmsApi.page = 1;
  container.classList.add('visually-hidden');
  containerForSearchedMovies.classList.remove('visually-hidden');
  getQueryPage(query);
  // try {
  //   const moviesArray = await filmsApi.searchFilmsByQuery(query);
  //   if (!moviesArray.length) {
  //     searchBtn.classList.add('is--hidden');
  //     searchWarn.classList.remove('is--hidden');
  //     return;
  //   }
  //   searchWarn.classList.add('is--hidden');
  //   galleryEl.innerHTML = filmCard(moviesArray);
  //   localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(moviesArray));
  // } catch (error) {
  //   console.log(error.message);
  // }

//   try {
//     const moviesArray = await filmsApi.searchFilmsByQuery(query);
//     if (!moviesArray.length) {
//       searchBtn.classList.add('is--hidden');
//       searchWarn.classList.remove('is--hidden');
//       return;
//     }
//     searchWarn.classList.add('is--hidden');
//     galleryEl.innerHTML = filmCard(moviesArray);
//     localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(moviesArray));
//   } catch (error) {
//     Notiflix.Notify.failure(`${error.message}`);
//     // console.log(error.message);
//   }
}

const {
  total_pages: totalPages,
  total_results: totalSearchedMovies,
  page: currentLoadedPage,
} = load('fullResponseData');

const paginationOptions = {
  totalItems: totalSearchedMovies,
  itemsPerPage: 20,
  visiblePages: 1,
  page: currentLoadedPage,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const paginationOfSearchPage = new Pagination(
  containerForSearchedMovies,
  paginationOptions
);
// paginationOfSearchPage.reset(totalSearchedMovies);
paginationOfSearchPage.on('afterMove', event => {
  const currentPage = event.page;
  const currentQueue = searchInput.value;
  filmsApi.page = currentPage;
  getQueryPage(currentQueue);
});
