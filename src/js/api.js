import axios from 'axios';

// ROOT_API_KEY: 'f3ea85ad66a7076fbd3968a20cd79e45';
// BASE_URL: 'https://api.themoviedb.org/3/search/movie';

export default class FilmsApi {
  #ROOT_API_KEY = 'api_key=f3ea85ad66a7076fbd3968a20cd79e45';
  #BASE_URL = 'https://api.themoviedb.org/3/search/movie';

  constructor() {
    this.query = null;
    this.page = 1;
    this.lang = 'uk';
  }
  
// при вызове методов в первом then делаем деструктаризацию {data}

  searchPopularFilms() {
    return axios.get(
      `${this.#BASE_URL}/week?${this.#ROOT_API_KEY}&page=${
        this.page
      }&language=${this.lang}`
    );
  }

  searchFilmsByQuery(query, page) {
    return axios.get(
      `${this.#BASE_URL}/?${
        this.#ROOT_API_KEY
      }&query=${query}&page=${page}&language=${this.lang}`
    );
  }
}
