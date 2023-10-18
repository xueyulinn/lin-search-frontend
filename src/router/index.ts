import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/pages/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:category",
    name: "category",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
