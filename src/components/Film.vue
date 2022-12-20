<template>
  <div>
    <div>
      <div class="img_movie">
        <img
          :src="POSTER_URL + film.poster_path"
          alt=""
          class="me-5"
          @click="$router.push(`/movie/${film.id}`)"
          style="width: 200px"
          loading="lazy"
          v-if="film.poster_path"
        />
        <img
          src="@/assets/poster.png"
          class="me-5"
          alt=""
          loading="lazy"
          v-else
        />
        <div class="overlay" :style="{ backgroundColor: colorVote }">
          <h1 style="color: white">
            {{ this.colorCheck(film.vote_average) }}
          </h1>
        </div>
      </div>
      <div class="text grid">
        <span
          class="fs-5 title-text items-text"
          @click="$router.push(`/movie/${film.id}`)"
        >
          {{ film.title }}
        </span>
        <h1
          class="text-muted mt-1"
          style="font-size: 15px"
          v-if="film.release_date"
        >
          {{
            new Date(film.release_date).toLocaleString("en-US", {
              year: "numeric",
            })
          }},
          <span>
            {{ this.getMovieGenreName(film.genre_ids) }}
          </span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    film: {
      type: Object,
      required: true,
    },
    POSTER_URL: {
      type: String,
      required: true,
    },
    genre_ids: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      genres: [],
      movie: {},
      colorVote: "",
    };
  },
  methods: {
    getMovieGenreName(genre_ids) {
      let genreIds = [];
      let genreNames = [];
      let genres = "";

      this.genres.forEach((genre, index) => {
        genreIds[index] = genre.id;
        genreNames[index] = genre.name;
      });

      genre_ids.forEach((genre) => {
        let genreIndex = genreIds.indexOf(genre);
        let genreName = genreNames[genreIndex];
        genres += genreName + ", ";
      });
      genres = genres.slice(0, -2);
      return genres;
    },
    colorCheck(avg) {
      if (avg == 0) {
        this.colorVote = "gold";
      } else if (avg <= 4) {
        this.colorVote = "red";
      } else if (avg <= 5) {
        this.colorVote = "orange";
      } else if (avg < 6.5) {
        this.colorVote = "gray";
      } else if (avg < 8) {
        this.colorVote = "#73B85C";
      } else if (avg >= 8) {
        this.colorVote = "green";
      }
      return avg.toFixed(1);
    },
    getId(id) {
      this.$router.push("/movie/" + id);
    },
  },
  mounted() {
    this.genres = this.$store.getters.allGenres;
    this.movie = this.$store.getters.getMovieGenre;
  },
};
</script>

<style scoped>
.img_movie img {
  cursor: pointer;
  border-radius: 20px;
  object-fit: cover;
  min-height: 300px;
  transition: 0.2s;
  color: rgb(172, 255, 47);
}

.overlay {
  position: absolute;
  top: 15px;
  padding: 5px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
}

.overlay h1 {
  font-size: 14px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.img_movie:hover {
  transition: 0.2s;
  transform: scale(0.99);
}

.items-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
  margin-top: 10px;
}

.text {
  text-align: left;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  max-width: 200px;
}

.title-text {
  transition: 0.2s;
  cursor: pointer;
}
.title-text:hover {
  transition: 0.2s;
  color: var(--main-color-of);
}
</style>
