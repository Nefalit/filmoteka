import FilmsApi from './api';

const searchForm = document.querySelector('js-search__input');
const searchBtn = document.querySelector('js-search__btn');

searchForm.addEventListener('submit', searchFormSubmitHandler);

function searchFormSubmitHandler(event) {
  const { searchQuery } = event.currentTarget.elements;
  const query = searchquery.value;
  return;
}
