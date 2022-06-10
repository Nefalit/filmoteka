import filmCard from '../templates/film-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import { filmsApi } from './gallery-home';
import { galleryEl } from './gallery-home';
import { CURRENT_PAGE_FILMS } from '..';

export const searchForm = document.querySelector('.js-search-form');
export const searchBtn = document.querySelector('.js-search-btn');
export const searchWarn = document.querySelector('.js-search-warn');

searchWarn.classList.add('is-hidden');
searchForm.addEventListener('submit', searchFormSubmitHandler);

export async function searchFormSubmitHandler(event) {
  event.preventDefault();
  searchWarn.classList.add('is-hidden');
  const { searchQuery } = event.currentTarget.elements;
  const query = searchQuery.value;
  try {
    const moviesArray = await filmsApi.searchFilmsByQuery(query);
    galleryEl.innerHTML = filmCard(moviesArray);
    localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(moviesArray));
  } catch (error) {
    console.log(error);
    searchWarn.classList.remove('is-hidden');
  }
}
