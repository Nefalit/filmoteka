import filmCard from '../templates/film-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import { filmsApi, galleryEl, paginationGeneralOptions } from './gallery-home';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { load } from './local-storage';
import { CURRENT_PAGE_FILMS } from './api-variables.js';
import Notiflix from 'notiflix';

export const searchForm = document.querySelector('.js-search-form');
export const searchInput = document.querySelector('.js-search-input');
export const searchBtn = document.querySelector('.js-search-btn');
export const searchWarn = document.querySelector('.js-search-warn');
const container = document.querySelector('#pagination');

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
        return;
      }
      searchWarn.classList.add('is-hidden');
      const markupSearchpage = filmCard(result);
      localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(result));
      galleryEl.innerHTML = markupSearchpage;
      container.classList.add('visually-hidden');
      const { total_results: totalSearchedMovies, page: currentLoadedPage } =
        load('fullResponseData');

      const paginationOptions = {
        totalItems: totalSearchedMovies,
        page: currentLoadedPage,
        ...paginationGeneralOptions,
      };
      if (totalSearchedMovies > 20) {
        const paginationOfMainPage = new Pagination(
          container,
          paginationOptions
        );
        paginationOfMainPage.on('afterMove', event => {
          const currentPage = event.page;
          const currentQuery = searchInput.value;
          filmsApi.page = currentPage;
          getQueryPage(currentQuery);
        });
        container.classList.remove('visually-hidden');
      }
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
  if (query === '') {
    return;
  }
  getQueryPage(query);
}
