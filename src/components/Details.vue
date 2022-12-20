<template>
  <span class="something" :title="something.english_name || something.name">
    {{ something.name }}
  </span>
</template>

<script>
export default {
  props: {
    something: {
      type: Object,
      required: true,
    },
  },

  created() {},
};
</script>

<style scoped>
.something {
  margin-right: 5px;
}

.something:hover {
  color: var(--main-color-of);
}
</style>
