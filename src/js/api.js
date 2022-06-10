import axios from 'axios';

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

  // при вызове методов в первом then делаем деструктаризацию {data}

  searchFilmsByQuery(query, page) {
    return axios.get(
      `${this.#BASE_URL}/?${
        this.#ROOT_API_KEY
      }&query=${query}&page=${page}&language=${this.lang}`
    );
  }
  
  async findTrendingMovies() {
    const response = await axios.get(
      `${this.#BASE_URL}trending/movie/week?api_key=${this.#ROOT_API_KEY}`
    );
    const result = await response.data;
    const { results: moviesArray } = result;
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
      movie.genre_ids = getGenresInStrings(movie.genre_ids).join(", ")
    });

    return moviesArray;
  }
}
