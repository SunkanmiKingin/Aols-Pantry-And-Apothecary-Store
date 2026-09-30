import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ProductLandingPage from '../pages/ProductLandingPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ContactPage from '../pages/ContactPage.vue';
import PrivacyPage from '../pages/PrivacyPage.vue';
import TermsPage from '../pages/TermsPage.vue';
import AdminPage from '../pages/AdminPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/landing/:slug',
    name: 'ProductLanding',
    component: ProductLandingPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: PrivacyPage,
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsPage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

export default router;
