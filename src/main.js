import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'aos/dist/aos.css'
import AOS from 'aos'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

store.subscribe( (mutation, state) => {
    localStorage.setItem('seeLaterFilms', JSON.stringify(state.seeLaterFilms));  
})

export const app = createApp(App)
app.AOS = new AOS.init();

app.use(store).use(router).use(AOS).use(Toast, {position: POSITION.TOP_LEFT}).mount('#app')
