<template>
  <div class="main" v-if="!isLoading" v-cloak>
    <div>
      <div class="main-flex">
        <div class="main-img-flex">
          <div v-if="film.poster_path">
            <MyDialog v-model:show="dialogVisible">
              <img :src="POSTER_URL_BACK + film.poster_path" alt="" />
            </MyDialog>
            <img
              :src="POSTER_URL_BACK + film.poster_path"
              alt=""
              class="mb-3"
              style="width: 300px"
              @click="this.dialogVisible = true"
            />
            <span v-if="film.backdrop_path">
              {{ getImg(POSTER_URL_BACK, film.backdrop_path) }}
            </span>
            <span v-else>
              {{ getImg(POSTER_URL_BACK, film.poster_path) }}
            </span>
          </div>

          <div v-else>
            <img
              src="@/assets/poster_orig.png"
              loading="lazy"
              alt=""
              class="mb-3"
              style="width: 300px"
            />
          </div>
          <div class="main-content-img">
            <div class="main-vote-img">
              <span
                :style="{ backgroundColor: colorVote }"
                class="fs-1 me-3"
                style="padding: 5px 10px"
              >
                {{ getVote(film.vote_average) }}
              </span>

              <span style="font-size: 20px; color: #ffffff66">
                {{ film.vote_count }} votes.
              </span>
            </div>
            <div
              class="mt-4"
              v-for="video in videos
                .filter((video) => video.type == 'Trailer')
                .slice(0, 1)"
              :key="video.id"
            >
              <h1>Trailer:</h1>
              <a :href="YOUTUBE_URL_EMBED + video.key" target="_blank">
                <img
                  :src="IMG_URL_BACK + film.backdrop_path"
                  alt=""
                  style="width: 300px"
                />
              </a>
              <h1 style="font-size: 14px" class="mt-3">
                Official: <span>{{ video.official ? "Yes" : "No" }}</span>
              </h1>
              <h2 style="font-size: 14px; color: #ffffff66">
                {{ getYearAndDayFromDate(video.published_at) }}
              </h2>
            </div>
          </div>
        </div>

        <div class="main-info-ms">
          <div>
            <div class="main-info span-col-2">
              <h1 style="font-size: 35px">
                {{ film.title }}
                <span v-if="film.release_date"
                  >({{ getYearFromDate(film.release_date) }})</span
                >
                <i
                  class="fa-regular fa-bookmark ms-3"
                  v-if="!isBookmarked"
                  aria-hidden="true"
                  style="font-size: 12px"
                  @click="
                    $store.dispatch('getSeeLaterFilms', film),
                      (isBookmarked = true)
                  "
                ></i>
                <i
                  class="fa fa-bookmark ms-3"
                  aria-hidden="true"
                  style="font-size: 12px"
                  v-else
                  @click="
                    $store.dispatch('removeSeeLaterFilm', film),
                      (isBookmarked = false)
                  "
                ></i>
              </h1>
              <h2 style="font-size: 21px; color: #ffffff66">
                {{ film.original_title }} -
                <span :style="{ color: colorStatus }">
                  {{ getStatus(film.status) }}
                </span>
              </h2>
              <h2 class="fs-4" :class="{ muted: isActiveDetails === false }">
                {{ film.overview }}
              </h2>
              <div class="for-details" v-if="film.overview">
                <span
                  class="fs-5"
                  @click="isActiveDetails = true"
                  v-if="isActiveDetails === false"
                >
                  Show more
                </span>
                <span class="fs-5" @click="isActiveDetails = false" v-else>
                  Hide
                </span>
              </div>

              <!-- ABOUT -->
              <div class="about-film">
                <label for="" class="fs-1 mb-3">Details</label>
                <h1 class="text-muted grid-info" v-if="film.release_date">
                  Release date
                  <h1>{{ getYearAndDayFromDate(film.release_date) }}</h1>
                </h1>
                <div class="grid-info" v-if="countries">
                  <h1 class="text-muted">Country</h1>
                  <div
                    class="muted-div"
                    v-if="countries.filter((country) => country.name).length"
                  >
                    <h1
                      v-for="country in countries.slice(0, 2)"
                      :key="country.id"
                      class="text-muted me-3"
                    >
                      {{ country.name }}
                    </h1>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>

                <div class="grid-info">
                  <h1 class="text-muted">Genre</h1>
                  <div
                    class="muted-div"
                    v-if="genres.filter((genre) => genre.name).length"
                  >
                    <Details
                      v-for="genre in genres.slice(0, 3)"
                      :key="genre.id"
                      :something="genre"
                      class="mb-1"
                      @click="$router.push(`/genre/${genre.id}`)"
                    >
                    </Details>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>

                <h1 class="text-muted grid-info">
                  Tagline
                  <h1 v-if="film.tagline">"{{ film.tagline }}"</h1>
                  <h1 v-else class="mb-3">—</h1>
                </h1>

                <h1 class="text-muted grid-info">
                  Budget
                  <h1 v-if="film.budget">
                    ${{ new Intl.NumberFormat("en-US").format(film.budget) }}
                  </h1>
                  <h1 v-else class="mb-3">—</h1>
                </h1>

                <h1 class="text-muted grid-info">
                  Revenue
                  <h1 v-if="film.revenue">
                    ${{ new Intl.NumberFormat("en-US").format(film.revenue) }}
                  </h1>
                  <h1 v-else class="mb-3">—</h1>
                </h1>

                <h1 class="text-muted grid-info">
                  Runtime
                  <h1 v-if="film.runtime">
                    {{ film.runtime }} min. /
                    {{ getTimeFromMins(film.runtime) }}
                  </h1>
                  <h1 v-else class="mb-3">—</h1>
                </h1>

                <h1 class="text-muted grid-info" v-if="film.homepage">
                  Adult
                  <h1>
                    {{ film.adult == true ? "Yes" : "No" }}
                  </h1>
                </h1>

                <div class="grid-info">
                  <h1 class="text-muted">Director</h1>
                  <div
                    class="muted-div"
                    v-if="crews.filter((crew) => crew.job == 'Director').length"
                  >
                    <Details
                      v-for="crew in crews
                        .filter((crew) => crew.job == 'Director')
                        .slice(0, 3)"
                      :key="crew.id"
                      :something="crew"
                      @click="$router.push(`/person/${crew.id}`)"
                      class="mb-1"
                    >
                      >
                    </Details>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>

                <div class="grid-info">
                  <h1 class="text-muted">Screenplay, Writer</h1>
                  <div
                    class="muted-div"
                    v-if="
                      crews.filter(
                        (crew) =>
                          crew.job == 'Writer' || crew.job == 'Screenplay'
                      ).length
                    "
                  >
                    <Details
                      v-for="crew in crews
                        .filter(
                          (crew) =>
                            crew.job == 'Screenplay' || crew.job == 'Writer'
                        )
                        .slice(0, 3)"
                      :key="crew.id"
                      :something="crew"
                      @click="$router.push(`/person/${crew.id}`)"
                      class="mb-1"
                    >
                    </Details>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>

                <div class="grid-info">
                  <h1 class="text-muted">Producer</h1>
                  <div
                    class="muted-div"
                    v-if="crews.filter((crew) => crew.job == 'Producer').length"
                  >
                    <Details
                      v-for="crew in crews
                        .filter((crew) => crew.job == 'Producer')
                        .slice(0, 3)"
                      :key="crew.id"
                      :something="crew"
                      @click="$router.push(`/person/${crew.id}`)"
                      class="mb-1"
                    >
                    </Details>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>

                <div class="grid-info">
                  <h1 class="text-muted">Composer</h1>
                  <div
                    class="muted-div"
                    v-if="
                      crews.filter(
                        (crew) => crew.job == 'Original Music Composer'
                      ).length
                    "
                  >
                    <Details
                      v-for="crew in crews
                        .filter((crew) => crew.job == 'Original Music Composer')
                        .slice(0, 3)"
                      :key="crew.id"
                      :something="crew"
                      @click="$router.push(`/person/${crew.id}`)"
                      class="mb-1"
                    >
                    </Details>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>

                <div class="grid-info">
                  <h1 class="text-muted">Novel</h1>
                  <div
                    class="muted-div"
                    v-if="crews.filter((crew) => crew.job == 'Novel').length"
                  >
                    <Details
                      v-for="crew in crews
                        .filter((crew) => crew.job == 'Novel')
                        .slice(0, 3)"
                      :key="crew.id"
                      @click="$router.push(`/person/${crew.id}`)"
                      :something="crew"
                    >
                    </Details>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>

                <div class="grid-info">
                  <h1 class="text-muted">Companies</h1>
                  <div
                    class="muted-div"
                    v-if="companies.filter((company) => company.name).length"
                  >
                    <Details
                      v-for="company in companies.slice(0, 3)"
                      :key="company"
                      :something="company"
                      @click="$router.push(`/company/${company.id}`)"
                      class="mb-1"
                    >
                    </Details>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>
                <div class="grid-info">
                  <h1 class="text-muted">Language</h1>
                  <div
                    class="muted-div"
                    v-if="languages.filter((language) => language.name).length"
                  >
                    <h1
                      v-for="language in languages"
                      :key="language"
                      class="text-muted me-3"
                    >
                      {{ language.english_name }}
                    </h1>
                  </div>
                  <div v-else>
                    <h1 class="text-muted mb-3">—</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ADD -->
      <div v-if="film.belongs_to_collection" class="mt-5">
        <label for="" class="mb-5 fs-1"
          >Part of the {{ film.belongs_to_collection.name }}
          <i class="fa fa-address-book" aria-hidden="true"></i>
        </label>
        <div
          class="collection d-flex align-items-center"
          v-if="film.belongs_to_collection.backdrop_path"
          :style="{
            backgroundImage:
              'url(' +
              POSTER_URL_BACK +
              film.belongs_to_collection.backdrop_path +
              ')',
          }"
        >
          <my-button
            @click="
              $router.push(`/collection/${film.belongs_to_collection.id}`)
            "
          >
            View the collection
          </my-button>
        </div>
        <div
          class="collection d-flex align-items-center"
          v-else
          style="
            background-image: url('https://ae01.alicdn.com/kf/HTB1tBlYelbM8KJjSZFFq6yynpXaM/DIY-frame-tree-h-nh-tinh-3d-art-tinh-v-n-sky-sci-fi-h-nh.jpg_Q90.jpg_.webp');
          "
        >
          <my-button
            @click="
              $router.push(`/collection/${film.belongs_to_collection.id}`)
            "
          >
            View the collection
          </my-button>
        </div>
      </div>

      <div v-if="recommendations.length > 0" class="mt-5">
        <label for="" class="fs-1 mb-5"
          >Recommendations films<i
            class="fa fa-thumbs-up ms-3"
            aria-hidden="true"
          ></i>
        </label>

        <Carousel :settings="settings" :breakpoints="breakpoints">
          <Film
            class="mb-5"
            v-for="film in recommendations"
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

      <div>
        <div v-if="credits.length > 0">
          <label
            for=""
            class="fs-1 mb-5"
            @click="$router.push(`/credit/${idCredit}`)"
            >Cast and crew <i class="fa fa-users" aria-hidden="true"></i>
            <span class="text-muted ms-3 fs-3"
              >({{ credits.length + crews.length }})</span
            >
          </label>
          <div>
            <CreditList :credits="credits.slice(0, 11)"> </CreditList>
          </div>
        </div>
      </div>

      <div class="add-materials mb-5" v-if="videos.length">
        <label for="" class="fs-1 mb-5"
          >Trailers and additional materials
          <i class="fa fa-video-camera" aria-hidden="true"></i>
          <span class="text-muted fs-3 ms-3">
            ({{ videos.length }})</span
          ></label
        >
        <Carousel :settings="settings" :breakpoints="breakpoints">
          <div v-for="video in videos" :key="video.id" class="crew-main">
            <div class="me-5">
              <a :href="YOUTUBE_URL_EMBED + video.key" target="_blank">
                <img
                  :src="IMG_URL + film.backdrop_path"
                  alt=""
                  loading="lazy"
                />
              </a>
            </div>
            <a
              :href="YOUTUBE_URL_EMBED + video.key"
              target="_blank"
              style="text-decoration: none; color: white"
            >
              <h1
                class="fs-3 mt-3 muted-span"
                style="width: 200px"
                :title="video.name"
              >
                {{ video.name }}
              </h1></a
            >

            <span class="text-muted fs-5 muted">{{
              getYearAndDayFromDate(video.published_at)
            }}</span>
          </div>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>

      <div>
        <ReviewList :reviews="reviews"> </ReviewList>
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
import Loader from "../../components/Loader.vue";
import Details from "@/components/Details.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "./movie.css";
import Film from "@/components/Film.vue";
import MyButton from "../../components/UI/MyButton.vue";
import Review from "@/components/Review.vue";
import ReviewList from "@/components/ReviewList.vue";
import CreditList from "@/components/CreditList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";

