import Handlebars from 'handlebars';
import { FilmsApi } from './api';
import filmCard from '../templates/film-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import {
  CURRENT_PAGE_FILMS,
  WATCHED_PAGE_FILMS,
  QUEUE_PAGE_FILMS,
} from '../index';
import Notiflix from 'notiflix';

export const galleryEl = document.querySelector('.container__list');

export const filmsApi = new FilmsApi();

getStartPage();
async function getStartPage() {
  return await filmsApi
    .findMovies()
    .then(result => {
      const markupHomepage = filmCard(result);
      localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(result));
      galleryEl.innerHTML = markupHomepage;
    })
    .catch(err => Notiflix.Notify.failure(`${err}`));
}
