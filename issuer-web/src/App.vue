<style>
.container {
 padding-right:15px;
 padding-left:15px;
 padding-top:0px;
 padding-bottom:0px;
 margin-right:auto;
 margin-left:auto
}
.container:after,
.container:before {
 display:table;
 content:" "
}
.container:after {
 clear:both
}
@media (min-width:768px) {
 .container {
  width:750px
 }
}
@media (min-width:992px) {
 .container {
  width:970px
 }
}
@media (min-width:1200px) {
 .container {
  width:1170px
 }
}
.v-application--wrap {
  min-height: 100px;
}
</style>

<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "app",
  components: {
    Header
  },
  data() {
    return {};
  }
};
</script>
