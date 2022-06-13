import Notiflix from 'notiflix';

const save = (key, value) => {
  try {
    const currentStorage = localStorage.getItem(key);
    const parsedCurrentStorage = JSON.parse(currentStorage);
    
    if (Array.isArray(parsedCurrentStorage))  {
      const requiredIndx = parsedCurrentStorage.findIndex(
        elem => elem.id === value.id
      );
      if (requiredIndx !== -1) {
        throw new Error('Sorry this film is added!');
      }
      const updatedStorage = JSON.stringify([value, ...parsedCurrentStorage]);
      localStorage.setItem(key, updatedStorage);
      Notiflix.Notify.success('Success: The film added to watched', {
        timeout: 1000,
      });
      return;
    }
    const film = JSON.stringify([value]);
    localStorage.setItem(key, film);
  } catch (error) {
    Notiflix.Notify.failure(`${error.message}`, {
      timeout: 1000,
    });
  }
};

const load = key => {
  try {
    const filmsArr = localStorage.getItem(key);
    return filmsArr === null ? undefined : JSON.parse(filmsArr);
  } catch (error) {
    Notiflix.Notify.failure(`Error to loading`, {
      timeout: 1000,
    });
  }
};
// const onLoad = key => {
//   try {
//     const data = localStorage.getItem(key);
//     if (data === null) {
//       return (key = undefined);
//     } else {
//       return JSON.parse(data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const onSave = (key, value) => {
//   try {
//     const data = JSON.stringify(value);

//     localStorage.setItem(key, data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getMovieKey = key => {
//   const storage = onLoad(key);
//   if (Array.isArray(storage)) {
//     return storage;
//   }
//   onSave(key, []);
//   return [];
// };
// const addMovie = (key, value) => {
//   const localStorageData = onLoad(key);
//   onSave(key, [value, ...localStorageData]);
// };

export { save, load };
