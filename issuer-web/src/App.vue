<style>
.container {
 padding-right:15px;
 padding-left:15px;
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
</style>
<template>
  <v-app>


    <v-main>
      <router-view></router-view>
    </v-main>


  </v-app>
</template>
