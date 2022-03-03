<template>
 <v-container>
   <v-card>
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
            <v-icon left>mdi-shield-account</v-icon> <b>Admin</b>
          </v-btn>


          <v-btn
            class="ma-2"
            tile
            outlined
            color="primary"
            @click="dialog_addDepart = true"
          >
            <v-icon left>mdi-folder-multiple-plus-outline</v-icon> <b> Reg. Course </b>
          </v-btn>

          
        </v-alert>
        </v-col>


          <v-col cols="12" xl="1" sm="6" md="3" >    
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
        </v-card>


    <v-container> 
        <v-card>
        <v-data-table :search="search" :headers="headers" :items="itemsWithIndex">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar-title><v-icon> mdi-format-list-checkbox </v-icon> <b>Course List</b></v-toolbar-title>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-card-search-outline"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <!-- table tr section -->
            <template v-slot:item="{ item }">
              <tr class="mb-2">
                <td>{{ item.index + 1 }}</td>
                <td>{{ item.dep_name}}</td>
    
                <td>
                  <ul id="example-1">
                    <li v-for="(item,index) in item.dep_quiz" :key="index">
                      {{index+1}} ) {{ item.quiz_name }}
                    </li>
                  </ul>
               </td>

                <td>{{item.createdAt | formatDate}}</td>
                <td>                       

            <!-- <v-btn color="warning" class="mr-1"  fab  x-small>
              <v-icon>mdi-playlist-edit</v-icon>
            </v-btn> -->

            <v-btn color="error" @click="onClickRemoveDepart(item._id)" class="mr-1" fab x-small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>

               </td>
              </tr>
            </template>
      </v-data-table>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog_addDepart" hide-overlay persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"><v-icon>mdi-plus-circle-outline</v-icon> Course</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

                <v-col cols="12" xl="12" sm="6" md="12">
                  <v-text-field
                    v-model="depart_name"
                    label="Course Name"
                  >
                  </v-text-field>
                </v-col>


                <v-col cols="12" xl="12" sm="12" md="12">
                  <v-select
                    solo
                    label="Select Content"
                    item-text="quiz_name"
                    item-value="_id"
                    v-model="select_quiz"
                    :items="item_quiz"
                    multiple
                    chips
                  >
                  </v-select>
                </v-col>

                  

                 <v-col cols="12" xl="4" sm="6" md="12">
                        <label for="">Course Type</label>
                       <v-text-field v-model="course_type"  disabled>
                      </v-text-field>
                 </v-col>




            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" @click="dialog_addDepart = false" >
            <b>Close</b>
          </v-btn>
          <v-btn class="primary" text @click="saveDepart()"><b>SUBMIT</b></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
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
            <b>close</b>
          </v-btn>

          <v-btn
            class="primary"
            light
            text
            @click="onClickConto_delete()"
          >
            <b>Agree</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  data: () => ({
    m_depart_id : '',
    search: "",
    headers: [
      { text: "Index", value: "index" },
      { text: "Course Name", value: "" },
      { text: "Content List", value: ""},
      { text: "Reg Date", value: "" },
      { text: "Action", value: "" },
    ],
    depart_list:[],
    dialog_addDepart:false,
    depart_name:"",
    select_quiz:[],
    course_type:"PNC",
    item_quiz: [],    
    dialog_load: {
      status: false,
      title: "Message",
      text: "",
      sub_text: "",
      router: "",
    },
    dialog_messenger: {
      status: false,
      title: "Message",
      text: "Are you sure delete this Course ?",
      sub_text: "",
      router: "",
    },
  }),
  async mounted() {

    var depart_list =  await api.getDepartlist();
    depart_list =  depart_list.filter(function(depart_list) {
      return depart_list.dep_type == "PNC";
    });
    this.depart_list = depart_list

    
    var  data = await api.getAllQuizlist();
    this.item_quiz = data


  
  },
    methods: {
      onClickMenu(link)  {
      this.$router.push(link).catch((err) => {});
      },    
      async onClickRemoveDepart(depart_id){
    
      this.dialog_messenger.status = true ;  
      this.m_depart_id = depart_id ; 
      /*
      this.dialog_load.status = true
      const data = await api.removeDepart({depart_id})
      const depart_list =  await api.getDepartlist();
      if(depart_list){
        this.dialog_load.status = false
      }
      this.depart_list = depart_list 
      */
      },
      async onClickConto_delete(){

      this.dialog_load.status = true
      var depart_id =  this.m_depart_id;

      var data = await api.removeDepart({depart_id})
      var depart_list =  await api.getDepartlist();

      if(depart_list){
        this.dialog_load.status = false
      }

      depart_list =  depart_list.filter(function(depart_list) {
              return depart_list.dep_type == "PNC";
      });

      this.depart_list = depart_list

      this.dialog_messenger.status = false ; 

      },
      async saveDepart() {
        this.dialog_load.status = true
       let depart_name = this.depart_name
       let select_quiz =  this.select_quiz 
       let course_type =  this.course_type 
       
       const data = await api.addDepart({depart_name,select_quiz,course_type})
       this.dialog_addDepart = false

       var depart_list =  await api.getDepartlist();
       depart_list =  depart_list.filter(function(depart_list) {
            return depart_list.dep_type == "PNC";
        });
       this.depart_list = depart_list 

       const data_real = await api.getAllQuizlist();
       this.item_quiz = data_real

       if(data_real){
         this.dialog_load.status = false
       }

      }
  },
  computed: {
    itemsWithIndex() {
      return this.depart_list.map(
        (items, index) => ({
          ...items,
          index: index
        }))
    }
  }
}
</script>

<style>

</style>