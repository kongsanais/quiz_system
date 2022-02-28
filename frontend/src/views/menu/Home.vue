<template>
<v-container>
  <v-card
    class="pa-12"
    color="indigo darken-2"
    flat
  >
    <v-row>

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
            v-for="item in items"
            :key="item.title"
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
            v-for="item in items"
            :key="item.title"
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

         <v-col  xs="12"  sm="12"  	md="12"  lg="2" >
     <v-card
      elevation="12"
    >
      <v-list-item><b><v-icon class="mdi-48px">mdi-file-table-box-multiple-outline</v-icon>Partner Collab</b></v-list-item> 
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          dense
          rounded
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
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
  },
    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
      }
    },
  }
</script>

<style>
</style>
