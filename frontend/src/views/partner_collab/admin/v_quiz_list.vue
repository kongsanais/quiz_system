<template>
 <v-container>
   <v-card>

     <h2 class="ma-1">Partner Collab</h2>

    <v-container class="pa-1">
      <v-row class="mt-1" dense>

        <v-col cols="10">
         <v-alert
          class="mt-3 ml-2 mr-2"
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >

           <v-btn
            class="ma-2"
            tile
            outlined
            color="#6D8764"
            @click="onClickMenu('/pnc_admin_home')"
          >
             <v-icon left>mdi-shield-account</v-icon><b> Admin</b>
          </v-btn>

          <v-btn
            class="ma-2"
            tile
            outlined
            color="primary"
            @click="onClickMenu('/pnc_quiz_add')"
          >
            <v-icon left>mdi-folder-multiple-plus-outline</v-icon> <b> Add Content </b>
          </v-btn>
        </v-alert>
        </v-col>

        <v-col>
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
        <v-card>
        <v-data-table :search="search" :headers="headers" :items="itemsWithIndex">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar-title><v-icon> mdi-format-list-checkbox </v-icon><b> PNC Content List</b></v-toolbar-title>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-card-search-outline"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <!-- table tr section -->
            <template v-slot:item="{ item }">
              <tr class="mb-2">
                <td align="center" >{{ item.index + 1}}</td>
                <td align="center">
                   <v-img width="50" height="50"
                       src="../../../assets/y_vdo.png"
                       @click="show_vdo(item.quiz_vdo_url)"                   
                   >
                  </v-img>
                </td>
                <td align="center" >{{ item.quiz_name }}</td>
                <td align="center" >{{ item.quiz_type }}</td>
               <!-- <td>{{ item.quiz_time }}</td>-->
                <td align="center">

            <v-btn color="info" class="mr-1"  @click="onClickReviewTest(item._id)" fab x-small>
              <v-icon>mdi-view-day-outline</v-icon>
            </v-btn>
            
            <v-btn color="warning" class="mr-1"  @click="onClickEditQuiz(item._id)" fab  x-small>
              <v-icon>mdi-playlist-edit</v-icon>
            </v-btn>

            <v-btn color="error" class="mr-1" @click="dialog_messenger.status = true,qq_id=item._id" fab x-small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>

                </td>
              </tr>
            </template>
      </v-data-table>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog_messenger.status" persistent max-width="480">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ dialog_messenger.title }}
          <v-icon color="warning" class="mdi mdi-36px ml-2">
            mdi-alert-circle-outline
          </v-icon>
        </v-card-title>

        <v-card-text class="mt-3 pd-0">
          <h2 class="mb-3">{{ dialog_messenger.text }}</h2>
          <h3>
            <p><span v-html="dialog_messenger.sub_text"></span></p>
          </h3>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            @click="dialog_messenger.status = false"
          >
            close
          </v-btn>

          <v-btn
            class="primary"
            light
            text
            @click="onClickRemoveQuiz(qq_id)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-card>
  
    <v-dialog
      v-model="dialog_load.status"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
           Please Wait
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>


    <v-dialog
      v-model="d_show_vdo"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <v-icon>mdi-square-circle</v-icon>  Video 
        </v-card-title>

        <v-card-text>
                <LazyYoutube
                class="ma-1"
                ref="youtubeLazyVideo"
                :src="youtubeLink"
                aspect-ratio="16:9"
                thumbnail-quality="standard"
               />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            dark
            @click="d_show_vdo = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>





  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  async mounted() {
    
        if(!api.isLoggedInAdmin()){
      this.$router.push("/main_admin_login"); 
    }

     this.dialog_load.status = true
     var data = await api.getAllQuizlist();

      data =  data.filter(function(data) {
      return data.quiz_type == "Partner Collab";
      });
           
    if(data){
     this.dialog_load.status = false 
    }

     this.item_quiz = data;
  },
  data: () => ({
    qq_id:"",
    headers: [
      { text: "Index", value: "index",align: 'center'},
      { text: "VDO", value: "index",align: 'center',},
      { text: "Content Name", value: "quiz_name",align: 'center'},
      { text: "Content Type", value: "quiz_type",align: 'center'},
      { text: "Action", value: "",align: 'center'},
    ],
    item_quiz: [],
    search: "",
    dialog_review_test:false,
    dialog_messenger: {
      status: false,
      title: "Message",
      text: "Are you sure delete this quiz ?",
      sub_text: "",
      router: "",
    },
    dialog_load: {
      status: false,
      title: "Message",
      text: "",
      sub_text: "",
      router: "",
    },
    d_show_vdo : false,
    youtubeLink : ""
  }),
  methods: {
    show_vdo(link){
      this.d_show_vdo = true
      this.youtubeLink  = link
    },
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    onClickReviewTest(quiz_id){
      localStorage.setItem("quiz_id",quiz_id);
      this.$router.push({ name: 'pnc_quiz_show', params: {quiz_id:quiz_id}})
    },
    onClickEditQuiz(quiz_id){
      localStorage.setItem("quiz_id",quiz_id);
      this.$router.push({ name: 'pnc_quiz_edit', params: {quiz_id:quiz_id}})
    },
    async onClickRemoveQuiz(quiz_id){
      this.dialog_load.status = true
      const data = await api.removeQuiz({quiz_id})
      if(data.result === true ){
        this.dialog_load.status = false
        this.dialog_messenger.status  =  false 

        const data = await api.getAllQuizlist();
        this.item_quiz = data;

        
        location.reload();
      }
      
    }///remove quiz
    
  },
  computed: {
    itemsWithIndex() {
      return this.item_quiz.map(
        (items, index) => ({
          ...items,
          index: index
        }))
    }
  }
};
</script>
