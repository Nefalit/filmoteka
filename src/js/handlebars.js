import Handlebars from 'handlebars';

export const getYear = Handlebars.registerHelper('getYear', function (string) {
  if (!string) {
    return 'Unknown';
  }
  return string.slice(0, 4);
});
export const getPosterUrl = Handlebars.registerHelper(
  'getPosterUrl',
  function (string) {
    if (!string) {
      return 'https://pixabay.com/get/g0ab16db3c035897e5a6edbdbf6e7377b9a59b438fe36b0f6b75cde0d80a7d2f29da80857d86254e06ef03fb541ba1b48b0efa114b79893f920bcda898d52b3f6_1280.jpg';
    }
    return `https://image.tmdb.org/t/p/w500${string}`;
  }
);
