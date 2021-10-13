export default {
  namespaced: true,
  state() {
    return {
      selectedMovieId: '',
      selectedMovieDetails: {}
    };
  },
  getters: {},
  mutations: {
    saveSelectedMovieId(state, newSelectedMovieId) {
      state.selectedMovieId = newSelectedMovieId;
    },
    saveSelectedMovieDetails(state, newSelectedMovieDetails) {
      state.selectedMovieDetails = newSelectedMovieDetails;
    }
  },
  actions: {
    async fetchSelectedMovieDetails({ commit, state }) {
      const selectedMovieDetails = await _request(
        `&i=${state.selectedMovieId}&plot=short`
      );

      commit('saveSelectedMovieDetails', selectedMovieDetails);
    }
  }
};

async function _request(params) {
  return await fetch('/.netlify/functions/netlifyFunction', {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(res => res.json());
}
