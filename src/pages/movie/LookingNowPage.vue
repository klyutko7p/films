<template>
  <div v-cloak>
    <div class="main-movie" v-if="!isLoading">
      <div>
        <div class="mt-5">
          <div class="sort mt-5">
            <div class="d-flex align-items-center justify-content-between">
              <h1>Sort</h1>
              <i
                class="fa fa-arrow-down"
                aria-hidden="true"
                @click="isSelectedSort = true"
                v-if="!isSelectedSort"
              ></i>
              <i
                class="fa fa-arrow-right"
                aria-hidden="true"
                @click="isSelectedSort = false"
                v-if="isSelectedSort"
              ></i>
            </div>
            <div v-if="!isSelectedSort">
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

              <label for="" class="h3">Sort Results By</label>
              <select
                class="form-select form-select-lg mb-3 mt-3"
                aria-label="Default select example"
                v-model="sortQuery"
                @change="searchFunction"
                style="border-radius: 20px"
              >
                <option value="popularity.desc" selected>Popularity +</option>
                <option value="popularity.asc" selected>Popularity -</option>
                <option value="release_date.desc" selected>
                  Release date +
                </option>
                <option value="release_date.asc" selected>
                  Release date -
                </option>
                <option value="revenue.desc" selected>Revenue +</option>
                <option value="revenue.asc" selected>Revenue -</option>
                <option value="vote_average.desc" selected>
                  Vote average +
                </option>
                <option value="vote_average.asc" selected>
                  Vote average -
                </option>
                <option value="original_title.desc" selected>
                  Title (A-Z)
                </option>
                <option value="original_title.asc" selected>Title (Z-A)</option>
              </select>
            </div>
          </div>

          <div class="filters">
            <div class="d-flex align-items-center justify-content-between">
              <h1 style="font-size: 20px">Filters</h1>
              <i
                class="fa fa-arrow-right"
                aria-hidden="true"
                @click="isSelectedFilter = true"
                v-if="!isSelectedFilter"
              ></i>
              <i
                class="fa fa-arrow-down"
                aria-hidden="true"
                @click="isSelectedFilter = false"
                v-if="isSelectedFilter"
              ></i>
            </div>

            <div v-if="isSelectedFilter">
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
              <div>
                <h3>Release year</h3>
                <input
                  type="number"
                  name=""
                  class="form-select"
                  placeholder="Type any year"
                  v-model="dateQuery"
                />
              </div>

              <div class="mt-5">
                <h3>Language</h3>
                <select
                  class="form-select mb-3"
                  aria-label="Default select example"
                  v-model="languageQuery"
                  @change="searchFunction"
                >
                  <option value="" selected>Any language</option>
                  <option
                    v-for="language in languages"
                    :key="language"
                    :value="language.iso_639_1"
                  >
                    {{ language.english_name }}
                  </option>
                </select>
              </div>

              <div class="mb-5 mt-5">
                <h3>Genres</h3>
                <div class="row row-cols-2">
                  <div v-for="genre in genres" :key="genre.id" class="col mb-3">
                    <span
                      @click="
                        getIds(genre.id), selectedSelection(), searchFunction()
                      "
                      :id="genre.id"
                      class="genre-button muted"
                      >{{ genre.name }}</span
                    >
                  </div>
                </div>
              </div>

              <div>
                <h3>
                  User score <i class="fa fa-star" aria-hidden="true"></i>
                </h3>
                <h5>min: 0, max: 10</h5>
                <VueSlider
                  v-model="userScore"
                  min="0"
                  max="10"
                  @input="searchFunction"
                ></VueSlider>
              </div>
              <div class="mt-5">
                <h3>
                  Minimum User Votes
                  <i class="fa fa-users" aria-hidden="true"></i>
                </h3>
                <h5>min: 0, max: 1000</h5>
                <VueSlider v-model="userVotes" min="0" max="1000"></VueSlider>
              </div>
              <div class="mt-5">
                <h3>Runtime <i class="fa fa-times" aria-hidden="true"></i></h3>
                <h5>min: 0, max: 400 (min.)</h5>
                <VueSlider v-model="runTime" min="0" max="400"></VueSlider>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <my-button
              @click="clear(), searchFunction()"
              class="d-flex justify-content-end"
              >Clear filters</my-button
            >
            <my-button
              @click="searchFunction"
              class="d-flex justify-content-end"
              >Search</my-button
            >
          </div>
        </div>
      </div>

      <div class="film-main">
        <h1>Total Results</h1>
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated bg-warning"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width: 100%"
          ></div>
        </div>
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
          v-if="films"
        >
          <div
            v-for="film in films"
            :key="film.id"
            class="col film-main-content"
          >
            <img
              :src="IMG_URL + film.poster_path"
              alt=""
              loading="lazy"
              @click="$router.push(`/movie/${film.id}`)"
              v-if="film.poster_path"
            />
            <img
              src="@/assets/poster.png"
              alt=""
              loading="lazy"
              @click="$router.push(`/movie/${film.id}`)"
              v-if="!film.poster_path"
            />
            <div class="film-main-content-text">
              <span
                @click="$router.push(`/movie/${film.id}`)"
                class="muted title-search"
              >
                {{ film.title || film.original_title }}
              </span>
              <span>{{ getYearAndDayFromDate(film.release_date) }}</span>
              <span
                >{{ film.vote_average.toFixed(1) }}, {{ film.vote_count }}</span
              >
            </div>
          </div>
        </div>
        <div
          v-if="totalPages == 0"
          class="d-flex align-items-center justify-content-center"
        >
          <h1 style="font-style: italic; font-size: 24px">
            Now there are no data that matched your query.
          </h1>
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
import MyButton from "../../components/UI/MyButton.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import Loader from "@/components/Loader.vue";
import "./movie-page.css";
export default {
  components: { MyButton, VueSlider, Loader },
  data() {
    return {
      films: [],
      IMG_URL: "https://image.tmdb.org/t/p/w300",
      languageQuery: "en",
      sortQuery: "popularity.desc",
      dateQuery: 2022,
      colorVote: "",
      ids: [],
      isLoading: true,
      isSelectedSort: false,
      isSelectedFilter: false,
      isSelected: false,
      page: 0,
      totalPages: 0,
      userScore: 0,
      userVotes: 300,
      runTime: 0,
    };
  },
  methods: {
    async loadMore() {
      this.page += 1;
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US&primary_release_year=${this.dateQuery}&sort_by=${this.sortQuery}&with_original_language=${this.languageQuery}&vote_average.gte=${this.userScore}&with_runtime.gte=${this.runTime}&vote_count.gte=${this.userVotes}&with_genres=${this.ids}&with_watch_monetization_types=free`,
          {
            params: {
              page: this.page,
            },
          }
        )
        .then((result) => {
          this.totalPages = result.data.total_pages;
          this.films = [...this.films, ...result.data.results];
          this.isLoading = false;
        });
    },
    async searchFunction() {
      this.page = 1;
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US&primary_release_year=${this.dateQuery}&sort_by=${this.sortQuery}&with_original_language=${this.languageQuery}&vote_average.gte=${this.userScore}&with_runtime.gte=${this.runTime}&vote_count.gte=${this.userVotes}&with_genres=${this.ids}&with_watch_monetization_types=free`,
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
    getYearAndDayFromDate(date) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    getIds(idGenre) {
      if (this.ids.length == 0) {
        this.ids.push(idGenre);
      } else {
        if (this.ids.includes(idGenre)) {
          this.ids.forEach((id, index) => {
            if (id == idGenre) {
              this.ids.splice(index, 1);
            }
          });
        } else {
          this.ids.push(idGenre);
        }
      }
    },
    selectedSelection() {
      const tags = document.querySelectorAll(".genre-button");
      tags.forEach((tag) => {
        tag.classList.remove("selected");
      });

      if (this.ids.length != 0) {
        this.ids.forEach((id) => {
          const tag = document.getElementById(id);
          tag.classList.add("selected");
        });
      }
    },
    clear() {
      const tags = document.querySelectorAll(".genre-button");
      tags.forEach((tag) => {
        tag.classList.remove("selected");
      });
      this.languageQuery = "";
      this.dateQuery = "";
      this.ids = [];
      this.userScore = 0;
      this.userVotes = 0;
      this.runTime = 0;
    },
  },
  computed: {
    languages() {
      let languages = this.$store.getters.getLanguages;
      return languages.sort();
    },
    genres() {
      let genres = this.$store.getters.allGenres;
      return genres;
    },
  },
  mounted() {
    document.body.style.setProperty("--background", `black`);
    this.searchFunction();
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.loadMore();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
};
</script>

<style scoped></style>
