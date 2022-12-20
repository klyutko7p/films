<template>
  <div v-cloak class="main-see">
    <div v-if="films.length > 0">
      <h3 style="text-align: right" class="mb-5">
        This is your "See Later" films
        <i
          class="fa fa-bookmark ms-3"
          aria-hidden="true"
          style="cursor: auto; font-size: 16px"
        ></i>
      </h3>
      <div>
        <div
          v-for="film in films"
          :key="film.id"
          class="film-container"
          data-aos="fade"
        >
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex">
              <div>
                <img
                  v-if="film.poster_path"
                  :src="POSTER_URL + film.poster_path"
                  alt=""
                  @click="$router.push(`/movie/${film.id}`)"
                />
                <img v-else src="@/assets/poster.png" alt="" />
              </div>
              <div>
                <h5
                  class="mt-3 title"
                  @click="$router.push(`/movie/${film.id}`)"
                >
                  {{ film.title }}
                </h5>

                <h5>
                  {{ getYearAndDayFromDate(film.release_date) }}
                </h5>
                <div class="d-flex genres">
                  <div
                    v-for="genre in film.genres.slice(0, 3)"
                    :key="genre.id"
                    class="me-3"
                  >
                    <h5 @click="$router.push(`/genre/${genre.id}`)">
                      {{ genre.name }}
                    </h5>
                  </div>
                </div>
                <div class="d-flex align-items-center remove">
                  <h5
                    @click="$store.dispatch('removeSeeLaterFilm', film)"
                    class="me-3 muted"
                  >
                    Remove from "See Later"
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <h4 class="text-center">
          At this moment you don't have any "See Later" film
        </h4>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <MyButton @click="$router.push(`/`)">Get to home</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import MyButton from "@/components/UI/MyButton.vue";
export default {
  data() {
    return {
      isLoading: false,
      POSTER_URL: "https://image.tmdb.org/t/p/w200",
      colorVote: "",
    };
  },
  methods: {
    removeDuplicates(data, key) {
      return [...new Map(data.map((item) => [key(item), item])).values()];
    },
    getYearAndDayFromDate(date) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
      });
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
  computed: {
    films() {
      let films = this.$store.getters.getSeeLaterFilms;
      return this.removeDuplicates(films, (item) => item.id);
    },
  },
  mounted() {
    document.body.style.setProperty("--background", `black`);
  },
  components: { Loader, MyButton },
};
</script>

<style scoped>
.title {
  transition: 0.2s;
  cursor: pointer;
}
.title:hover {
  transition: 0.2s;
  color: var(--main-color-of);
}
.main-see {
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  min-height: 1000px;
  padding: 40px;
}

.film-container {
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 40px;
  margin-bottom: 40px;
}

.film-container img {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-right: 20px;
  width: 100px;
}

.muted-overview {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
}

.remove {
  transition: 0.2s;
  cursor: pointer;
}
.remove:hover {
  transition: 0.2s;
  color: var(--main-color-of);
}

.genres {
  width: 100%;
}
.genres h5 {
  transition: 0.2s;
  cursor: pointer;
}

.genres h5:hover {
  transition: 0.2s;
  color: var(--main-color-of);
}
</style>
