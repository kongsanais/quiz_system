import Vue from "vue";
import VueRouter from "vue-router";

// register 
import qtse_register from  "@/views/user_register/v_qtse_register.vue"
import pnc_register from  "@/views/user_register/v_pnc_register.vue"

// login 
import qtse_login from  "@/views/user_login/v_qtse_login.vue"

// menu 
import main_manu from  "@/views/menu/v_home.vue"
import main_admin_login from  "@/views/menu/v_login_admin.vue"

// dash 
import d_engineer from "@/views/DashBoard/d_engineer.vue"
import d_one_engineer from "@/views/DashBoard/d_one_engineer.vue"

//qtse
import qtse_admin_home  from "@/views/tse_quiz_app/admin/v_home_admin.vue"
import qtse_depart_list  from "@/views/tse_quiz_app/admin/v_depart_list.vue"
import qtse_quiz_list  from "@/views/tse_quiz_app/admin/v_quiz_list.vue"
import qtse_quiz_add  from "@/views/tse_quiz_app/admin/v_quiz_add.vue"
import qtse_quiz_show  from "@/views/tse_quiz_app/admin/v_quiz_show.vue"
import qtse_quiz_edit  from "@/views/tse_quiz_app/admin/v_quiz_edit.vue"
//pnc
import pnc_admin_home from  "@/views/partner_collab/admin/v_home_admin.vue"
import pnc_depart_list  from "@/views/partner_collab/admin/v_depart_list.vue"
import pnc_quiz_list  from "@/views/partner_collab/admin/v_quiz_list.vue"
import pnc_quiz_add  from "@/views/partner_collab/admin/v_quiz_add.vue"
import pnc_quiz_show  from "@/views/partner_collab/admin/v_quiz_show.vue"
import pnc_quiz_edit  from "@/views/partner_collab/admin/v_quiz_edit.vue"


// profile 
import qtse_profile  from "@/views/user_profile/v_qtse_profile.vue"
import user_doing_list from "@/views/user_quiz/user_doing_list.vue"
import user_start_quiz from "@/views/user_quiz/user_start_quiz.vue" 
import quiz_ans_history  from "@/views/user_quiz/quiz_ans_history.vue"


////recuiter  
import recu_home  from "@/views/Home_page/recruit.vue"
import recruiit_register  from "@/views/user_register/v_Register_Eng.vue"



Vue.use(VueRouter);
const routes = [
  // online test // 
  {
    path : '/recruit/register',
    name : 'recruiit_register',
    component :  recruiit_register ,
  },
  {
    path : '/recruit/home',
    name : 'recruiit_home',
    component :  recu_home ,
  },
  {
    path : "/quiz_ans_history/:quiz_id/:user_id",
    name : "quiz_ans_history",
    component : quiz_ans_history,
    props :true 
  },
  {
    path : "/user_start_quiz",
    name : "user_start_quiz",
    component : user_start_quiz,
    props :true 
  },
  {
    path: "/user_doing_list/:_id",
    name: "user_doing_list",
    component : user_doing_list
  },
  /* profile */
  { 
    path: "/qtse_profile",
    name: "qtse_profile",
    component:qtse_profile,
  },
  {   
    path: "/d_one_engineer/:_id",
    name: "d_one_engineer",
    component:d_one_engineer,
  },
  /* login */
  {
    path : "/qtse_login",
    name : "qtse_login",
    component : qtse_login
  },
  /* register */ 
  {
    path : "/qtse_register",
    name : "qtse_register",
    component : qtse_register 
  },
  {
    path : "/pnc_register",
    name : "pnc_register",
    component : pnc_register
  },
  /* dash */
  {
    path : "/d_engineer",
    name : "d_engineer",
    component : d_engineer 
  },
  /*main menu*/
  {
    path : "/main_admin_login",
    name : "main_admin_login",
    component : main_admin_login 
  },
  {
    path: "/main_manu",
    name: "main_manu",
    component: main_manu,
  },
  /*partner collab*/
  {
    path: "/pnc_admin_home",
    name: "pnc_admin_home",
    component : pnc_admin_home
  },  
  {
    path: "/pnc_depart_list",
    name: "pnc_depart_list",
    component : pnc_depart_list
  },
  {
    path: "/pnc_quiz_add",
    name: "pnc_quiz_add",
    component : pnc_quiz_add
  },
  {
    path: "/pnc_quiz_show",
    name: "pnc_quiz_show",
    component : pnc_quiz_show
  },
  {
    path: "/pnc_quiz_edit",
    name: "pnc_quiz_edit",
    component : pnc_quiz_edit
  },
  {
    path: "/pnc_quiz_list",
    name: "pnc_quiz_list",
    component : pnc_quiz_list
  },
  /* quiz tse */
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
