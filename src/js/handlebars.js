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
      return "https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj";
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
