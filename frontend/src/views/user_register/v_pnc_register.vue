<template>
  <v-container grid-list-xs>
    <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-toolbar flat color="primary" dark>
            <v-row>
              <v-col cols="11">
           <b>
           <v-icon class="ma-1">mdi-account-plus-outline </v-icon>
            Register ( Partner Collab )
           </b>
              </v-col>
              <v-col>
                          <v-btn class="ma-2" tile  color="success"  @click="$router.go(-1)" small>
            <v-icon left>mdi-keyboard-return</v-icon> 
            <b>Back</b>
          </v-btn>

              </v-col>
            </v-row>


        </v-toolbar>

        <v-tabs v-model="tab" vertical>
          <v-tab
            class="mr-2 d-none d-sm-flex disabledTab"
            v-for="tab in tabs"
            :key="tab.id"
            :href="tab.href_tab"
            exact
          >
            <v-icon left>{{ tab.icon }}</v-icon>
            {{ tab.name }}
          </v-tab>

          <v-tab-item value="tab-1" >
                                  <input
                              type="file"
                              style="display: none"
                              ref="inputUpload_img"
                              @change="onFile_img"
                              :rules="[(v1) => !!v1 || 'Please Upload Picture']"
                            />
            <v-card   flat>
              <v-card-text>

                <v-row>
                  <v-col class="d-flex" xl="3" lg="3" md="4" sm="12" cols="12">
                  <v-card class="mx-auto" width="230px" height="250px">
                    <img
                      v-if="imageURL"
                      :src="imageURL"
                      style="height: 250px; width: 230px;"
                    />
                    
                         <v-btn
                              class="mt-1 mr-2"
                              color="#"
                              @click="$refs.inputUpload_img.click()"
                              v-model="message_filename_pic"
                            small>
                              <!-- i-con in btn -->
                              <v-icon class="mr-2">mdi-cloud-upload</v-icon>
                              {{ message_filename_pic }}
                        </v-btn>

                  </v-card>
                  </v-col>

                  <v-col class="d-flex" xl="9" lg="6" md="4" sm="12" cols="12"> 
                  <v-row>

                      <v-col  class="d-flex" cols="4" >                       
                        <v-text-field
                          v-model="applicant.majoy_education"
                          label="Partner Name"
                          :rules="[(v1) => !!v1 || 'Please Enter Major']"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="6">
                          <!-- email -->
                          <v-text-field
                            v-model="applicant.email"
                            type="email"
                            label="Email"
                            :rules="[
                              (v1) => !!v1 || 'Email is required',
                              (v2) =>
                                !!/^(([^<>()[\]\\.,;:\s@\&quot;]+(\.[^<>()[\]\\.,;:\s@\&quot;]+)*)|(\&quot;.+\&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                                  v2
                                ) || 'Please Enter Email',
                            ]"
                          >
                          </v-text-field>
                      </v-col>


                      <v-col cols="2"></v-col>

                      <v-col cols="6">
                              <!-- password -->
                              <v-text-field
                                v-model="applicant.password"
                                label="Password"
                                min="15"
                                :append-icon="
                                  show_password ? 'mdi-form-textbox-password' : 'mdi-onepassword'
                                "
                                @click:append="show_password = !show_password"
                                :type="show_password ? 'password' : 'text'"
                                :rules="[
                                  (v1) => !!v1 || 'Password is Required'
                                ]"
                                required
                              />
                      </v-col>

                       <v-col cols="6">
                              <!-- password -->
                                  <v-text-field
                                  v-model="checkpassword"
                                  label="Confirm Password"
                                  min="15"
                                  :append-icon="
                                    show_password_con ? 'mdi-form-textbox-password' : 'mdi-onepassword'
                                  "
                                  @click:append="show_password_con = !show_password_con"
                                  :type="show_password_con ? 'password' : 'text'"
                                  :rules="[
                                    applicant.password === checkpassword ||
                                      'Password must match',
                                    (checkpassword) =>
                                      !!checkpassword || 'Pleace Enter your Password',
                                  ]"
                                  required
                                />
                      </v-col>

                        
                      <v-col cols="2">
                          <v-select
                            label="Prefix"
                            :items="data_eng_prefix"
                            v-model="applicant.eng_prefix"
                            :rules="[(v1) => !!v1 || 'Please Enter eng-prefix']"
                            outlined
                          ></v-select>
                      </v-col>

                      <v-col cols="4">
                            <v-text-field
                              v-model="applicant.eng_firstname"
                              label="Frist Name"
                              :rules="[(v1) => !!v1 || 'Please Enter  ENG First Name']"
                            >
                            </v-text-field>
                      </v-col>

                      <v-col cols="4">
                            <v-text-field
                              v-model="applicant.eng_lastname"
                              label="Last Name"
                              :rules="[(v1) => !!v1 || 'Please Enter ENG Last Name']"
                            >
                            </v-text-field>
                      </v-col>

                    <v-col class="d-flex" xl="4" lg="4" md="4" sm="12" cols="12">
                    <v-select
                      @change="get_content()"
                      v-model="applicant.job_position"
                      :items="data_position"
                      item-text="dep_name"
                      item-value="_id"
                      label="Select Course"
                      :rules="[(v1) => !!v1 || 'Please Select Position']"
                    >
                    </v-select>
                    <!-- {{applicant.job_position}} -->
                     </v-col>

                     <v-col class="d-flex" xl="4" lg="4" md="4" sm="12" cols="12" >
                                <v-card
                                  class="mx-auto"
                                  max-width="400"
                                  tile
                                >
                                <!-- {{data_content}} -->
                                 
                                   <v-simple-table dense>
                                    <template v-slot:default>
                                      <thead>
                                        <tr>
                                          <th class="text-left">
                                            Name
                                          </th>
                                          <th class="text-left">
                                            Calories
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr
                                          v-for="(item,index) in data_content"
                                          :key="item.name"
                                        >
                                          <td>{{ item.dep_quiz[index].quiz_name}}</td>
                                        </tr>
                                      </tbody>
                                    </template>
                                  </v-simple-table>


                                </v-card>
                     </v-col>

                      
                    </v-row>
                
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="success mr-3"
                    type="submit"
                  >
                    Submit
                  </v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>


        </v-tabs>
      </v-card>
    </v-form>

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

          <!-- <v-btn
            color="green darken-1"
            text
            @click="dialog_messenger.status = false"
          >
            Disagree
          </v-btn> -->

          <v-btn
            class="primary"
            light
            text
            @click="onClickMenu(dialog_messenger.router)"
          >
            Agree
          </v-btn>
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


  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  data: () => ({
    applicant: {
      email: "",
      password: "",
      th_prefix: "",
      th_firstname: "",
      th_lastname: "",
      eng_prefix: "",
      eng_firstname: "",
      eng_lastname: "",
      nationality: "",
      phone_number: "",
      phone_number_famaily: "",
      person_relationship: "",
      eng_address: "",
      //date_birthday: null,
      age: "",
      imageURL: null,
      resumeURL: null,
      job_level: null,
      job_position: "",
      job_salary: "", 
      degree_education:"",
      education:"",
      majoy_education:"",
      gpa:"",
      role:"Engineer"
    },
    checked_ac: false,
    data_th_prefix: ["นาย", "นาง", "นางสาว"],
    data_eng_prefix: ["Mr.", "Mrs.", "Miss"],
    degree_item: ["Bachelor Degree", "Master Degree" ,"Doctor Degree"],
    data_level: ["Office/Engineer", "Management"],
    data_position: [],
    show_password: true,
    show_password_con: true,
    valid: true,
    checkpassword: "",
    date_menu: false, //for date
    imageURL: "http://107.101.4.146:8081/img/2182242.8862f790.png",
    CountryList: ["Thailand"],
    message_filename_pic: "Upload Picture",
    message_filename_resume: " Upload Resume / CV",
    tab: "tab-1",
    tabs: [
      {
        id: 1,
        icon: "mdi-account",
        name: "FORM",
        href_tab: "#tab-1",
      },
      // {
      //   id: 2,
      //   icon: "mdi-clipboard-file-outline",
      //   name: "FORM 2",
      //   href_tab: "#tab-2",
      // },
    ],
    dialog_messenger: {
      status: false,
      title: "Message",
      text: "",
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
    data_content :[]
  }),
  async mounted(){
    var depart_list =  await api.getOnlydepart();
    console.log(depart_list)
    this.data_position = depart_list
  },
  methods: {
    DateToAge: function(bdate) {
      var today = new Date();
      var birthDate = new Date(bdate);
      var person_age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        person_age--;
      }
      //check value//
      if (person_age == 0 || person_age < 0) {
        person_age = 0;
      }
      this.applicant.age = person_age;
    },
    onFile_img(event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // for preview get img
        this.imageURL = event.target.result;
      };
      //get file size //
      var _size = event.target.files[0].size;
      var _name = event.target.files[0].name;
      var _file_type = _name.split(".").pop();
      var fSExt = new Array("Bytes", "KB", "MB", "GB"),
        i = 0;
      while (_size > 900) {
        _size /= 1024;
        i++;
      }
      var exactSize = Math.round(_size * 100) / 100 + " " + fSExt[i];
      //console.log("FILE SIZE = ", exactSize);
      //check file type and type file //
      //10mb
      if (_size < 10485760 && (_file_type == "png" || _file_type == "jpg" || _file_type == "jpeg" || _file_type == "PNG" || _file_type == "JPG")
      ) {
        reader.readAsDataURL(event.target.files[0]);
        // for upload
        this.applicant.imageURL = event.target.files[0];
        this.message_filename_pic = _name + "(" + exactSize + ")";
      } else {
        this.dialog_messenger.text = "Please Check Image Size and File Type";
        this.dialog_messenger.sub_text =
          "- Image Size < 10 mb <br> - Image Should be .PNG  .JPG   .JPEG ";
        this.dialog_messenger.status = true;

        this.applicant.imageURL = null;
      }
    },
    onFile_resume(event) {
      const reader = new FileReader();
      //get file size //
      var _size = event.target.files[0].size;
      var _name = event.target.files[0].name;
      var _file_type = _name.split(".").pop();
      var fSExt = new Array("Bytes", "KB", "MB", "GB"),
        i = 0;
      while (_size > 900) {
        _size /= 1024;
        i++;
      }
      var exactSize = Math.round(_size * 100) / 100 + " " + fSExt[i];
      //console.log("FILE SIZE = ", exactSize);
      //check file type and type file //
      if (_size < 10485760 && (_file_type == "pdf" || _file_type == "docx" || _file_type == "doc" ||  _file_type == "png" || _file_type == "PNG")) 
      {
        reader.readAsDataURL(event.target.files[0]);
        // for upload
        this.applicant.resumeURL = event.target.files[0];
        this.message_filename_resume = _name + "(" + exactSize + ")";
      } else {
        this.dialog_messenger.text = "Please Check Resume Size and File Type";
        this.dialog_messenger.sub_text =
          "- Resume Size < 10 mb <br> - Resume/CV Should be .PDF  .DOC   .DOCX  .PNG";
        this.dialog_messenger.status = true;
        this.applicant.resumeURL = null;
      }
    },
    changeTab(tabString) {
      this.tab = "tab-" + tabString;
    },
    onClickMenu(link) {
      this.dialog_messenger.status = false;
      if (link == "/login") {
        this.$router.push(link).catch((err) => {});
      }
    },
    async submit() {


      var check = this.$refs.form.validate();

      if (this.applicant.imageURL == null) 
      {
        check = false;
      } else {
        check = true;
      }
          
      if (check) {

        let formData = new FormData();
        
        await Object.keys(this.applicant).forEach((key) =>
           formData.append(key, this.applicant[key])
        );

          this.dialog_load.status = true;
        
        if (await api.register(formData)) {
          this.dialog_load.status = false;
          this.dialog_messenger.text  ="Register Complete" ;
          this.dialog_messenger.sub_text = "";
          this.dialog_messenger.status = true;
          this.dialog_messenger.router = "/login";
        } else {
          this.dialog_messenger.text = "Please Check Your E-mail is Used";
          this.dialog_messenger.sub_text = "";
          this.dialog_messenger.status = true;
        }


      } else {
        this.dialog_messenger.text = "Please Check Your Information";
        this.dialog_messenger.sub_text = "";
        this.dialog_messenger.status = true;
      }
    },
    async get_content(){
      var id = this.applicant.job_position;
      alert(id)
      var data = await api.getDoingquizID({id:id});
      this.data_content = data.Dep_list
    }
  },
  watch: {
    date_menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>

<style scoped>
.disabledTab {
  /* pointer-events: none; */
}
</style>
