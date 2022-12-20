<template>
  <div class="main-search" v-cloak>
    <div class="">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default"
          >Search</span
        >
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Search movie, person, TV shows..."
          aria-label="Sizing example input"
          @keyup.enter="searchFunction(), (isLoading = true)"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <select
        class="form-select mb-3"
        aria-label="Default select example"
        v-model="filter"
        @change="searchFunction"
      >
        <option disabled value="multi" selected>Choose media type</option>
        <option>Multi</option>
        <option>Movie</option>
        <option>Collection</option>
        <option>Person</option>
        <option>TV</option>
      </select>

      <div class="d-flex justify-content-end mb-5">
        <my-button @click="searchFunction(), (isLoading = true)" style=""
          >Search</my-button
        >
      </div>
    </div>

    <div v-if="!isLoading">
      <div v-for="object in objects" :key="object.name">
        <div class="d-flex align-items-center mb-5 object-main">
          <div v-if="object.media_type">
            <img
              :src="IMG_URL + object.profile_path"
              loading="lazy"
              alt=""
              v-if="object.profile_path"
              @click="$router.push(`${object.media_type}/${object.id}`)"
            />
            <img
              :src="IMG_URL + object.poster_path"
              loading="lazy"
              alt=""
              v-if="object.poster_path"
              @click="$router.push(`${object.media_type}/${object.id}`)"
            />
            <img
              src="@/assets/poster.png"
              loading="lazy"
              alt=""
              v-if="!object.poster_path && !object.profile_path"
              @click="$router.push(`${object.media_type}/${object.id}`)"
            />
          </div>

          <div v-else>
            <img
              :src="IMG_URL + object.profile_path"
              loading="lazy"
              alt=""
              v-if="object.profile_path"
              @click="$router.push(`${this.filter.toLowerCase()}/${object.id}`)"
            />
            <img
              :src="IMG_URL + object.poster_path"
              loading="lazy"
              alt=""
              v-if="object.poster_path"
              @click="$router.push(`${this.filter.toLowerCase()}/${object.id}`)"
            />
            <img
              src="@/assets/poster.png"
              loading="lazy"
              alt=""
              v-if="!object.poster_path && !object.profile_path"
              @click="$router.push(`${this.filter.toLowerCase()}/${object.id}`)"
            />
          </div>

          <div class="ms-3">
            <div class="title-object muted-span" v-if="object.media_type">
              <span
                style="font-size: 24px"
                v-if="object.name && !object.poster_path"
                @click="$router.push(`${object.media_type}/${object.id}`)"
              >
                {{ object.name }}
              </span>
              <span
                style="font-size: 24px"
                v-if="object.name && object.poster_path"
                @click="$router.push(`/${object.media_type}/${object.id}`)"
              >
                {{ object.name }}
              </span>
              <span
                style="font-size: 24px"
                v-if="object.title"
                @click="$router.push(`${object.media_type}/${object.id}`)"
              >
                {{ object.title }}
              </span>
            </div>

            <div class="title-object muted-span" v-else>
              <span
                style="font-size: 24px"
                v-if="object.name && !object.poster_path"
                @click="
                  $router.push(`${this.filter.toLowerCase()}/${object.id}`)
                "
              >
                {{ object.name }}
              </span>
              <span
                style="font-size: 24px"
                v-if="object.name && object.poster_path"
                @click="
                  $router.push(`/${this.filter.toLowerCase()}/${object.id}`)
                "
              >
                {{ object.name }}
              </span>
              <span
                style="font-size: 24px"
                v-if="object.first_air_date"
                @click="
                  $router.push(`/${this.filter.toLowerCase()}/${object.id}`)
                "
              >
                {{ object.name }}
              </span>
              <span
                style="font-size: 24px"
                v-if="object.title"
                @click="
                  $router.push(`${this.filter.toLowerCase()}/${object.id}`)
                "
              >
                {{ object.title }}
              </span>
            </div>

            <h1
              v-if="object.release_date"
              style="font-size: 12px; color: antiquewhite"
            >
              {{ getYearAndDayFromDate(object.release_date) }}
            </h1>
            <h1
              v-if="object.known_for_department"
              style="font-size: 12px; color: antiquewhite"
            >
              {{ object.known_for_department }}
            </h1>
            <h1
              v-if="object.first_air_date"
              style="font-size: 12px; color: antiquewhite"
            >
              {{ getYearAndDayFromDate(object.first_air_date) }}
            </h1>
            <h1
              v-if="object.overview"
              class="muted-span"
              style="font-size: 16px"
            >
              {{ object.overview }}
            </h1>
            <div v-if="object.known_for" class="object-movie">
              <h1 v-for="movie in object.known_for" :key="movie.id">
                <h5 @click="$router.push(`/movie/${movie.id}`)">
                  {{ movie.title || movie.name }} ({{ movie.vote_average }})
                </h5>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div v-if="totalPages == 0">
        <h1 style="font-style: italic; font-size: 12px">
          Now there are no data that matched your query.
        </h1>
      </div>
    </div>

    <div v-if="isLoading" class="text-center">
      <div class="d-flex justify-content-center mt-5">
        <Loader></Loader>
      </div>
      <h1 class="fs-5 mt-3" style="font-style: italic" data-aos="fade">
        <span data-aos="fade">{{ text }}</span>
      </h1>
    </div>

    <div ref="observer"></div>
  </div>
