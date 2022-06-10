import Handlebars from "handlebars"
import { FilmsApi } from './api';
import filmCard from "../templates/film-card.hbs"
import{getYear, getPosterUrl} from "./handlebars.js"
import {CURRENT_PAGE_FILMS,WATCHED_PAGE_FILMS,QUEUE_PAGE_FILMS} from '../index'

const galleryEl = document.querySelector(".container__list")

export const filmsApi = new FilmsApi();

getStartPage();
function getStartPage() {
    
  return filmsApi.findTrendingMovies().then(result=> {
    const markupHomepage = filmCard(result)
    localStorage.setItem(CURRENT_PAGE_FILMS, JSON.stringify(result))
    console.log(result);
    
    galleryEl.innerHTML = markupHomepage
  }).catch(err=>console.log(err));
}

export const libraryLocalStorage = {
  onLoad(key) {
    try {
      const data = localStorage.getItem(key);
      if (data === null) {
        return key = undefined;
      } else {
        return JSON.parse(data)
}   
    } catch (error) {
      console.log(error);
    }
  },

    onSave(key, value){
        try {
          const data = JSON.stringify(value);

          localStorage.setItem(key, data);
        } catch (err) {
            console.error('Get state error: ', err);
        }
    },
    getMovieKey(key) {
      const storage = this.onLoad(key);
      if (Array.isArray(storage)) {
        return storage;
      }
      this.onSave(key, []);
      return [];
    },
    addMovie(key, value) {
      const localStorageData = this.onLoad(key);
      this.onSave(key, [value, ...localStorageData]);
  },
  deleteMovie(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
      }
    }
}