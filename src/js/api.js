import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { FULL_RESPONSE_DATA } from './api-variables.js';

// ROOT_API_KEY: 'f3ea85ad66a7076fbd3968a20cd79e45';
// BASE_URL: 'https://api.themoviedb.org/3/search/movie';

export class FilmsApi {
  #ROOT_API_KEY = 'f3ea85ad66a7076fbd3968a20cd79e45';
  #BASE_URL = 'https://api.themoviedb.org/3/';

  constructor() {
    this.query = null;
    this.page = 1;
    this.lang = 'uk';
  }

  async searchFilmsByQuery(query) {
    const queryFromInput = `${this.#BASE_URL}search/movie?api_key=${
      this.#ROOT_API_KEY
    }&query=${query}&page=${this.page}&language=${this.lang}`;
    return this.findMovies(queryFromInput);
  }

  async findMovies(
    query = `${this.#BASE_URL}trending/movie/week?api_key=${
      this.#ROOT_API_KEY
    }&language=${this.lang}&page=${this.page}`
  ) {
    Loading.standard('Завантаження...', {
      svgColor: '#ff6b01',
      messageColor: '#ff6b01',
    });

    const response = await axios.get(query);
    const {
      data: { results: moviesArray },
    } = response;

    localStorage.setItem(FULL_RESPONSE_DATA, JSON.stringify(response.data));

    const genresResponse = await axios.get(`${
      this.#BASE_URL
    }genre/movie/list?api_key=${this.#ROOT_API_KEY}&language=${this.lang}
    `);
    const genresObject = await genresResponse.data;
    const { genres: genresArray } = genresObject;

    const getGenresInStrings = arr => {
      return arr.reduce((acc, genre_id) => {
        const requiredIdx = genresArray.findIndex(
          genre => genre.id === genre_id
        );
        return [...acc, genresArray[requiredIdx].name];
      }, []);
    };

    moviesArray.forEach(movie => {
      movie.genre_ids = getGenresInStrings(movie.genre_ids).join(', ');
    });

    Loading.remove();
    return moviesArray;
  }
}
