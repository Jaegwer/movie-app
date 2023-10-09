import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
const store = new Vuex.Store({
  state: {
    apiUrl: import.meta.env.VITE_API_URL || "",
    apiKey: import.meta.env.VITE_API_KEY || "",
    movieData: null,
    upcomingData: null,
    detailData: null,
    movieId: null,
    favorites: storedFavorites,
	searchQuery: "",
	searchResults:[],
  },
  getters: {
    apiUrl: (state) => state.apiUrl,
    apiKey: (state) => state.apiKey,
    movieData: (state) => state.movieData,
    upcomingData: (state) => state.upcomingData,
    detailData: (state) => state.detailData,
    movieId: (state) => state.movieId,
    favorites: (state) => state.favorites,
    searchQuery: (state) => state.searchQuery,
    searchResults: (state) => state.searchResults,
  },
  mutations: {
    SET_MOVIE_DATA(state, data) {
      state.movieData = data;
    },
    SET_UPCOMING_DATA(state, data) {
      state.upcomingData = data;
    },
    SET_DETAIL_DATA(state, data) {
      state.detailData = data;
    },
    SET_MOVIEID_DATA(state, id) {
      state.movieId = id;
    },
    ADD_FAVORITES_DATA(state, movie) {
      if (!state.favorites.some((fav) => fav.id === movie.id)) {
        state.favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    REMOVE_FAVORITES_DATA(state, movieId) {
      state.favorites = state.favorites.filter((fav) => fav.id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
	SET_SEARCH_QUERY(state, query) {
		state.searchQuery = query;
	  },
	  SET_SEARCH_RESULT(state, searchResults) {
		state.searchResults = searchResults;
	  },
  },
  actions: {
    fetchMovies({ commit, state }) {
      const url = `${state.apiUrl}/discover/movie?api_key=${state.apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          commit("SET_MOVIE_DATA", data.results);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    },
    fetchUpcomingMovies({ commit, state }) {
      const url = `${state.apiUrl}/movie/upcoming?api_key=${state.apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          commit("SET_UPCOMING_DATA", data.results);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    },
    setMovieIdAction({ commit }, id) {
      commit("SET_MOVIEID_DATA", id);
    },
    async fetchMovieDetailsAction({ commit, state }) {
      const movieId = state.movieId;
      try {
        const response = await fetch(
          `${state.apiUrl}/movie/${movieId}?api_key=${state.apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        commit("SET_DETAIL_DATA", data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    addMovieToFavorites({ commit, state }, movie) {
      commit("ADD_FAVORITES_DATA", movie);
    },
    removeMovieFromFavorites({ commit }, movieId) {
      commit("REMOVE_FAVORITES_DATA", movieId);
    },
	async searchMovies({ commit, state }) {

		try {
			console.log(state.searchQuery);
		  const response = await fetch(
			`${state.apiUrl}/search/movie?query=${state.searchQuery}&api_key=${state.apiKey}`
		  );
		  if (!response.ok) {
			throw new Error("Failed to fetch movie result");
		  }
		  const searchResults = await response.json();

		  commit("SET_SEARCH_RESULT", searchResults);
		  console.log(searchResults);
		} catch (error) {
		  console.error("Error fetching movie result:", error);
		}
	  },
  },
});

export default store;
