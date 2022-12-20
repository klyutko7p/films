<template>
  <div class="mt-5">
    <h1 class="text-center">Page with this URL doesn't exist</h1>
    <div class="d-flex align-items-center justify-content-center">
      <MyButton @click="$router.push('/')">To home</MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
export default { components: { MyButton } };
</script>

<style scoped></style>
