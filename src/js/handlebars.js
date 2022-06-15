import Handlebars from 'handlebars';

export const getYear = Handlebars.registerHelper('getYear', function (string) {
  if (!string) {
    return 'Рік релізу невідомий';
  }
  return string.slice(0, 4);
});

export const getPosterUrl = Handlebars.registerHelper(
  'getPosterUrl',
  function (string) {
    if (!string) {
      return '../images/body/template.jpg';
    }
    return `https://image.tmdb.org/t/p/w500${string}`;
  }
);

export const getShortPopularity = Handlebars.registerHelper(
  'getShortPopularity',
  function (number) {
    if (!number) {
      return 'Невідомо';
    }
    return number.toFixed(1);
  }
);

export const getShortGenres = Handlebars.registerHelper(
  'getShortGenres',
  function (string) {
    const stringArr = string.split(', ');
    if (stringArr.length > 2) {
      return [...stringArr.slice(0, 2), 'Інші...'].join(', ');
    }
    return stringArr.join(', ');
  }
);

