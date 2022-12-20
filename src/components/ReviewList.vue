<template>
  <div>
    <h1 v-if="reviews.length > 0">
      User reviews - {{ reviews.length }}
      <i class="fa fa-user-circle" aria-hidden="true"></i>
      <div class="progress mb-5">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated bg-warning"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: 100%"
        ></div>
      </div>
    </h1>
    <Review
      v-for="review in reviews"
      :key="review.id"
      :review="review"
    ></Review>
  </div>
</template>

<script>
import Review from "./Review.vue";
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  components: { Review },
};
</script>

<style scoped>
i {
  color: var(--main-color-of);
}
</style>
