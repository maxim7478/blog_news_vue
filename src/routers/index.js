import HomePage from "@/views/HomePage.vue";
import ArticlePage from "@/views/ArticlePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Домашняя страница",
    component: HomePage,
  },
  {
    path: "/article/:id",
    name: "Статья",
    component: ArticlePage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

export default router;