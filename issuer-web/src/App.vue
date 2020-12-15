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

  <v-app-bar app color="primary" dark>
    <v-spacer></v-spacer>

    <div v-if="oidcUser">
      Signed in as {{ oidcUser.given_name }} {{ oidcUser.family_name }}
      <v-btn @click="signOutOidc" text>
        <span class="mr-2">Leave</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>


    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { Configuration } from "../models/appConfig";

@Component({
  computed: {
    ...mapGetters("oidcStore", ["oidcUser"])
  },
  methods: {
    ...mapActions("oidcStore", ["signOutOidc"])
  }
})
export default class Header extends Vue {
  @Prop() logoutUrl!: string;
  private issuerName = "";

  created() {
    const appConfig = this.$store.getters[
      "configuration/getConfiguration"
    ] as Configuration;
    this.issuerName = appConfig.app.issuer.name;
  }
}
</script>
