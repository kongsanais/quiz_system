<template>
<v-container>

  <v-card flat>
    <v-row>

    <v-col cols="12">
      
     <v-alert
      color="primary"
      dark
      icon="mdi-camera-timer"
      border="left"
      prominent
    >
     <b> HR System </b>
    </v-alert>
    </v-col>

   <!-- Recruit online  -->
    <v-col   xs="12"  sm="12"  	md="12"  lg="2">
    <v-card
      elevation="12"
    >
      <v-list-item><b><v-icon class="mdi-48px">mdi-account-group-outline</v-icon> Recruit Online</b></v-list-item> 
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          dense
          rounded
        >
          <v-list-item
            v-for="item in recruit_item"
            :key="item.title"
            :to="item.link"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    </v-col>

    <!-- TSE  quiz  -->
    <v-col  xs="12"  sm="12"  	md="12"  lg="2" >
     <v-card
      elevation="12"
    >
      <v-list-item><b><v-icon class="mdi-48px">mdi-file-table-box-multiple-outline</v-icon>TSE Quiz</b></v-list-item> 
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          dense
          rounded
        >
          <v-list-item
            v-for="item in tse_quiz_item"
            :key="item.title"
            :to="item.link"
            link
          >

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>

        </v-list>
      </v-navigation-drawer>
    </v-card>
    </v-col>

     <!-- Partner Collab -->
    <v-col  xs="12"  sm="12"  	md="12"  lg="2" >
     <v-card
      elevation="12"
    >
      <v-list-item><b><v-icon class="mdi-48px">mdi-folder-text-outline</v-icon>Partner Collab</b></v-list-item> 
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          dense
          rounded
        >
          <v-list-item
            v-for="item in partner_collab"
            :key="item.title"
            :to="item.link"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    </v-col>
    </v-row>

  </v-card>
</v-container>
</template>

<script>
  import api from "@/services/api";
  export default {
  mounted() {
    // if (api.isLoggedIn()) {
    //   this.$router.push("/profile");
    // }

        if(!api.isLoggedInAdmin()){
      this.$router.push("/main_admin_login"); 
    }  
  },
    data () {
      return {
        recruit_item: [
          { title: 'Home', icon : 'mdi-home' , link : '/recruit/home'},
          { title: 'Dash Board', icon: 'mdi-view-dashboard'},
          { title: 'Register', icon: 'mdi-forum'},
          { title: 'User List', icon: 'mdi-format-line-weight' },
          { title: 'About', icon: 'mdi-information-outline' },
        ],
        tse_quiz_item: [
          { title: 'Dash Board', icon: 'mdi-view-dashboard'},
          { title: 'Quiz Management',icon: 'mdi-account-child-circle',link :'qtse_admin_home'},
          { title: 'Quiz Result' , icon : 'mdi-shield-check-outline'}
        ],
        partner_collab:[
          {title : 'Dash Board', icon: 'mdi-view-dashboard' },
          {title : 'Course Management', icon:'mdi-movie-edit-outline',link:'pnc_admin_home'}
        ]

      }
    },
  }
</script>

<style>
</style>
