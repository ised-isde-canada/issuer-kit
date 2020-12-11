<template>
<div id="def-top">
  <!-- Write closure fall-back static file -->
  <!-- /ROOT/app/cls/WET/gcweb/v4_0_30/cdts/static/appTop-en.html -->
  <ul id="wb-tphp">
       <li class="wb-slc"><a class="wb-sl" href="#wb-cont">Skip to main content</a></li>
       <li class="wb-slc visible-sm visible-md visible-lg"><a class="wb-sl" href="#wb-info">Skip to "About this Web application"</a></li>
  </ul>
<div class="gc-app">
  <div id="wb-bnr" class="container">

    <div class="row">
      <div class="brand col-xs-5 col-md-4">
        <a href="https://www.canada.ca/en.html">
          <img src="https://www.canada.ca/etc/designs/canada/cdts/gcweb/v4_0_30/assets/sig-blk-en.svg" alt="" />
          <span class="wb-inv"> Government of Canada / <span lang="fr">Gouvernement du Canada</span></span>
        </a>
      </div>
    </div>
  </div>

  <div class="app-bar">
    <div class="container row">
      <div class="row">
        <!-- If you want to use the settings or sign in/out buttons then add col-sm-7 -->
        <section class="col-xs-12">
          <!-- Add in your application name and URL below -->
          <h2 class="wb-inv">Corporations digital credential issuing app</h2>
          <a class="app-name" href="#">Corporations digital credential issuing app</a>
        </section>
      </div>
    </div>
  </div>
</div>
</div>
  <v-app-bar app light>
    <div v-if="oidcUser">
      Signed in as {{ oidcUser.given_name }} {{ oidcUser.family_name }}
      <v-btn @click="signOutOidc" text>
        <span class="mr-2">Leave</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
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
