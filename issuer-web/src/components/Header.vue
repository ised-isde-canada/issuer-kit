
<template>
  <v-app-bar app color="primary" dark absolute flat dense>
    <div class="container row">
      <div class="col-xs-12 col-sm-7">
        <h2 class="wb-inv">{{ issuerName }}</h2>
        <a class="app-name" href="#">{{ issuerName }}</a>
      </div>
      <div class="col-xs-12 col-sm-7">
        <div v-if="oidcUser">
          Signed in as {{ oidcUser.given_name }} {{ oidcUser.family_name }}
          <v-btn @click="signOutOidc" text>
            <span class="mr-2">Leave</span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </div>
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
