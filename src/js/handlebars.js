import Handlebars from "handlebars"


 export const getYear = Handlebars.registerHelper('getYear',function (string) {
    return string.slice(0,4)
})
export const getPosterUrl = Handlebars.registerHelper('getPosterUrl',function (string) {
    return `https://image.tmdb.org/t/p/w500${string}`
})