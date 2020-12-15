<template>
  <v-app>

  <div v-if="oidcUser">
    Signed in as {{ oidcUser.given_name }} {{ oidcUser.family_name }}
    <v-btn @click="signOutOidc" text>
      <span class="mr-2">Leave</span>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </div>

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
