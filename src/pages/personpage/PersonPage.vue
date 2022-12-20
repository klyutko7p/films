<template>
  <div v-if="!isLoading" class="person" v-cloak>
    <MyDialog v-model:show="dialogVisible">
      <img
        :src="IMG_URL_BACK + person.profile_path"
        style="width: 500px"
        loading="lazy"
      />
    </MyDialog>
    <div class="person-main">
      <div class="me-5">
        <div class="person-main-img">
          <div>
            <img
              :src="IMG_URL_BACK + person.profile_path"
              alt=""
              v-if="person.profile_path"
              loading="lazy"
              @click="dialogVisible = true"
            />
            <img src="@/assets/crew-wom.png" loading="lazy" alt="" v-else />
            <div class="social-media" v-if="social">
              <a
                :href="TWITTER_URL + social.twitter_id"
                v-if="social.twitter_id"
              >
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a
                :href="FACEBOOK_URL + social.facebook_id"
                v-if="social.facebook_id"
              >
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a
                :href="INSTAGRAM_URL + social.instagram_id"
                v-if="social.instagram_id"
              >
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <span></span>
              <a :href="person.homepage" v-if="person.homepage">
                <i class="fa fa-home" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div class="ms-3">
            <div class="person-info mt-3">
              <h1 class="fs-3 mb-3">Personal info</h1>
              <div>
                <h1>Known for:</h1>
                <p v-if="person.known_for_department" class="muted">
                  {{ person.known_for_department }}
                </p>
                <p v-else>—</p>
              </div>

              <div>
                <h1>Gender:</h1>
                <p v-if="person.gender" class="muted">
                  {{ person.gender == 2 ? "Male" : "Female" }}
                </p>
                <p v-else>—</p>
              </div>

              <div>
                <h1>Birthday:</h1>
                <p v-if="person.birthday" class="muted">
                  {{ getYearAndDayFromDate(person.birthday) }}
                  ({{ getYearOfPerson(person.birthday) }} years old)
                </p>
                <p v-else>—</p>
              </div>

              <div v-if="person.deathday">
                <h1>Deathday:</h1>
                <p class="muted">
                  {{ getYearAndDayFromDate(person.deathday) }}
                </p>
              </div>

              <div>
                <h1>Place of birth:</h1>
                <p v-if="person.place_of_birth" class="muted">
                  {{ person.place_of_birth }}
                </p>
                <p v-else>—</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="person-main-info">
        <h1>{{ person.name }}</h1>
        <div class="person-main-info-bio">
          <h1 class="fs-3">Biography</h1>
          <p style="white-space: pre-wrap" v-if="person.biography">
            {{ person.biography }} <br />
          </p>
          <p v-if="!person.biography">
            We don't have a biography for {{ person.name }}
          </p>
        </div>

        <div
          class="mb-5"
          v-if="
            movies.cast.filter((film) => film.popularity > 10).length > 0 &&
            movies.crew.filter((movie) => movie.popularity > 10).length > 0
          "
        >
          <a class="person-popular-anchor" href="#popular"
            >Show popular movies with the participation of
            {{ person.name }} ></a
          >
        </div>

        <h1>
          All works of {{ person.name }}
          <span class="fs-3 text-muted">
            ({{ movies.crew.length + movies.cast.length }})
          </span>
        </h1>
        <div class="person-anchors">
          <h2>Filters:</h2>
          <span @click="setFilter('Acting')" v-if="movies.cast.length > 0">
            Acting
          </span>
          <div v-for="name of arrOfJobs.sort()" :key="name">
            <span @click="setFilter(name)">{{ name }}</span>
          </div>
        </div>

        <div>
          <div v-if="movies.cast.length > 0 && filter == 'Acting'">
            <div class="mb-3">
              <span class="fs-2" id="acting">Acting</span>
              <span class="text-muted fs-2 ms-2"
                >({{ movies.cast.length }})</span
              >
            </div>

            <div
              v-for="movie in movies.cast"
              :key="movie.id"
              class="grid-info-movie info-movie-container"
            >
              <h1
                class="muted grid-info-movie-title"
                :title="movie.title"
                @click="$router.push(`/movie/${movie.id}`)"
              >
                {{ movie.title }}
                <span v-if="movie.release_date" class="text-muted"
                  >({{ getYearFromDate(movie.release_date) }})</span
                >
              </h1>

              <h1
                class="muted"
                v-if="movie.character"
                :title="movie.character"
                style="text-align: right"
              >
                as
                <span style="font-style: italic; font-size: 16px">{{
                  movie.character
                }}</span>
              </h1>
              <h1 v-else style="text-align: right" class="muted">—</h1>
            </div>
          </div>

          <div v-for="name in arrOfJobs" :key="name" class="muted-info">
            <div v-if="filter == name">
              <span class="fs-2" :id="name"
                >{{ name }}
                <span class="text-muted"
                  >({{
                    movies.crew.filter((movie) => movie.department == name)
                      .length
                  }})</span
                >
              </span>

              <div class="info-movie muted">
                <div
                  v-for="movie in movies.crew.filter(
                    (movie) => movie.department == name
                  )"
                  :key="movie"
                  class="info-movie-container"
                >
                  <div class="grid-info-movie">
                    <h1
                      @click="$router.push(`/movie/${movie.id}`)"
                      class="grid-info-movie-title muted"
                      :title="movie.title"
                    >
                      {{ movie.title }}
                      <span v-if="movie.release_date" class="text-muted"
                        >({{ getYearFromDate(movie.release_date) }})</span
                      >
                    </h1>
                    <div>
                      <h1
                        class="muted"
                        v-if="movie.job"
                        :title="movie.job"
                        style="text-align: right"
                      >
                        as
                        <span style="font-style: italic; font-size: 16px">{{
                          movie.job
                        }}</span>
                      </h1>
                      <h1 v-else style="text-align: right" class="muted">—</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="ms-5"
      id="popular"
      v-if="
        person.known_for_department != 'Acting' &&
        movies.crew.filter((movie) => movie.popularity > 10).length > 0
      "
    >
      <div v-if="movies.crew.length > 0" class="mt-5">
        <label for="" class="fs-1 mb-2"
          >Popular works<i class="fa fa-user ms-3" aria-hidden="true"></i>
        </label>

        <Carousel :settings="settings" :breakpoints="breakpoints">
          <Film
            class="mb-5"
            v-for="film in movies.crew
              .filter(
                (movie) =>
                  movie.department == person.known_for_department &&
                  movie.popularity > 10
              )
              .slice(0, 10)"
            :key="film.id"
            :film="film"
            :genre_ids="film.genre_ids"
            :POSTER_URL="this.POSTER_URL"
            @click="pushSimilar(film.id)"
          >
          </Film>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>

    <div
      class="ms-5"
      id="popular"
      v-if="
        person.known_for_department == 'Acting' &&
        movies.cast.filter((film) => film.popularity > 25).length > 0
      "
    >
      <div v-if="movies.cast.length > 0" class="mt-5">
        <label for="" class="fs-1 mb-2"
          >Popular works<i class="fa fa-user ms-3" aria-hidden="true"></i>
        </label>
        <Carousel :settings="settings" :breakpoints="breakpoints">
          <Film
            class="mb-5"
            v-for="film in movies.cast
              .filter((film) => film.popularity > 25)
              .slice(0, 10)"
            :key="film.id"
            :film="film"
            :genre_ids="film.genre_ids"
            :POSTER_URL="this.POSTER_URL"
            @click="pushSimilar(film.id)"
          >
          </Film>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
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
import "./person.css";
import axios from "axios";
import Loader from "@/components/Loader.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Film from "@/components/Film.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Film,
    Loader,
    MyDialog,
  },
  data() {
    return {
      FACEBOOK_URL: "https://www.facebook.com/",
      TWITTER_URL: "https://twitter.com/",
      INSTAGRAM_URL: "https://www.instagram.com/",
      IMG_URL: "http://image.tmdb.org/t/p/w200",
      IMG_URL_BACK: "http://image.tmdb.org/t/p/original",
      POSTER_URL: "https://image.tmdb.org/t/p/w200",
      isLoading: true,
      movies: [],
      isHidden: true,
      isActiveDetails: false,
      arrOfJobs: [],
      social: [],
      colorVote: "",
      filter: "",
      dialogVisible: false,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        580: {
          itemsToShow: 2.17,
          itemsToScroll: 2,
          transition: 1000,
          snapAlign: "center",
        },
        770: {
          itemsToShow: 3,
          itemsToScroll: 2,
          transition: 1000,
          snapAlign: "center",
        },
        990: {
          itemsToShow: 4,
          itemsToScroll: 2,
          transition: 1000,
          snapAlign: "start",
        },
        1200: {
          mouseDrag: false,
          itemsToShow: 5,
          itemsToScroll: 2,
          transition: 1000,
          snapAlign: "start",
        },
        1410: {
          mouseDrag: false,
          itemsToShow: 5.2,
          itemsToScroll: 5,
          transition: 1000,
          snapAlign: "start",
        },
      },
    };
  },
  methods: {
    getYearFromDate(date) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
      });
    },
    getYearAndDayFromDate(date) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    getYearOfPerson(date) {
      return (
        new Date().toLocaleString("en-US", { year: "numeric" }) -
        new Date(date).toLocaleString("en-US", { year: "numeric" })
      );
    },
    getJob() {
      let arr = this.movies.crew;
      let newArr = arr.map((movie) => movie.department);
      let newArr2 = [...new Set(newArr)];
      this.arrOfJobs = newArr2;
    },
    setFilter(job) {
      this.filter = job;
    },
    async fetchMovies() {
      return await axios
        .get(
          `https://api.themoviedb.org/3/person/${this.$route.params.id}/movie_credits?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG`
        )
        .then((result) => {
          this.movies = result.data;
        });
    },
    async fetchSocial() {
      return await axios
        .get(
          `https://api.themoviedb.org/3/person/${this.$route.params.id}/external_ids?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-ENG`
        )
        .then((result) => {
          this.social = result.data;
        });
    },
  },
  async created() {
    await this.$store.dispatch("getPersonById", this.$route.params.id);
    await this.fetchMovies();
    await this.fetchSocial();
    this.getJob();
    this.isLoading = false;
  },
  mounted() {
    document.body.style.setProperty("--background", `black`);
  },
  computed: {
    person() {
      let person = this.$store.getters.getPerson;
      this.filter = person.known_for_department;
      return person;
    },
  },
};
</script>

<style scoped></style>
