<template>
  <div class="movie-review" data-aos="fade">
    <div class="movie-review-user">
      <div class="d-flex align-items-center">
        <img
          :src="getURL(review.author_details.avatar_path)"
          alt=""
          class="movie-review-avatar"
          loading="lazy"
          v-if="review.author_details.avatar_path"
        />
        <img
          src="@/assets/crew-wom.png"
          alt=""
          loading="lazy"
          class="movie-review-avatar"
          v-else
        />
        <div class="review-author">
          <div class="review-author-details">
            <h1>{{ review.author }}</h1>
            <span
              v-if="review.author_details.rating"
              style="
                background-color: var(--main-color-of);
                border-radius: 20px;
                padding: 5px 10px;
                margin-left: 10px;
              "
              ><i class="fa fa-star" aria-hidden="true"></i>
              {{ review.author_details.rating }}</span
            >
          </div>
          <h1
            class="h5"
            style="color: rgb(189, 189, 189)"
            v-if="review.author_details.name"
          >
            {{ review.author_details.username }}
          </h1>
        </div>
      </div>
      <div class="movie-review-add">
        <h1>{{ getDate(review.created_at) }}</h1>
        <a target="_blank" :href="review.url">Check full review</a>
      </div>
    </div>

    <h1 class="content-comment" v-if="isActiveDetails">
      {{ review.content }}
    </h1>
    <div class="review-details-muted" v-if="review.content">
      <h3
        class="fs-5"
        @click="isActiveDetails = true"
        v-if="isActiveDetails === false"
      >
        Show review
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IMG_URL: "http://image.tmdb.org/t/p/w200",
      isActiveDetails: false,
    };
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getURL(url) {
      if (url.includes("https")) {
        return url.slice(1);
      } else return this.IMG_URL + url;
    },
    getDate(date) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.movie-review {
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 40px;
}

.movie-review-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.movie-review-avatar {
  border-radius: 50%;
  height: 5em;
  object-fit: cover;
  width: 5em;
}

.review-author {
  margin-left: 15px;
}

.review-author-details {
  display: flex;
  align-items: center;
}

.review-details-muted h3 {
  cursor: pointer;
  transition: 0.2s;
}

.review-details-muted h3:hover {
  color: var(--main-color-of);
  transition: 0.2s;
}

.content-comment {
  white-space: pre-wrap;
  font-size: 15px;
}

.movie-review-add h1 {
  font-size: 13px;
  color: rgb(189, 189, 189);
}

.movie-review-add a {
  font-size: 13px;
  text-decoration: none;
  color: rgb(189, 189, 189);
  transition: 0.2s;
}

.movie-review-add a:hover {
  color: var(--main-color-of);
  transition: 0.2s;
}

@media (max-width: 550px) {
  .movie-review-add h1 {
    display: none;
  }

  .movie-review-add a {
    display: none;
  }
}
</style>
