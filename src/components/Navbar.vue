<template>
  <div class="navbar d-flex justify-content-between align-items-center">
    <img src="@/assets/logo_main.png" alt="" class="ms-3" style="max-width: 150px" @click="$router.push(`/`)" />
    <div class="burger-menu-btn me-5" @click="toggleBurger(this)">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="burger-menu">
      <nav class="d-block menu-of">
        <li @click="$router.push('/movies'), toggleBurger(this)">Popular</li>
        <li @click="$router.push('/movies/top-rated'), toggleBurger(this)">
          Top rated
        </li>
        <li @click="$router.push('/movies/upcoming'), toggleBurger(this)">
          Upcoming
        </li>
        <li @click="$router.push('/movies/looking-now'), toggleBurger(this)">
          Looking now
        </li>
        <li @click="$router.push('/see-later'), toggleBurger(this)">
          <i class="fa fa-bookmark me-2" aria-hidden="true"></i>
          {{ films.length }}
        </li>
        <li @click="$router.push('/search'), toggleBurger(this)">
          <i class="fa fa-search me-2" aria-hidden="true"></i>
          <span>Search</span>
        </li>
      </nav>
    </div>
    <ul class="menu-of-li">
      <li class="dropdown" style="opacity: 100">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2"
          data-bs-toggle="dropdown" aria-expanded="false">
          Movie
        </button>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
          <li @click="$router.push('/movies')">Popular</li>
          <li @click="$router.push('/movies/top-rated')">Top rated</li>
          <li @click="$router.push('/movies/upcoming')">Upcoming</li>
          <li @click="$router.push('/movies/looking-now')">Looking now</li>
        </ul>
      </li>
      <li @click="$router.push('/see-later')">
        <i class="fa fa-bookmark me-2" aria-hidden="true"></i>
        {{ films.length }}
      </li>
      <li @click="$router.push('/search')">
        <i class="fa fa-search me-2" aria-hidden="true"></i>
        <span>Search</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toggleBurger() {
      this.$el.querySelector(".burger-menu-btn").classList.toggle("active");
      this.$el.querySelector(".burger-menu").classList.toggle("active");
    },
  },
  computed: {
    films() {
      return this.$store.getters.getSeeLaterFilms;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: var(--main-color-of);
}

.menu-of-li {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  cursor: pointer;
  font-size: 50px;
  padding: 0 20px;
  transition: 0.5s;
}

.logo-icon:hover {
  opacity: 50%;
  transition: 0.5s;
}

li {
  list-style: none;
  display: inline-block;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  transition: 0.2s;
  font-weight: 500;
}

li:hover {
  opacity: 50%;
  transition: 0.2s;
}

.burger-menu-btn {
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 1000;
  overflow: hidden;
  display: none;
  cursor: pointer;
}

.burger-menu-btn span {
  width: 30px;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  transition: all 0.5s;
}

.burger-menu-btn span:nth-of-type(2) {
  top: calc(50% - 5px);
}

.burger-menu-btn span:nth-of-type(3) {
  top: calc(50% + 5px);
}

.burger-menu-btn.active span:nth-of-type(1) {
  display: none;
}

.burger-menu-btn.active span:nth-of-type(2) {
  top: 50%;
  transform: translate(-50%, 0%) rotate(45deg);
}

.burger-menu-btn.active span:nth-of-type(3) {
  top: 50%;
  transform: translate(-50%, 0%) rotate(-45deg);
}

.burger-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  padding: 15px;
  z-index: 999;
  background: var(--add-color-of);
  opacity: 95%;
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.burger-menu.active {
  transform: translateX(0);
}

.burger-menu li {
  list-style-type: none;
  font-size: calc(0.5em + 4vw);
  margin-bottom: 20px;
  opacity: 75%;
  color: rgb(250, 250, 250);
  transition: 0.2s;
  text-align: center;
}

.burger-menu li:hover {
  opacity: 100%;
  transition: 0.2s;
}

.burger-menu {
  display: none;
}

@media (max-width: 767px) {
  .menu-of-li {
    display: none;
  }

  .burger-menu-btn {
    display: block;
  }

  .burger-menu {
    display: inline-block;
  }

  .menu-of li {
    width: 100%;
    text-align: left;
  }
}
</style>
