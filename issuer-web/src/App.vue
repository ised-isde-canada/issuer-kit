<template>
  <v-app>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>


<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "app",
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>