export default {
  components: {
    Loader,
    Details,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Film,
    MyButton,
    Review,
    ReviewList,
    CreditList,
    MyDialog,
  },
  data() {
    return {
      YOUTUBE_URL_EMBED: "https://www.youtube.com/embed/",
      YOUTUBE_URL: "https://www.youtube.com/watch?v=",
      POSTER_URL: "https://image.tmdb.org/t/p/w200",
      POSTER_URL_MAIN: "https://image.tmdb.org/t/p/w300",
      POSTER_URL_BACK: "https://image.tmdb.org/t/p/original",
      IMG_URL: "http://image.tmdb.org/t/p/w200",
      IMG_URL_BACK: "http://image.tmdb.org/t/p/original",
      colorVote: "",
      colorStatus: "",
      isBookmarked: false,
      isLoading: true,
      isActiveDetails: false,
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
          itemsToShow: 5.35,
          itemsToScroll: 5,
          transition: 1000,
          snapAlign: "start",
        },
      },
    };
  },

  methods: {
    pushSimilar(id) {
      this.$router.push(`/movie/${id}`);
      changeUrl(id);
    },
    getTimeFromMins(mins) {
      let hours = Math.trunc(mins / 60);
      let minutes = mins % 60;
      return hours + "h. " + minutes + "m.";
    },
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
    getImg(url, poster) {
      document.body.style.setProperty("--background", `url(${url}${poster})`);
    },
    getImgCol(url, poster) {
      document.body.style.setProperty(
        "--background-col",
        `url(${url}${poster})`
      );
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
      } else if (vote < 8) {
        this.colorVote = "#73B85C";
      } else if (vote >= 8) {
        this.colorVote = "green";
      }
      return vote.toFixed(1);
    },
    getStatus(status) {
      if (status === "Rumored") {
        this.colorStatus = "gray";
        return status;
      }
      if (status === "Planned") {
        this.colorStatus = "gold";
        return status;
      }
      if (status === "In Production") {
        this.colorStatus = "73B85C";
        return status;
      }

      if (status === "Post Production") {
        this.colorStatus = "gold";
        return status;
      }
      if (status === "Released") {
        this.colorStatus = "green";
        return status;
      }
      if (status === "Canceled") {
        this.colorStatus = "red";
        return status;
      }
    },
  },
  async created() {
    await this.$store.dispatch("getCredits", this.$route.params.id);
    await this.$store.dispatch("getMovieById", this.$route.params.id);
    await this.$store.dispatch("getRecommendations", this.$route.params.id);
    await this.$store.dispatch("getReviews", this.$route.params.id);
    await this.$store.dispatch("getVideos", this.$route.params.id);
    this.isLoading = false;
  },
  computed: {
    film() {
      let film = this.$store.getters.getMovie;
      return film;
    },
    credits() {
      let credits = this.$store.getters.getCredits;
      return credits.map((credit) => credit);
    },
    crews() {
      let crew = this.$store.getters.getCrew;
      return crew.map((crew) => crew);
    },
    videos() {
      let videos = this.$store.getters.getVideos;
      return videos;
    },
    genres() {
      let film = this.$store.getters.getMovie;
      return film.genres;
    },
    companies() {
      let film = this.$store.getters.getMovie;
      return film.production_companies;
    },
    countries() {
      let film = this.$store.getters.getMovie;
      return film.production_countries;
    },
    recommendations() {
      let recommendations = this.$store.getters.getRecommendations;
      return recommendations;
    },
    reviews() {
      let reviews = this.$store.getters.getReviews;
      return reviews;
    },
    similars() {
      let similar = this.$store.getters.getSimilar;
      return similar;
    },
    languages() {
      let film = this.$store.getters.getMovie;
      return film.spoken_languages;
    },
    idCredit() {
      let idCredit = this.$store.getters.getIdCredit;
      return idCredit;
    },
  },
  beforeRouteUpdate() {
    setTimeout(() => {
      location.reload();
    }, 100);
  },
};
</script>

<style></style>