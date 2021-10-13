import { createStore } from 'vuex';
import searchResults from './searchResults';
import searchDetails from './searchDetails';

export default createStore({
  modules: {
    searchResults,
    searchDetails
  }
});
