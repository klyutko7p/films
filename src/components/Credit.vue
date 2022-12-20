<template>
  <div>
    <div style="padding: 20px">
      <img
        :src="IMG_URL + credit.profile_path"
        alt=""
        @click="$router.push(`/person/${credit.id}`)"
        loading="lazy"
        v-if="credit.profile_path"
      />
      <div v-else>
        <img
          src="@/assets/crew-wom.png"
          alt=""
          @click="$router.push(`/person/${credit.id}`)"
          loading="lazy"
        />
      </div>
      <h1
        class="fs-5 muted text-center"
        :title="credit.name"
        @click="$router.push(`/person/${credit.id}`)"
      >
        {{ credit.name }}
      </h1>
      <span
        class="text-muted fs-5 muted text-center mb-5"
        :title="credit.character"
      >
        {{ credit.character }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IMG_URL: "http://image.tmdb.org/t/p/w200",
    };
  },
  props: {
    credit: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
