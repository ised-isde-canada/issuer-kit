<style type="text/css">
  .content {
    padding: 25px;
  }
</style>

<template>
  <v-container fluid>
    <h2 class="text-center">Connect with Corporations Canada</h2>
    <v-card class="mx-auto my-2 lighten-4" max-width="800" outlined>
      <div class="content text-center">

      <p>
        Scan the QR code using your Trusted Digital Wallet to establish a
        connection to Corporations Canada.
      </p>

      <p>
        Once a connection is established and you present it on your digital wallet, it will issue you your {{successText}} and start the confirmation for your federal corporation relationship credential.
      </p>

      <v-progress-circular
        v-if="qrKey === 0"
        :indeterminate="true"
        rotate="true"
        size="32"
        width="4"
        color="secondary darken-2"
        class="mx-3"
      ></v-progress-circular>

      <QRCode v-if="qrKey > 0" :value="inviteURL" :width="width" :key="qrKey" />

      <div class="clearfix"></div>
        <v-btn color="secondary" :h="`didcomm://launch?d_m=${base64Invitation}`">
          <v-icon left light>fas fa-external-link-alt</v-icon>
          Open in a Trusted Digital Wallet
        </v-btn>

    </div>
      <v-divider class="mx-4"></v-divider>

      <v-container fluid>
        <v-row align="center" justify="space-between" class="mr-2">
          <v-col cols="6" md="2">
            <v-btn outlined color="secondary" :to="{ path: 'confirm-data' }"
              >Back</v-btn
            >
          </v-col>
          <v-col cols="6" md="2"> </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QRCode from "@/components/QRCode.vue";
import { Connection, ConnectionStatus } from "../models/connection";
import Axios, { CancelTokenSource } from "axios";
import { AppConfig, Configuration } from "../models/appConfig";

@Component({ components: { QRCode } })
export default class Connect extends Vue {
  private base64Invitation!: string;
  private inviteURL!: string;
  private width!: number;
  private qrKey = 0;
  private cancelTokenSource!: CancelTokenSource;
  private successText = "";

  created() {
    this.width = 300;
    this.base64Invitation = "Loading invite...";

    this.cancelTokenSource = Axios.CancelToken.source();

    this.$store
      .dispatch("connection/getNewConnection")
      .then((result: Connection) => {
        this.base64Invitation = btoa(JSON.stringify(result.invite));
        this.inviteURL =
          window.location.origin + "?c_i=" + this.base64Invitation;
        this.qrKey += 1; // force refresh of qrcode component
      });
  }

  mounted() {
    const appConfig = this.$store.getters[
      "configuration/getConfiguration"
    ] as Configuration;
    this.successText = appConfig.app.issuedSuccess.successText;
  }

  updated() {
    this.$store
      .dispatch("connection/waitForConnectionStatus", {
        status: [ConnectionStatus.RESPONSE, ConnectionStatus.ACTIVE],
        cancelToken: this.cancelTokenSource.token
      })
      .then(() => {
        this.$router.push({ path: "issue-credential" });
      });
  }

  beforeDestroy() {
    // cancelling pending requests, if any
    this.cancelTokenSource.cancel();
  }
}
</script>
