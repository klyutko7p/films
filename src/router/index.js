import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import PopularPage from '@/pages/movie/PopularPage.vue'
import TopPage from '@/pages/movie/TopPage.vue'
import UpcomingPage from '@/pages/movie/UpcomingPage.vue'
import LookingNowPage from '@/pages/movie/LookingNowPage.vue'
import MoviePage from '@/pages/moviepage/MoviePage.vue'
import PersonPage from '@/pages/personpage/PersonPage.vue'
import CollectionPage from '@/pages/collectionpage/CollectionPage.vue'
import CreditsPage from '@/pages/creditspage/CreditsPage.vue'
import Search from '@/pages/Search.vue'
import GenrePage from '@/pages/GenrePage.vue'
import CompanyPage from '@/pages/CompanyPage.vue'
import SeeLaterPage from '@/pages/SeeLaterPage.vue'
import Error404 from '@/pages/Error404.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/see-later',
    name: 'see-later',
    component: SeeLaterPage,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/movies',
    name: 'popular',
    component: PopularPage,
  },
  {
    path: '/movies/top-rated',
    name: 'top',
    component: TopPage,
  },
  {
    path: '/movies/upcoming',
    name: 'upcoming',
    component: UpcomingPage,
  },
  {
    path: '/movies/looking-now',
    name: 'looking',
    component: LookingNowPage,
  },

  {
    path: '/movie/:id',
    name: 'movieById',
    component: MoviePage,
  },
  {
    path: '/person/:id',
    name: 'personById',
    component: PersonPage,
  },
  {
    path: '/collection/:id',
    name: 'collectionById',
    component: CollectionPage,
  },
  {
    path: '/credit/:id',
    name: 'creditsById',
    component: CreditsPage,
  },
  {
    path: '/genre/:id',
    name: 'genreById',
    component: GenrePage,
  },
  {
    path: '/company/:id',
    name: 'companyById',
    component: CompanyPage,
  },
    {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: Error404,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
