<template>
  <div>
    <button class="button-87" role="button">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.button-87 {
  margin: 10px;
  padding: 15px 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-image: linear-gradient(
    90deg,
    var(--main-color-of) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-87:hover {
  background-position: right center; /*
    change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
.button-87:active {
  transform: scale(0.95);
}
</style>
