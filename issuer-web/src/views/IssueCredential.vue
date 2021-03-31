<style scoped lang="scss"></style>

<template>
  <v-container fluid>
    <h2 class="text-center">Issuing {{ successText }}</h2>
    <v-card class="mx-auto my-2 lighten-4" max-width="800" outlined>

      <v-container class="progress-steps mrgn-tp-md">
        <v-row>
          <v-col cols="12">
            <v-icon class="mx-3" color="success">fas fa-wifi</v-icon>
            Connected to Corporations Canada issuer agent
          </v-col>
        </v-row>
        <v-row v-if="!issued">
          <v-col cols="12">
            <v-progress-circular
              :indeterminate="true"
              rotate="true"
              size="24"
              width="4"
              color="secondary darken-2"
              class="mx-3"
            ></v-progress-circular>
            Credential offer sent. Waiting for you to accept it...
          </v-col>
        </v-row>
        <v-row v-if="issued">
          <v-col cols="12">
            <v-icon class="mx-3" color="success">fas fa-handshake</v-icon>
            You accepted the {{ successText }} offer.
          </v-col>
        </v-row>
        <v-row v-if="issued">
          <v-col cols="12">
            <v-icon class="mx-3" color="success">fas fa-check-circle</v-icon>
            Your {{ successText }}  has been issued to your wallet!
          </v-col>
        </v-row>
      </v-container>

      <v-divider class="mx-4" v-if="issued"></v-divider>

      <v-container fluid v-if="issued && !voflow ">
             <!-- <a class="btn btn-default pull-left" :href="corpcanUrl" aria-label="Next">MAYBE LATER</a>
            <a class="btn btn-success pull-right mrgn-bttm-md" :href="otherUrl" aria-label="Next">CONTINUE TO GET YOUR RELATIONSHIP CREDENTIAL</a> -->
             <p class="text-center text-success mrgn-bttm-md"><strong>You have now obtained all the necessary credentials in your wallet to use with authorized partners.</strong></p>
      </v-container>


    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios, { CancelTokenSource } from "axios";
import { Connection } from "../models/connection";
import { Credential } from "../models/credential";
import { AppConfig, Configuration } from "../models/appConfig";
import { sleep } from "../utils";
import { Invitation } from "../models/invitation";

@Component
export default class Connect extends Vue {
  private issued = false;
  private successText = "";
  private successLinks = new Array<any>();
  private cancelTokenSource!: CancelTokenSource;
  private idToken!: string;
  private otherUrl= "";
  private voflow = false;
  private corpcanUrl = "https://corporationscanada.ic.gc.ca/eic/site/cd-dgc.nsf/eng/home";

  created() {
    this.cancelTokenSource = Axios.CancelToken.source();
    this.idToken = this.$store.getters["oidcStore/oidcIdToken"];
  }

  mounted() {
    const appConfig = this.$store.getters[
      "configuration/getConfiguration"
    ] as Configuration;
    this.successText = appConfig.app.issuedSuccess.successText;
    this.successLinks = appConfig.app.issuedSuccess.links;
    if(this.successLinks.length > 1){
      this.voflow = true;
      const connectionForVR =  this.$store.getters[
        "connection/getConnection"
      ] as Connection;
      this.otherUrl = this.successLinks[1] + '?invite_token=' + localStorage.getItem("tokenOth")
      + '&connection=' + connectionForVR.id;
    }


    this.requestCredentialIssuance(appConfig.app).then(result => {
      this.handleIssueCredential(
        result.data.credential_exchange_id,
        appConfig.app
      ).then(() => {
        this.issued = true;
        this.$store.dispatch("oidcStore/signOutOidcSilent");
        localStorage.removeItem("issuer-invitation");
         
        if(this.voflow){
         setTimeout(() => window.location.replace(this.otherUrl), 2000);
        }

      });
    });
  }

  beforeDestroy() {
    // cancelling pending requests, if any
    this.cancelTokenSource.cancel();
  }



  async handleIssueCredential(credExId: string, config: AppConfig) {
    const retryInterceptor = Axios.interceptors.response.use(
      async response => {
        if (response.data.state === "credential_issued") {
          return response;
        } else {
          // retry every 500ms until the credential has not been issued
          await sleep(500);
          return Axios.request(response.config);
        }
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );

    return await Axios.get(
      `${config.apiServer.url}/credential-exchange/${credExId}`,
      {
        cancelToken: this.cancelTokenSource.token,
        headers: {
          authorization: `Bearer ${this.idToken}`
        }
      }
    ).finally(() => {
      Axios.interceptors.response.eject(retryInterceptor);
    });
  }

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async requestCredentialIssuance(config: AppConfig): Promise<any> {

    const credential = (await this.$store.getters[
      "credential/getCredential"
    ]) as Credential;

    const invitation = this.$store.getters[
      "invitation/getInvitation"
    ] as Invitation;

    if(localStorage.getItem("establishedConnectionId")){
      const data = {
        token: invitation.token,
        connection_id: localStorage.getItem("establishedConnectionId"), // eslint-disable-line @typescript-eslint/camelcase
        claims: credential.claims,
        schema_id: config.credentials?.schema_id // eslint-disable-line @typescript-eslint/camelcase
      };
      return Axios.post(`${config.apiServer.url}/credential-exchange/`, data, {
        cancelToken: this.cancelTokenSource.token,
        headers: {
          authorization: `Bearer ${this.idToken}`
        }
      });
    } else {
        const connection = (await this.$store.getters[
          "connection/getConnection"
        ]) as Connection;
        const data = {
        token: invitation.token,
        connection_id: connection.id, // eslint-disable-line @typescript-eslint/camelcase
        claims: credential.claims,
        schema_id: config.credentials?.schema_id // eslint-disable-line @typescript-eslint/camelcase
      };
      return Axios.post(`${config.apiServer.url}/credential-exchange/`, data, {
        cancelToken: this.cancelTokenSource.token,
        headers: {
          authorization: `Bearer ${this.idToken}`
        }
      });
    }
  }
}
</script>
