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
    Notiflix.Notify.success('Success: The film added to watched', {
      timeout: 1000,
    });
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

export { save, load };
