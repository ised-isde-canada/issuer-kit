
<template>
  <v-app-bar app color="primary" dark absolute flat>
    <div class="container align-center">
    <div class="row">
      <div class="col-xs-12 col-sm-7">
        <h2 class="mrgn-tp-10">{{ issuerName }}</h2>
      </div>
      <div class="col-xs-12 col-sm-5 text-right mrgn-tp-10">
        <div v-if="oidcUser">
          Signed in as {{ oidcUser.given_name }} {{ oidcUser.family_name }}
          <v-btn @click="signOutOidc" text>
            <span class="mr-2">Leave</span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
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
