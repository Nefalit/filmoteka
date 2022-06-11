export const libraryLocalStorage = {
    onLoad(key) {
      try {
        const data = localStorage.getItem(key);
        if (data === null) {
          return key = undefined;
        } else {
          return JSON.parse(data)
  }   
      } catch (error) {
        console.log(error);
      }
  },

    onSave(key, value){
        try {
          const data = JSON.stringify(value);

          localStorage.setItem(key, data);
        } catch (error) {
            console.log(error);
        }
    },
    getMovieKey(key) {
      const storage = this.onLoad(key);
      if (Array.isArray(storage)) {
        return storage;
      }
      this.onSave(key, []);
      return [];
    },
    addMovie(key, value) {
      const localStorageData = this.onLoad(key);
      this.onSave(key, [value, ...localStorageData]);
  },
    deleteMovie(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.log(error);
        }
    }
}