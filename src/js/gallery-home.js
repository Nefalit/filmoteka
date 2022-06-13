import Handlebars from 'handlebars';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { FilmsApi } from './api';
import filmCard from '../templates/film-card.hbs';
import { getYear, getPosterUrl } from './handlebars.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { load } from './local-storage';
import {
  CURRENT_PAGE_FILMS,
  WATCHED_PAGE_FILMS,
  QUEUE_PAGE_FILMS,
} from './api-variables.js';
import Notiflix from 'notiflix';

export const container = document.querySelector('#pagination');

export const galleryEl = document.querySelector('.container__list');

export const paginationGeneralOptions = {
  itemsPerPage: 20,
  visiblePages: 5,

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

export const filmsApi = new FilmsApi();
filmsApi.page = 1;

getStartPage();

async function getStartPage() {
  return await filmsApi
    .findMovies()
    .then(result => {
      const markupHomepage = filmCard(result);
      localStorage.setItem('currentPageFilms', JSON.stringify(result));

      const { total_results: totalTrendingMovies, page: currentLoadedPage } =
        load('fullResponseData');

      const paginationOptions = {
        totalItems: totalTrendingMovies,
        page: currentLoadedPage,
        ...paginationGeneralOptions,
      };

      const paginationOfMainPage = new Pagination(container, paginationOptions);

      paginationOfMainPage.on('afterMove', event => {
        const currentPage = event.page;
        filmsApi.page = currentPage;
        getStartPage();
      });

      galleryEl.innerHTML = markupHomepage;
    })
    .catch(err => Notiflix.Notify.failure(`${err}`));
}
