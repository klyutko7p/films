<template>
  <div>
    <div class="container" v-cloak data-aos="fade">
      <navbar></navbar>
      <div v-if="!isLoading">
        <router-view
          class="router-view animate__animated animate__fadeIn animate__fast"
        ></router-view>
      </div>
      <div
        class="text-center d-flex justify-content-center align-content-center mt-5"
        v-else
      >
        <div>
          <Loader></Loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Loader from "./components/Loader.vue";
import "animate.css";

export default {
  components: { Navbar, Loader },
  data() {
    return {
      isLoading: true,
    };
  },
  async created() {
    await this.$store.dispatch("fetchPopularMovies");
    await this.$store.dispatch("fetchRatedMovies");
    await this.$store.dispatch("fetchUpcomingMovies");
    await this.$store.dispatch("fetchNowPlayingMovies");
    await this.$store.dispatch("fetchPopularMovies");
    await this.$store.dispatch("fetchGenres");
    await this.$store.dispatch("getLanguages");
    this.isLoading = false;
  },
  mounted() {
    this.$store.commit("initializeVars");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mukta:wght@300&display=swap");
:root {
  --main-color-of: #f5c518;
  --add-color-of: #30343b;
}
* {
  font-family: "Mukta", sans-serif;
}

hr {
  color: var(--main-color-of) !important;
}

body {
  background: var(--add-color-of);
  color: white;
  font-family: "Nunito Sans", sans-serif;
}

::-webkit-scrollbar {
  width: 15px;
}

.router-view {
  background-color: var(--add-color-of) !important  ;
}

::-webkit-scrollbar-track {
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  background-color: #f9f9fd;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background: linear-gradient(180deg, #00c6fb, #ea006d);
}
</style>
