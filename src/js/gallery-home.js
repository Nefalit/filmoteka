import Handlebars from 'handlebars';
import { FilmsApi } from './api';
import filmCard from '../templates/film-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import {
  CURRENT_PAGE_FILMS,
  WATCHED_PAGE_FILMS,
  QUEUE_PAGE_FILMS,
} from '../index';

export const galleryEl = document.querySelector('.container__list');

export const filmsApi = new FilmsApi();

getStartPage();
function getStartPage() {

    
  // return filmsApi.findTrendingMovies().then(result => {
  //   const markupHomepage = filmCard(result)
  //   localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(result))
  //   console.log(result);
    
  //   galleryEl.innerHTML = markupHomepage
  // }).catch(err => console.log(err));


  return filmsApi.findMovies()
    .then(result => {
      const markupHomepage = filmCard(result);
      localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(result));
      galleryEl.innerHTML = markupHomepage;
    }).catch(err => console.log(err));
  }
