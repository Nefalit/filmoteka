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
      return "../images/body/template.jpg";
    }
    return `https://image.tmdb.org/t/p/w500${string}`;
  }
);

export const getShortPopularity = Handlebars.registerHelper(
  'getShortPopularity',
  function (number) {
    if (!number) {
      return 'Unknown';
    }
    return number.toFixed(1);
  }
);
