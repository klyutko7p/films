<template>
  <div>
    <div class="add-info row row-cols-2 row-cols-md-6 text-center mb-5">
      <Credit
        v-for="credit in credits"
        :key="credit.id"
        :credit="credit"
        class="col"
      ></Credit>
      <div class="d-flex justify-content-center">
        <div
          style="width: 70px; height: 100px; border-radius: 20px"
          @click="$router.push(`/credit/${idCredit}`)"
          class="d-flex justify-content-center align-items-center mt-4 credits"
        >
          <h1 class="fs-5">
            View more <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Credit from "./Credit.vue";
export default {
  props: {
    credits: {
      type: Array,
      required: true,
    },
  },
  components: { Credit },
  computed: {
    idCredit() {
      let idCredit = this.$store.getters.getIdCredit;
      return idCredit;
    },
  },
};
</script>

<style scoped>
i {
  color: #e42659;
}

@media (max-width: 770px) {
  .credits {
  }
}
</style>
