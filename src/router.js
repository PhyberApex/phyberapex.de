import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import CvLayout from './layouts/CvLayout.vue'

const HomePage          = () => import('./pages/HomePage.vue')
const AboutPage         = () => import('./pages/AboutPage.vue')
const ProjectsPage      = () => import('./pages/projects/ProjectsPage.vue')
const ProjectDetailPage = () => import('./pages/projects/ProjectDetailPage.vue')
const GamingPage        = () => import('./pages/interests/GamingPage.vue')
const VinylPage         = () => import('./pages/interests/VinylPage.vue')
const MiniaturesPage    = () => import('./pages/interests/MiniaturesPage.vue')
const CvEnPage          = () => import('./pages/cv/CvEnPage.vue')
const CvDePage          = () => import('./pages/cv/CvDePage.vue')

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '',                    component: HomePage,          meta: { sidebar: false } },
      { path: 'about',               component: AboutPage,         meta: { sidebar: false } },
      { path: 'projects',            component: ProjectsPage,      meta: { sidebar: 'projects' } },
      { path: 'projects/:slug',      component: ProjectDetailPage, meta: { sidebar: 'projects' } },
      { path: 'interests/gaming',    component: GamingPage,        meta: { sidebar: 'interests' } },
      { path: 'interests/vinyl',     component: VinylPage,         meta: { sidebar: 'interests' } },
      { path: 'interests/miniatures', component: MiniaturesPage,   meta: { sidebar: 'interests' } },
    ],
  },
  {
    path: '/cv',
    component: CvLayout,
    children: [{ path: '', component: CvEnPage }],
  },
  {
    path: '/lebenslauf',
    component: CvLayout,
    children: [{ path: '', component: CvDePage }],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})
