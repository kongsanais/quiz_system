import Vue from "vue";
import VueRouter from "vue-router";
import qtse_admin_login from "@/views/tse_quiz_app/admin/v_login_admin.vue"
import qtse_admin_home  from "@/views/tse_quiz_app/admin/v_home_admin.vue"

Vue.use(VueRouter);
const routes = [
  ///tse quiz app 
   {
    path: "/qtse_admin_login",
    name: "qtse_admin_login",
    component: qtse_admin_login,
   },
   {
    path : "/qtse_admin_home",
    name : "qtse_admin_home",
    component: qtse_admin_home, 
   },
   {
    path: "/",
    redirect: "/qtse_admin_login"
   },
   {
    path: "*",
    redirect: "/qtse_admin_login"
   }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
