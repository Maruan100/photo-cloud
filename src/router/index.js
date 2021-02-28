import Vue from "vue";
import VueRouter from "vue-router";
import AccessPage from "../views/AccessPage.vue";
import AlbumsPage from "../views/AlbumsPage.vue";
import AlbumDetailPage from "../views/AlbumDetailPage.vue";
import { Auth } from "aws-amplify";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AccessPage",
    component: AccessPage,
  },
  {
    path: "/albums",
    name: "AlbumsPage",
    component: AlbumsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/album/:id",
    name: "AlbumDetailPage",
    component: AlbumDetailPage,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = JSON.parse(localStorage.getItem('authData'))

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    if (isAuthenticated && to.name === "AccessPage") {
      next("/albums");
    }
    next();
  }
});

export default router;