</template>

<script>
import axios from "axios";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import MyButton from "../components/UI/MyButton.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: {
    MyButton,
    Loader,
  },
  data() {
    return {
      searchQuery: "",
      filter: "multi",
      objects: [],
      IMG_URL: "https://image.tmdb.org/t/p/w200",
      page: 0,
      totalPages: 0,
      isLoading: true,
      text: "",
      texts: [
        "«Mama always said life was like a box of chocolates. You never know what you're gonna get»",
        "«I'm the king of the world!»",
        "«Keep your friends close, but your enemies closer»",
        "«I'm going to make him an offer he can't refuse»",
        "«A man who doesn’t spend time with his family can never be a real man»",
        "«Houston, we have a problem»",
        "«There's no place like home»",
        "«After all, tomorrow is another day!»",
        "«I'll be back»",
        "«Elementary, my dear Watson»",
        "«The first rule of Fight Club is: You do not talk about Fight Club.»",
        "«Don’t ever let somebody tell you-you can’t do something, not even me. Alright? You dream, you gotta protect it»",
        "«Every man dies, but not every man really lives.»",
        "«Do, or do not. There is no “try”»",
        "«Enjoy every moment.»",
        "«When he stretches out his hand to catch the stars, he forgets about the flowers under his feet.»",
        "«Destroy what destroys you.»",
        "«Don't waste your time - life is made of it.»",
        "«Everyone is the creator of his own destiny.»",
        "«Remember who you are.»",
        "«The more you give, the more you love.»",
        "«You can't make your heart feel what it doesn't feel.»",
        "«Live without regrets.»",
        "«Love is finding someone you can't live without.»",
      ],
    };
  },
  methods: {
    getText() {
      for (let i = 0; i < this.texts.length; i++) {
        setInterval(() => {
          this.text = this.texts[i];
        }, 2000 * (i + 1));
      }
    },
    async loadMore() {
      this.page += 1;
      await axios
        .get(
          `https://api.themoviedb.org/3/search/${this.filter.toLowerCase()}?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US&query=${
            this.searchQuery
          }&include_adult=false`,
          {
            params: {
              page: this.page,
            },
          }
        )
        .then((result) => {
          this.totalPages = result.data.total_pages;
          this.objects = [...this.objects, ...result.data.results];
          this.isLoading = false;
        });
    },
    async searchFunction() {
      this.page = 1;
      await axios
        .get(
          `https://api.themoviedb.org/3/search/${this.filter.toLowerCase()}?api_key=a0620608f8e0ad4da9adb563a7f5a2d5&language=en-US&query=${
            this.searchQuery
          }&include_adult=false`,
          {
            params: {
              page: this.page,
            },
          }
        )
        .then((result) => {
          this.totalPages = result.data.total_pages;
          this.objects = result.data.results;
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
  },
  mounted() {
    document.body.style.setProperty("--background", `black`);
    this.getText();
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

<style scoped>
:root {
  --background: url();
  --background-col: url();
  --main-color: #eb2055;
}

body {
  background-image: var(--background);
}

.main-search {
  padding: 40px;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  min-height: 1000px;
}

.object-main {
  border-radius: 20px;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  height: 170px;
}

.object-main img {
  height: 170px;
  width: 113px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.object-movie h1 {
  transition: 0.2s;
  color: white;
  cursor: pointer;
}

.object-movie h1:hover {
  transition: 0.2s;
  color: var(--main-color-of);
}

.muted {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
}

.title-object span {
  transition: 0.2s;
  cursor: pointer;
}

.title-object span:hover {
  transition: 0.2s;
  color: var(--main-color-of);
}
</style>
