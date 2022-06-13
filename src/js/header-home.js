import filmCard from '../templates/film-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import { filmsApi } from './gallery-home';
import { galleryEl } from './gallery-home';
import { CURRENT_PAGE_FILMS } from '..';
import Notiflix from 'notiflix';

export const searchForm = document.querySelector('.js-search-form');
export const searchInput = document.querySelector('.js-search-input');
export const searchBtn = document.querySelector('.js-search-btn');
export const searchWarn = document.querySelector('.js-search-warn');

searchWarn.classList.add('is--hidden');
searchBtn.classList.remove('is--hidden');

searchForm.addEventListener('submit', searchFormSubmitHandler);
searchInput.addEventListener('input', searchInputHandler);

function searchInputHandler(event) {
  searchBtn.classList.remove('is--hidden');
  searchWarn.classList.add('is--hidden');
  const input = event.target.value;
  if (input === '') {
    searchBtn.classList.remove('is--hidden');
    searchWarn.classList.add('is--hidden');
  }
}

export async function searchFormSubmitHandler(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;
  const query = searchQuery.value;
  try {
    const moviesArray = await filmsApi.searchFilmsByQuery(query);
    if (!moviesArray.length) {
      searchBtn.classList.add('is--hidden');
      searchWarn.classList.remove('is--hidden');
      return;
    }
    searchWarn.classList.add('is--hidden');
    galleryEl.innerHTML = filmCard(moviesArray);
    localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(moviesArray));
  } catch (error) {
    Notiflix.Notify.failure(`${error.message}`, {
      timeout: 250,
    });
    // console.log(error.message);
  }
}
