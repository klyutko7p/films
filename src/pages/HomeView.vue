<template>
  <div class="main" v-cloak>
    <div>
      <label for="" class="fs-1 mb-3">Popular films
        <i class="fa fa-fire" aria-hidden="true" @click="$router.push('movies')"></i></label>
      <Carousel :settings="settings" :autoplay="15000" :breakpoints="breakpoints">
        <Film class="mb-5" v-for="film in popularFilms" :key="film.id" :film="film" :genre_ids="film.genre_ids"
          :POSTER_URL="this.POSTER_URL">
        </Film>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>

      <label for="" class="fs-1 mb-3">Top rated films<i class="fa fa-star" aria-hidden="true"
          @click="$router.push('movies/top-rated')"></i></label>
      <Carousel :settings="settings" :autoplay="20000" :breakpoints="breakpoints">
        <Film class="mb-5" v-for="film in ratedFilms" :key="film.id" :film="film" :genre_ids="film.genre_ids"
          :POSTER_URL="this.POSTER_URL">
        </Film>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>

      <label for="" class="fs-1 mb-3">Upcoming films<i class="fa fa-calendar" aria-hidden="true"
          @click="$router.push('movies/upcoming')"></i></label>
      <Carousel :settings="settings" :autoplay="20000" :breakpoints="breakpoints">
        <Film class="mb-5" v-for="film in upcomingFilms" :key="film.id" :film="film" :genre_ids="film.genre_ids"
          :POSTER_URL="this.POSTER_URL">
        </Film>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>

      <label for="" class="fs-1 mb-3">Looking now
        <i class="fa fa-eye" aria-hidden="true" @click="$router.push('movies/looking-now')"></i></label>
      <Carousel :settings="settings" :autoplay="30000" :breakpoints="breakpoints">
        <Film class="mb-5" v-for="film in nowFilms" :key="film.id" :film="film" :genre_ids="film.genre_ids"
          :POSTER_URL="this.POSTER_URL"></Film>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import Film from "@/components/Film.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  components: {
    Film,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      POSTER_URL: "https://image.tmdb.org/t/p/w200",
      popularFilms: [],
      nowFilms: [],
      ratedFilms: [],
      upcomingFilms: [],
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        580: {
          itemsToShow: 2.17,
          itemsToScroll: 2,
          transition: 500,
          snapAlign: "center",
        },
        770: {
          itemsToShow: 3,
          itemsToScroll: 2,
          transition: 500,
          snapAlign: "center",
        },
        990: {
          itemsToShow: 4,
          itemsToScroll: 2,
          transition: 500,
          snapAlign: "start",
        },
        1200: {
          mouseDrag: false,
          itemsToShow: 4.8,
          itemsToScroll: 2,
          transition: 500,
          snapAlign: "start",
        },
        1410: {
          mouseDrag: false,
          itemsToShow: 5.35,
          itemsToScroll: 2,
          transition: 500,
          snapAlign: "start",
        },
      },
    };
  },
  mounted() {
    this.popularFilms = this.$store.getters.allPopularMovies;
    this.nowFilms = this.$store.getters.allNowPlayingMovies;
    this.ratedFilms = this.$store.getters.allRatedMovies;
    this.upcomingFilms = this.$store.getters.allUpcomingMovies;
  },
  created() {
    document.body.style.setProperty("--background", `black`);
  },
};
</script>

<style scoped>
:root {
  --background: black;
}

.main {
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
}

i {
  color: var(--main-color-of);
  font-size: 30px;
  margin-left: 10px;
}
</style>
