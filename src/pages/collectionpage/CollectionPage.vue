<template>
  <div v-if="!isLoading" class="main-something" v-cloak>
    <div class="flex-something">
      <div class="col-img">
        <img
          :src="POSTER_URL_ORIG + collection.poster_path"
          alt=""
          loading="lazy"
          v-if="collection.poster_path"
        />
        <img src="@/assets/poster_orig.png" alt="" loading="lazy" v-else />
      </div>
      <div class="info-something">
        <h1>{{ collection.name }}</h1>
        <div class="col-vote">
          <span :style="{ backgroundColor: colorVote }">
            {{ getVote(getSumAVG()) }}
          </span>
          <span>Total vote count - {{ getSumVote() }}</span>
        </div>
        <div class="col-genres">
          <div v-for="genre in arrOfJobs" :key="genre">
            <h1 @click="$router.push(`/genre/${genre}`)" class="me-3">
              {{ getMovieGenreName(genre) }}
            </h1>
          </div>
        </div>
        <p class="h5">Number of movies: {{ collection.parts.length }}</p>
        <div class="mt-3" v-if="collection.overview">
          <h1>Overview</h1>
          <span>
            {{ collection.overview }}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h1>Movies - {{ collection.parts.length }}</h1>
      <div class="progress mb-3">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated bg-warning"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: 100%"
        ></div>
      </div>
      <div v-for="movie in collection.parts" :key="movie.id" class="movie-list">
        <div class="movie">
          <div @click="$router.push(`/movie/${movie.id}`)">
            <img
              :src="POSTER_URL + movie.poster_path"
              alt=""
              v-if="movie.poster_path"
              loading="lazy"
            />
            <img src="@/assets/poster.png" alt="" loading="lazy" v-else />
          </div>
          <div class="ms-3">
            <span @click="$router.push(`/movie/${movie.id}`)">
              {{ movie.title }}
            </span>
            <p>{{ getYearAndDayFromDate(movie.release_date) }}</p>
            <p class="muted">{{ movie.overview }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="text-center d-flex justify-content-center align-content-center mt-5"
  >
    <Loader></Loader>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import "./collection.css";
export default {
  data() {
    return {
      isLoading: true,
      POSTER_URL: "https://image.tmdb.org/t/p/w200",
      POSTER_URL_ORIG: "https://image.tmdb.org/t/p/original",
      genres: [],
      genresArr: [],
      genresNewArr: [],
      colorVote: "",
    };
  },
  methods: {
    getMovieGenreName(genre) {
      let genreIds = [];
      let genreNames = [];
      let genres = "";

      this.genres.forEach((genre, index) => {
        genreIds[index] = genre.id;
        genreNames[index] = genre.name;
      });
      let genreIndex = genreIds.indexOf(genre);
      let genreName = genreNames[genreIndex];
      genres += genreName;
      genres = genres;
      return genres;
    },
    getYearAndDayFromDate(date) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    getGenres() {
      let arr = this.collection.parts;
      let newArr = arr.map((movie) => movie.genre_ids);
      let newArr2 = [];
      for (let i = 0; i < newArr.length; i++) {
        let element = newArr[i];
        for (let i = 0; i < element.length; i++) {
          let genre = element[i];
          newArr2.push(genre);
        }
      }
      let newArr3 = [...new Set(newArr2)];
      this.arrOfJobs = newArr3;
    },
    getSumAVG() {
      let arr = this.collection.parts;
      let newArr = arr.map((movie) => movie.vote_average);
      let newArr2 = newArr.reduce((acc, num) => acc + num, 0);
      return newArr2 / newArr.length;
    },
    getSumVote() {
      let arr = this.collection.parts;
      let newArr = arr.map((movie) => movie.vote_count);
      console.log(newArr);
      let newArr2 = newArr.reduce((acc, num) => acc + num, 0);
      return newArr2;
    },
    getVote(vote) {
      if (vote == 0) {
        this.colorVote = "gold";
      } else if (vote <= 4) {
        this.colorVote = "red";
      } else if (vote <= 5) {
        this.colorVote = "orange";
      } else if (vote < 6.5) {
        this.colorVote = "gray";
      } else if (vote <= 8) {
        this.colorVote = "#73B85C";
      } else if (vote > 8.1) {
        this.colorVote = "green";
      }
      return vote.toFixed(1);
    },
  },
  async created() {
    await this.$store.dispatch("getCollectionById", this.$route.params.id);
    this.getGenres();
    this.getSumAVG();
    this.getSumVote();
    this.isLoading = false;
  },
  mounted() {
    document.body.style.setProperty("--background", `black`);
    this.genres = this.$store.getters.allGenres;
  },
  computed: {
    collection() {
      let collection = this.$store.getters.getCollection;
      return collection;
    },
  },
  components: { Loader },
};
</script>

<style scoped></style>
