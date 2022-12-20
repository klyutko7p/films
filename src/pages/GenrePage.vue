<template>
  <div>
    <div class="main-genre" v-cloak v-if="!isLoading">
      <div class="">
        <h1>Movies - {{ totalResults }}</h1>
        <select
          class="form-select form-select-lg mb-3 mt-3"
          aria-label="Default select example"
          v-model="sortQuery"
          @change="searchFunction"
          style="border-radius: 20px"
        >
          <option value="popularity.desc" selected>Popularity +</option>
          <option value="popularity.asc" selected>Popularity -</option>
          <option value="release_date.desc" selected>Release date +</option>
          <option value="release_date.asc" selected>Release date -</option>
          <option value="revenue.desc" selected>Revenue +</option>
          <option value="revenue.asc" selected>Revenue -</option>
          <option value="vote_average.desc" selected>Vote average +</option>
          <option value="vote_average.asc" selected>Vote average -</option>
          <option value="original_title.desc" selected>Title (A-Z)</option>
          <option value="original_title.asc" selected>Title (Z-A)</option>
        </select>
        <div v-for="film in films" :key="film.id" class="movie-list">
          <div class="movie">
            <div @click="$router.push(`/movie/${film.id}`)">
              <img
                :src="POSTER_URL + film.poster_path"
                alt=""
                v-if="film.poster_path"
                loading="lazy"
              />
              <img src="@/assets/poster.png" alt="" loading="lazy" v-else />
            </div>
            <div class="ms-3">
              <span
                @click="$router.push(`/movie/${film.id}`)"
                class="title-genre muted"
              >
                {{ film.title }}
              </span>
              <p>{{ getYearAndDayFromDate(film.release_date) }}</p>
              <p class="muted">{{ film.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex align-items-center justify-content-center mt-5">
      <Loader></Loader>
    </div>
    <div ref="observer"></div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
export default {
  data() {
    return {
      films: [],
      POSTER_URL: "https://image.tmdb.org/t/p/w200",
      totalResults: 0,
      sortQuery: "popularity.desc",
      genres: [],
      movie: {},
      isLoading: true,
    };
  },
  methods: {
    getYearAndDayFromDate(date) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    async loadMore() {
      this.page += 1;
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US&sort_by=${this.sortQuery}&with_genres=${this.$route.params.id}&vote_count.gte=100&with_watch_monetization_types=free`,
          {
            params: {
              page: this.page,
            },
          }
        )
        .then((result) => {
          this.totalResults = result.data.total_results;
          this.totalPages = result.data.total_pages;
          this.films = [...this.films, ...result.data.results];
          this.isLoading = false;
        });
    },
    async searchFunction() {
      this.page = 1;
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US&sort_by=${this.sortQuery}&with_genres=${this.$route.params.id}&vote_count.gte=100&with_watch_monetization_types=free`,
          {
            params: {
              page: this.page,
            },
          }
        )
        .then((result) => {
          this.totalPages = result.data.total_pages;
          this.films = result.data.results;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.searchFunction();
  },
  mounted() {
    document.body.style.setProperty("--background", `black`);
    this.searchFunction();
    const options = {
      rootMargin: "0px",
      threshold: 1,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.loadMore();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  components: { Loader },
};
</script>

<style scoped>
.movie {
  height: 180px;
}

.movie img {
  width: 120px;
  height: 180px;
}

.main-genre {
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.title-genre {
  transition: 0.2s;
  cursor: pointer;
  font-size: 16px;
}

.title-genre:hover {
  color: var(--main-color-of);
}
</style>
