import router from '~/routes';

export default {
  namespaced: true,
  state() {
    return {
      userInput: '',
      keyword: '',
      pageNumber: 0,
      results: [],
      modalStatus: false,
      isLoading: false
    };
  },
  getters: {},
  mutations: {
    initSearchResults(state) {
      state.keyword = '';
      state.results = [];
    },
    changeSearchResults(state) {
      state.pageNumber = 0;
      state.results = [];
    },
    saveUserInput(state, newInput) {
      state.userInput = newInput;
    },
    saveKeyword(state) {
      state.keyword = state.userInput;
    },
    updateResults(state, newResults) {
      state.results = [...state.results, ...newResults];
    },
    increasePageNumber(state) {
      state.pageNumber++;
    },
    changeModalStatus(state) {
      state.modalStatus = !state.modalStatus;
    },
    changeLoadingStatus(state) {
      state.isLoading = !state.isLoading;
    }
  },
  actions: {
    async fetchSearchResults({ commit, state }) {
      await commit('saveKeyword');

      if (state.keyword.length < 3) {
        alert('Please enter at least three letters.');
        return;
      }

      router.push({
        name: 'SearchResults',
        params: {
          keyword: state.keyword
        }
      });

      await commit('changeSearchResults');
      await commit('changeLoadingStatus');
      await commit('increasePageNumber');

      const { Search } = await _request(
        `&s=${state.keyword}&page=${state.pageNumber}`
      );

      await commit('changeLoadingStatus');

      if (!Search) {
        return;
      }

      await commit('updateResults', Search);
    },
    async fetchNextSearchResults({ commit, state }) {
      await commit('changeLoadingStatus');
      await commit('increasePageNumber');

      const { Search } = await _request(
        `&s=${state.keyword}&page=${state.pageNumber}`
      );

      if (!Search) {
        alert('마지막 항목입니다.');
        return;
      }

      await commit('updateResults', Search);
      await commit('changeLoadingStatus');
    }
  }
};

async function _request(params) {
  return await fetch('/.netlify/functions/netlifyFunction', {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(res => res.json());
}
