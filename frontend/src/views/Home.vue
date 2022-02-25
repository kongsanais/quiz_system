<template>
  <div>

  </div>
</template>

<script>
  import api from "@/services/api";
  export default {
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/profile");
    }
  },
    data () {
      return {
        items: [
             {src: require('../assets/home-carousel/home_pic_box.jpg')}
        ],
      }
    },
  }
</script>

<style>
</style>
