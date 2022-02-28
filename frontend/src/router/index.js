import Vue from "vue";
import VueRouter from "vue-router";

// menu 
import main_manu from  "@/views/menu/Home.vue"

import qtse_admin_login from "@/views/tse_quiz_app/admin/v_login_admin.vue"
import qtse_admin_home  from "@/views/tse_quiz_app/admin/v_home_admin.vue"
import qtse_depart_list  from "@/views/tse_quiz_app/admin/v_depart_list.vue"
import qtse_quiz_list  from "@/views/tse_quiz_app/admin/v_quiz_list.vue"
import qtse_quiz_add  from "@/views/tse_quiz_app/admin/v_quiz_add.vue"
import qtse_quiz_show  from "@/views/tse_quiz_app/admin/v_quiz_show.vue"
import qtse_quiz_edit  from "@/views/tse_quiz_app/admin/v_quiz_edit.vue"


Vue.use(VueRouter);
const routes = [
  ///tse quiz app
  {
    //main_manu
    path: "/main_manu",
    name: "main_manu",
    component: main_manu,
  },
  {
    path: "/qtse_quiz_edit",
    name: "qtse_quiz_edit",
    component: qtse_quiz_edit,
  },
  {
    path: "/qtse_quiz_show",
    name: "qtse_quiz_show",
    component: qtse_quiz_show,
  },
  {
    path: "/qtse_quiz_show",
    name: "qtse_quiz_show",
    component: qtse_quiz_show,
  },
  {
    path: "/qtse_quiz_add",
    name: "qtse_quiz_add",
    component: qtse_quiz_add,
  },
  {
    path: "/qtse_quiz_list",
    name: "qtse_quiz_list",
    component: qtse_quiz_list,
  },
  {
    path: "/qtse_depart_list",
    name: "qtse_depart_list",
    component: qtse_depart_list,
   },
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
