!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},l={},a=n.parcelRequired76b;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in l){var n=l[e];delete l[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){l[e]=n},n.parcelRequired76b=a),a("k917N");var i=a("8nrFW");a("WMajR");var r=a("iU1Pc");a("jRtQr");var o=a("5HWQb"),s=a("9s6o9"),c=a("4LMMA"),d=a("1VFfL"),u=a("l5bVx"),v=e(a("WMajR")).template({1:function(n,t,l,a,i){var r,o,s=null!=t?t:n.nullContext||{},c=n.hooks.helperMissing,d="function",v=n.escapeExpression,f=n.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return"  <li id="+v((void 0===(o=null!=(o=f(l,"id")||(null!=t?f(t,"id"):t))?o:c)?"undefined":e(u)(o))===d?o.call(s,{name:"id",hash:{},data:i,loc:{start:{line:2,column:9},end:{line:2,column:15}}}):o)+" class='gallery-library__card'>\n    <img\n      class='gallery-library__img'\n"+(null!=(r=f(l,"if").call(s,null!=t?f(t,"poster_path"):t,{name:"if",hash:{},fn:n.program(2,i,0),inverse:n.program(4,i,0),data:i,loc:{start:{line:5,column:6},end:{line:9,column:13}}}))?r:"")+"      alt="+v((void 0===(o=null!=(o=f(l,"title")||(null!=t?f(t,"title"):t))?o:c)?"undefined":e(u)(o))===d?o.call(s,{name:"title",hash:{},data:i,loc:{start:{line:10,column:10},end:{line:10,column:19}}}):o)+"\n    />\n    <div class='gallery-library__info-wrap'>\n      <p class='gallery-library__name'>"+v((void 0===(o=null!=(o=f(l,"title")||(null!=t?f(t,"title"):t))?o:c)?"undefined":e(u)(o))===d?o.call(s,{name:"title",hash:{},data:i,loc:{start:{line:13,column:39},end:{line:13,column:48}}}):o)+"</p>\n      <div class='gallery-library__info'>\n"+(null!=(r=f(l,"if").call(s,null!=t?f(t,"genre_ids"):t,{name:"if",hash:{},fn:n.program(6,i,0),inverse:n.program(8,i,0),data:i,loc:{start:{line:15,column:8},end:{line:19,column:15}}}))?r:"")+"            |\n            "+v((f(l,"getYear")||t&&f(t,"getYear")||c).call(s,null!=t?f(t,"release_date"):t,{name:"getYear",hash:{},data:i,loc:{start:{line:21,column:12},end:{line:21,column:36}}}))+"</span>\n        <span class='gallery-library__rating'>"+v((void 0===(o=null!=(o=f(l,"vote_average")||(null!=t?f(t,"vote_average"):t))?o:c)?"undefined":e(u)(o))===d?o.call(s,{name:"vote_average",hash:{},data:i,loc:{start:{line:22,column:46},end:{line:22,column:62}}}):o)+"</span>\n      </div>\n    </div>\n  </li>\n"},2:function(e,n,t,l,a){var i=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return"      src='"+e.escapeExpression((i(t,"getPosterUrl")||n&&i(n,"getPosterUrl")||e.hooks.helperMissing).call(null!=n?n:e.nullContext||{},null!=n?i(n,"poster_path"):n,{name:"getPosterUrl",hash:{},data:a,loc:{start:{line:6,column:11},end:{line:6,column:39}}}))+"'\n"},4:function(e,n,t,l,a){return"      src='https://papik.pro/uploads/posts/2021-12/thumbs/1639228118_1-papik-pro-p-kino-klipart-1.jpg'\n"},6:function(e,n,t,l,a){var i=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return"        <span class='gallery-library__genre'>"+e.escapeExpression((i(t,"getShortGenres")||n&&i(n,"getShortGenres")||e.hooks.helperMissing).call(null!=n?n:e.nullContext||{},null!=n?i(n,"genre_ids"):n,{name:"getShortGenres",hash:{},data:a,loc:{start:{line:16,column:45},end:{line:16,column:73}}}))+"\n"},8:function(e,n,t,l,a){return"        <span class='gallery-library__genre'>Жанр невідомий\n"},compiler:[8,">= 4.3.0"],main:function(e,n,t,l,a){var i;return null!=(i=(e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]})(t,"each").call(null!=n?n:e.nullContext||{},n,{name:"each",hash:{},fn:e.program(1,a,0),inverse:e.noop,data:a,loc:{start:{line:1,column:0},end:{line:26,column:9}}}))?i:""},useData:!0}),f=(c=a("4LMMA"),s=a("9s6o9"),document.querySelector(".gallery-library__list")),m=document.querySelector(".js-btn-watched"),p=document.querySelector(".js-btn-queue"),g=document.querySelector("#pagination"),_=document.querySelector(".lib__empty"),y=20,h="queue";function E(e){f.innerHTML="",f.insertAdjacentHTML("beforeend",v(e))}m.addEventListener("click",P);var L=1,b=0,S=20;function P(){m.classList.add("btn--active"),m.classList.remove("btn--bright"),p.classList.add("btn--bright"),p.classList.remove("btn--active"),h="watched",g.classList.add("visually-hidden"),_.classList.add("visually-hidden");var n=(0,c.load)(s.WATCHED_PAGE_FILMS);if(void 0===n||!n.length)return f.innerHTML="",void _.classList.remove("visually-hidden");if(E(n.slice(b,S)),n&&n.length>20){g.classList.remove("visually-hidden");var t=new(e(d))("pagination",{totalItems:n.length,itemsPerPage:y,visiblePages:5,centerAlign:!0});t.movePageTo(L),t.on("afterMove",(function(e){var n=(0,c.load)(s.WATCHED_PAGE_FILMS);L=e.page,S=(b=(L-1)*y)+y,E(n.slice(b,S))}))}else E(n),b=0,L=1,S=20}p.addEventListener("click",I);var M=1,A=0,k=20;function I(){p.classList.add("btn--active"),p.classList.remove("btn--bright"),m.classList.add("btn--bright"),m.classList.remove("btn--active"),h="queue",g.classList.add("visually-hidden"),_.classList.add("visually-hidden");var n=(0,c.load)(s.QUEUE_PAGE_FILMS);if(void 0===n||!n.length)return f.innerHTML="",void _.classList.remove("visually-hidden");if(E(n.slice(A,k)),n&&n.length>20){g.classList.remove("visually-hidden");var t=new(e(d))("pagination",{totalItems:n.length,itemsPerPage:y,visiblePages:5,centerAlign:!0});t.movePageTo(M),t.on("afterMove",(function(e){var n=(0,c.load)(s.QUEUE_PAGE_FILMS);M=e.page,k=(A=(M-1)*y)+y,E(n.slice(A,k))}))}else E(n),A=0,M=1,k=20}var U=document.querySelector(".gallery-library__list"),q=document.querySelector(".backdrop"),w=document.querySelector(".modal__info-film"),x=document.querySelector(".modal__button-close-modal");U.addEventListener("click",(function(n){var t=(0,c.load)(s.WATCHED_PAGE_FILMS),l=(0,c.load)(s.QUEUE_PAGE_FILMS);if("UL"===n.target.nodeName)return;var a=Number(n.target.closest(".gallery-library__card").id),d=t&&l?e(i)(t).concat(e(i)(l)):e(i)(t||l),u=d.findIndex((function(e){return e.id===a})),v=d[u],f=(0,o.default)(v);w.innerHTML=f,q.classList.remove("visually-hidden"),q.addEventListener("click",y);var m=document.querySelector(".modal__button-watched"),p=document.querySelector(".modal__button-queue");m.addEventListener("click",g),p.addEventListener("click",_),"queue"===h&&(p.textContent="Видалити з черги");"watched"===h&&(m.textContent="Видалити з переглянутих");function g(){if("queue"===h){var n=(0,c.load)(s.QUEUE_PAGE_FILMS),t=n.findIndex((function(e){return e.id===v.id}));n.splice(t,1),localStorage.setItem(s.QUEUE_PAGE_FILMS,JSON.stringify(n)),(0,c.save)(s.WATCHED_PAGE_FILMS,v)}else{var l=(0,c.load)(s.WATCHED_PAGE_FILMS),a=l.findIndex((function(e){return e.id===v.id}));if(-1===a)return void e(r).Notify.failure("Цей фільм вже видалено",{timeout:1e3});l.splice(a,1),localStorage.setItem(s.WATCHED_PAGE_FILMS,JSON.stringify(l)),e(r).Notify.success("Фільм видалено з переглянутих",{timeout:1e3})}}function _(){if("watched"===h){var n=(0,c.load)(s.WATCHED_PAGE_FILMS),t=n.findIndex((function(e){return e.id===v.id}));n.splice(t,1),localStorage.setItem(s.WATCHED_PAGE_FILMS,JSON.stringify(n)),(0,c.save)(s.QUEUE_PAGE_FILMS,v)}else{var l=(0,c.load)(s.QUEUE_PAGE_FILMS),a=l.findIndex((function(e){return e.id===v.id}));if(console.log(a),-1===a)return void e(r).Notify.failure("Цей фільм вже видалено",{timeout:1e3});l.splice(a,1),localStorage.setItem(s.QUEUE_PAGE_FILMS,JSON.stringify(l)),e(r).Notify.success("Фільм видалено з черги",{timeout:1e3})}}function y(e){e.target.classList.contains("backdrop")&&L()}function E(e){"Escape"===e.code&&L()}function L(){"queue"===h?I():P(),q.classList.add("visually-hidden"),x.removeEventListener("click",L),m.removeEventListener("click",g),p.removeEventListener("click",_),document.removeEventListener("keydown",E),q.removeEventListener("click",y)}x.addEventListener("click",L),document.addEventListener("keydown",E)})),I(),a("ghnK3")}();
//# sourceMappingURL=library.a1b4fe60.js.map
