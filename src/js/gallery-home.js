import Handlebars from "handlebars"
import { FilmsApi } from './api';
import filmCard from "../templates/film-card.hbs"
import{getYear, getPosterUrl} from "./handlebars.js"

const galleryEl = document.querySelector(".container__list")

export const filmsApi = new FilmsApi();

getStartPage();
function getStartPage() {
    
  return filmsApi.findTrendingMovies().then(result=> {
    const markupHomepage = filmCard(result)
    console.log(result);
    galleryEl.innerHTML = markupHomepage
  });
}

