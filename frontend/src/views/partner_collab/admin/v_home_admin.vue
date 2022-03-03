
<template>
  <v-card
    max-width="1000"
    class="mx-auto ma-7"
  >
    <v-container class="pa-1">
    <v-row  class="mt-1" dense>
    

    <v-col cols="12" xl="10" sm="6" md="9">
    <v-alert
      class="mt-3 ml-2 mr-2"
      border="left"
      colored-border
      color="primary"
      elevation="2"
    >
        
    <v-btn class="ma-2" tile  color="#5C6BC0" @click="onClickMenu('/main_manu')" dark>
      <v-icon left>mdi-checkbox-multiple-blank</v-icon> 
      <b>Main Portal</b>
    </v-btn>
    
    <v-btn class="ma-2" tile  color="success" @click="onClickMenu('/pnc_quiz_list')">
      <v-icon left>mdi-checkbox-multiple-blank</v-icon> 
      <b>Content</b>
    </v-btn>

     <v-btn 
          class="ma-2" 
          tile 
          color="#F57C00" 
          dark
          @click="onClickMenu('/pnc_depart_list')">
           <v-icon left>mdi-account-box</v-icon> 
           <b>Course</b>
     </v-btn>

     <v-btn 
          class="ma-2" 
          tile 
          color="#0F3460" 
          dark
          @click="onClickMenu('/pnc_register')">
           <v-icon left>mdi-account-box</v-icon> 
           <b>User</b>
     </v-btn>



    </v-alert>
    </v-col>

    <v-col cols="12" xl="2" sm="6" md="3" >    
    <v-card
      class="mt-3 ml-2 mr-2"
    >
    
    <v-btn class="ma-2" tile  color="success"  @click="$router.go(-1)" small>
      <v-icon left>mdi-keyboard-return</v-icon> 
      <b>Back</b>
    </v-btn>
    </v-card>
    </v-col>


    </v-row>
    </v-container>

    <v-container>

      <v-row dense>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
		      	@click="onClickMenu(item.link)"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle class="mt-2 ml-3">
                    <h1>
                    <v-icon class="mdi-48px">{{item.icon}}</v-icon>
                    <font class="ma-1 ml-3">{{item.count}}</font>
                    </h1>
                </v-card-subtitle>
                
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <!-- <v-img :src="item.src"></v-img> -->
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card
            color="#0D47A1"
            dark
          >
         <div class="d-flex flex-no-wrap justify-space-between">
              <div>
            <v-card-title class="headline">Training Course</v-card-title>
              <v-card-subtitle class="mt-2 ml-3">
              <h1>
                <v-icon class="mdi-48px" >mdi-account-supervisor-circle-outline</v-icon>
                <font class="ma-1 ml-3">{{count_all_app}}</font>
               </h1>
              </v-card-subtitle>
            </div>
            <v-avatar
                class="ma-3"
                size="125"
                tile
              >
          </v-avatar>
          </div>
          </v-card>
        </v-col>
        
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import api from "@/services/api";

  export default {
	async  mounted () {

    if(!api.isLoggedInAdmin()){
      this.$router.push("/main_admin_login"); 
    }

    var data = [];
	  this.count_all_app =  await api.getReportCountAll()
      data = await api.getReportCountRole();
    
    if(data.length > 0 )
    {
      for(var i = 0 ; i < this.items.length ; i++){ 
        this.items[i].count   = data[i].count;
      }
    }

  	},
    data: () => ({
	  count_all_app: null ,
	  count_all_engineer: null ,
	  count_all_production: null ,
      items: [
         {
           color: '#1F7087',
           src: 'https://image.flaticon.com/icons/svg/2422/2422042.svg',
           title: 'PARTNER',
           count: null,
           link: "/d_engineer",
           icon: "mdi-file-table-outline"
         },
        // {
        //   color: '#434247',
        //   src: 'https://image.flaticon.com/icons/svg/2942/2942804.svg',
        //   title: 'Production',
        //   count: null,
        //   link: "/user_list_production"
        // },
      ],
    }),
    methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
  },
  }
</script>