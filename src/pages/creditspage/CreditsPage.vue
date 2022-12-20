<template>
  <div v-if="!isLoading" class="main-cont" v-cloak>
    <div class="main-film">
      <img
        :src="POSTER_URL + film.poster_path"
        alt=""
        style="width: 100px"
        @click="$router.push(`/movie/${film.id}`)"
        v-if="film.poster_path"
      />
      <img
        src="@/assets/poster.png"
        alt=""
        style="width: 100px"
        @click="$router.push(`/movie/${film.id}`)"
        v-else
      />
      <div class="ms-3 film-text">
        <h2 class="fs-3 muted">
          All team of "{{ film.title }}" ({{
            getYearFromDate(film.release_date)
          }})
        </h2>
        <h1 class="fs-3" @click="$router.push(`/movie/${film.id}`)">
          Back to main
        </h1>
      </div>
    </div>
    <div class="main-credits">
      <div>
        <h1 class="mb-3">Cast - {{ credits.length }}</h1>
        <div v-for="credit in credits" :key="credit.id" class="credits">
          <img
            :src="IMG_URL + credit.profile_path"
            alt=""
            class="img-credit"
            loading="lazy"
            @click="$router.push(`/person/${credit.id}`)"
            v-if="credit.profile_path"
          />
          <img
            src="@/assets/crew-wom.png"
            alt=""
            class="img-credit"
            loading="lazy"
            @click="$router.push(`/person/${credit.id}`)"
            v-else
          />
          <div class="ms-3 credit-detail">
            <h1 @click="$router.push(`/person/${credit.id}`)">
              {{ credit.name }}
            </h1>
            <h2>{{ credit.character }}</h2>
          </div>
        </div>
      </div>
      <div>
        <h1 class="mb-3">Crew - {{ crews.length }}</h1>
        <div v-for="name in arrOfJobs.sort()" :key="name">
          <h4 class="mb-3">{{ name }}</h4>
          <div
            v-for="crew in crews.filter((movie) => movie.department == name)"
            :key="crew.id"
            class="credits"
          >
            <img
              :src="IMG_URL + crew.profile_path"
              alt=""
              class="img-credit"
              loading="lazy"
              @click="$router.push(`/person/${crew.id}`)"
              v-if="crew.profile_path"
            />
            <img
              src="@/assets/crew-wom.png"
              alt=""
              class="img-credit"
              loading="lazy"
              @click="$router.push(`/person/${crew.id}`)"
              v-else
            />
            <div class="ms-3 credit-detail">
              <h1 @click="$router.push(`/person/${crew.id}`)">
                {{ crew.name }}
              </h1>
              <h2>{{ crew.job }}</h2>
            </div>
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
import "./credits.css";
import Loader from "@/components/Loader.vue";
export default {
  data() {
    return {
      isLoading: true,
      IMG_URL: "http://image.tmdb.org/t/p/w200",
      POSTER_URL: "http://image.tmdb.org/t/p/w300",
      crew: [],
      arrOfJobs: [],
    };
  },
  methods: {
    getJob() {
      let arr = this.crew;
      let newArr = arr.map((movie) => movie.department);
      let newArr2 = [...new Set(newArr)];
      this.arrOfJobs = newArr2;
    },
    getYearFromDate(date) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
      });
    },
  },
  async created() {
    await this.$store.dispatch("getCredits", this.$route.params.id);
    await this.$store.dispatch("getMovieById", this.$route.params.id);
    this.crew = this.$store.getters.getCrew;
    this.getJob();
    this.isLoading = false;
  },
  computed: {
    credits() {
      let credits = this.$store.getters.getCredits;
      return credits.map((credit) => credit);
    },
    crews() {
      let crew = this.$store.getters.getCrew;
      return crew.map((crew) => crew);
    },
    film() {
      let film = this.$store.getters.getMovie;
      return film;
    },
  },
  mounted() {
    document.body.style.setProperty("--background", `black`);
  },
  components: { Loader },
};
</script>

<style scoped></style>
