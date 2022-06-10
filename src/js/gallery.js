import { FilmsApi } from './api';
import filmCard from "../templates/film-card.hbs"
const galleryEl = document.querySelector("")

export const filmsApi = new FilmsApi();

getStartPage();
function getStartPage() {
    
  return filmsApi.findTrendingMovies().then(result=> {
    const markupHomepage = filmCard(result)

  });
}
