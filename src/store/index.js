import { createStore } from "vuex";
import { toRaw } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();

export default createStore({
  state: {
    popularMovies: [],
    ratedMovies: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
    genres: [],
    genreIds: [],
    genreNames: [],
    selectedMovie: {},
    recommendations: [],
    reviews: [],
    similar: [],
    credits: [],
    crew: [],
    genresMovie: [],
    videos: [],
    idCredit: null,
    selectedPerson: [],
    selectedCollection: [],
    selectedCredit: [],
    languages: [],
    seeLaterFilms: [],
    API_KEY: "",
  },
  getters: {
    allPopularMovies(state) {
      return state.popularMovies;
    },
    allRatedMovies(state) {
      return state.ratedMovies;
    },
    allUpcomingMovies(state) {
      return state.upcomingMovies;
    },
    allNowPlayingMovies(state) {
      return state.nowPlayingMovies;
    },
    allGenres(state) {
      return state.genres;
    },
    allGenresNames(state) {
      return state.genreNames;
    },
    getMovie(state) {
      return toRaw(state.selectedMovie);
    },
    getPerson(state) {
      return toRaw(state.selectedPerson);
    },
    getCollection(state) {
      return toRaw(state.selectedCollection);
    },
    getCredit(state) {
      return toRaw(state.selectedCredit);
    },
    getCredits(state) {
      return toRaw(state.credits);
    },
    getCrew(state) {
      return toRaw(state.crew);
    },
    getRecommendations(state) {
      return toRaw(state.recommendations);
    },
    getReviews(state) {
      return toRaw(state.reviews);
    },
    getSimilar(state) {
      return toRaw(state.similar);
    },
    getVideos(state) {
      return toRaw(state.videos);
    },
    getIdCredit(state) {
      return toRaw(state.idCredit);
    },
    getLanguages(state) {
      return toRaw(state.languages);
    },
    getSeeLaterFilms(state) {
      return state.seeLaterFilms;
    },
  },
  mutations: {
    setPopularMovies(state, payload) {
      state.popularMovies = payload;
    },
    setRatedMovies(state, payload) {
      state.ratedMovies = payload;
    },
    setUpcomingMovies(state, payload) {
      state.upcomingMovies = payload;
    },
    setNowPlayingMovies(state, payload) {
      state.nowPlayingMovies = payload;
    },
    setGenres(state, payload) {
      state.genres = payload;
    },
    setGenresNames(state, payload) {
      state.genreNames = payload;
    },
    setMovie(state, payload) {
      state.selectedMovie = toRaw(payload);
    },
    setPerson(state, payload) {
      state.selectedPerson = toRaw(payload);
    },
    setCollection(state, payload) {
      state.selectedCollection = toRaw(payload);
    },
    setCredit(state, payload) {
      state.selectedCredit = toRaw(payload);
    },
    setCredits(state, payload) {
      state.credits = toRaw(payload);
    },
    setCrew(state, payload) {
      state.crew = toRaw(payload);
    },
    setIdCredit(state, payload) {
      state.idCredit = toRaw(payload);
    },
    setRecommendations(state, payload) {
      state.recommendations = toRaw(payload);
    },
    setReviews(state, payload) {
      state.reviews = toRaw(payload);
    },
    setSimilar(state, payload) {
      state.similar = toRaw(payload);
    },
    setVideos(state, payload) {
      state.videos = toRaw(payload);
    },
    setLanguages(state, payload) {
      state.languages = toRaw(payload);
    },
    setSeeLaterFilms(state, payload) {
      if (state.seeLaterFilms.length == 0) {
        state.seeLaterFilms.push(payload);
      } else {
        if (state.seeLaterFilms.includes(payload)) {
          state.seeLaterFilms.forEach((id, index) => {
            if (id == payload.id) {
              state.seeLaterFilms.splice(index, 1);
            }
          });
        } else {
          state.seeLaterFilms.push(payload);
        }
      }
    },
    removeSeeLaterFilm(state, payload) {
      state.seeLaterFilms.splice(state.seeLaterFilms.indexOf(payload), 1);
    },
        initializeVars(state) {
      if (localStorage.getItem('seeLaterFilms')) {
        state.seeLaterFilms = JSON.parse(localStorage.seeLaterFilms)
      }
    },
  },
  actions: {
    async fetchPopularMovies({ commit }) {
      return await axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US",
          {}
        )
        .then((result) => {
          let popularMovies = result.data.results;
          commit("setPopularMovies", popularMovies);
        });
    },
    async fetchRatedMovies({ commit }) {
      return await axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US"
        )
        .then((result) => {
          let ratedMovies = result.data.results;
          commit("setRatedMovies", ratedMovies);
        });
    },
    async fetchUpcomingMovies({ commit }) {
      return await axios
        .get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US"
        )
        .then((result) => {
          let upcomingMovies = result.data.results;
          commit("setUpcomingMovies", upcomingMovies);
        });
    },
    async fetchNowPlayingMovies({ commit }) {
      return await axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG"
        )
        .then((result) => {
          let nowPlayingMovies = result.data.results;
          commit("setNowPlayingMovies", nowPlayingMovies);
        });
    },
    async fetchGenres({ commit }) {
      return await axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG"
        )
        .then((result) => {
          let genres = result.data.genres;
          let genreNames = genres.map((genre) => {
            return genre.name;
          });
          commit("setGenresNames", genreNames);
          commit("setGenres", genres);
        });
    },

    async getMovieById({ commit }, id) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG`
        )
        .then((result) => {
          let selectedMovie = result.data;
          commit("setMovie", selectedMovie);
        });
    },
    async getPersonById({ commit }, id) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/person/${id}?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG`
        )
        .then((result) => {
          let selectedPerson = result.data;
          commit("setPerson", selectedPerson);
        });
    },
    async getCollectionById({ commit }, id) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/collection/${id}?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US`
        )
        .then((result) => {
          let selectedCollection = result.data;
          commit("setCollection", selectedCollection);
        });
    },
    async getCreditById({ commit }, id) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/credit/${id}?api_key=a0620608f8e0ad4da9adb563a7f5a2d5`
        )
        .then((result) => {
          console.log(result.data);
          let selectedCredit = result.data;
          commit("setCredit", selectedCredit);
        });
    },

    async getCredits({ commit }, id) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG`
        )
        .then((result) => {
          let idCredit = result.data.id;
          let credits = result.data.cast;
          let crew = result.data.crew;
          commit("setCredits", credits);
          commit("setCrew", crew);
          commit("setIdCredit", idCredit);
        });
    },
    async getRecommendations({ commit }, id) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG`
        )
        .then((result) => {
          let recommendation = result.data.results;
          commit("setRecommendations", recommendation);
        });
    },
    async getReviews({ commit }, id) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG`
        )
        .then((result) => {
          let reviews = result.data.results;
          commit("setReviews", reviews);
        });
    },
    async getVideos({ commit }, id) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG`
        )
        .then((result) => {
          let videos = result.data.results;
          commit("setVideos", videos);
        });
    },
    async getLanguages({ commit }) {
      return await axios
        .get(
          `https://api.themoviedb.org/3/configuration/languages?api_key=a0620608f8e0ad4da9adb563a7f5a2d5`
        )
        .then((result) => {
          console.log();
          let languages = result.data;
          commit("setLanguages", languages);
        });
    },

    getSeeLaterFilms({ commit }, film) {
      commit("setSeeLaterFilms", film);
      toast.success(`You added "${film.title}"`) 
    },
    removeSeeLaterFilm({ commit }, film) {
      commit("removeSeeLaterFilm", film);
      toast.warning(`You remove "${film.title}"`) 
    },
  },
  modules: {},
});
