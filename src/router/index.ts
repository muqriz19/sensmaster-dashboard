import { checkUserToken } from "@/shared/authenticate";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../layouts/Dashboard.vue";
import { routeGuard } from "./route-guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
    meta: {
      partOf: "login",
      title: "Login",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "/users",
        name: "users",
        component: () =>
          import(/* webpackChunkName: "users" */ "../views/UsersView.vue"),
        meta: {
          partOf: "users",
          title: "All Users",
          auth: true,
        },
      },
      {
        path: "/user/:id",
        name: "users-by-id",
        component: () =>
          import(
            /* webpackChunkName: "user-by-id" */ "../views/UserByIdView.vue"
          ),
        meta: {
          partOf: "users",
          title: "User",
          auth: true,
        },
      },
      {
        path: "/about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
        meta: {
          partOf: "about",
          title: "About",
          auth: true,
        },
      },
      {
        path: "/faq",
        name: "faq",
        component: () =>
          import(/* webpackChunkName: "faq" */ "../views/FaqView.vue"),
        meta: {
          partOf: "faq",
          title: "Faq",
          auth: true,
        },
      },
    ],
  },
  {
    path: "/",
    redirect: "/login",
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// check routes before entering
router.beforeEach(routeGuard);

export default router;
