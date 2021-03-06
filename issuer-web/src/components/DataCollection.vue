<!-- Styles are NOT scoped to the component in order to override surveyJS defaults -->
<style lang="scss">
.claim-data-container {
  display: inline-block;
  width: 100%;
  text-align: justify;
}

.sv_body {
  border: none !important;
}

.sv_main .sv_container .sv_body .sv_nav .sv_complete_btn {
  background-color: var(--v-success-base);
  margin-bottom: 20px;
}
</style>

<template>
  <v-container fluid>
    <h2 class="text-center">{{ entity }} information</h2>

    <v-container>
      <p class="text-center text-success mrgn-bttm-md"><strong><v-html>{{ nowStartVR }}</v-html></strong></p>
    </v-container>

    <v-card class="mx-auto my-2 lighten-4" max-width="800" outlined>
      <v-container class="claim-data-container">
        <p class="text-center mrgn-tp-lg">If the data is incorrect, please call 1-800-345-1235 or email ic.corporationscanada.ic@canada.ca to fix any inconsistencies before continuing.</p>
        <survey :survey="survey" :key="surveyKey"></survey>
      </v-container>
    </v-card>
    <div id="surveyResult"></div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as SurveyVue from "survey-vue";
import { Credential, Claim } from "../models/credential";
import { mapGetters } from "vuex";
import { Invitation } from "../models/invitation";

@Component({
  computed: {
    ...mapGetters("oidcStore", ["oidcUser"])
  }
})
export default class DataCollection extends Vue {
  @Prop({ default: "default" }) private themeName!: string;
  private survey = new SurveyVue.Model();
  private surveyKey = 0;
  private entity = "";
  private nowStartVR = "";

  created() {
    SurveyVue.StylesManager.applyTheme(this.themeName);
    this.registerSurveyFunctions();
  }

  mounted() {
    const claimConfig = this.$store.getters["configuration/getConfiguration"]
      .claims;
    this.survey = new SurveyVue.Model(claimConfig);
    this.survey.completeText = "CONFIRM AND REQUEST CREDENTIAL";
    this.survey.onComplete.add(result => {
      const credentialClaims = new Array<Claim>();
      Object.keys(result.data).forEach(key => {
        credentialClaims.push({ name: key, value: result.data[key] });
      });
      this.$store.commit("credential/updateClaims", credentialClaims);
      //Go to next page on successful completion
      //Changes by H.N
      //In both cases we are bypassing confirm data as well
      //In case the connection has been established we are by bypassing
      //the connect as well
      //this.$router.push({ path: "confirm-data" });
    if(localStorage.getItem("establishedConnectionId")){
        this.$router.push({ path: "issue-credential" });
     }
    else {
        //'connect'
        this.$router.push({ path: "connect" });
     }
    });

    this.refreshSurvey();
  }

  private refreshSurvey(): void {
    const credential = this.$store.getters[
      "credential/getCredential"
    ] as Credential;
    if (credential !== undefined && credential.claims.length > 0) {
      // we are navigating back from the confirmation page, re-populate fields
      // TODO: disable fields that come from OIDC
      this.setExistingClaimValues(credential.claims);
    }
    // use values provided by OIDC token, if available
    // by doing this, any claim coming from OIDC will be disabled as well
    this.valuesFromToken(this.$store.getters["oidcStore/oidcUser"]);

    // if the user received an invite, use the values provided, if any
    this.valuesFromInvitation();

    this.surveyKey += 1;
  }

  // eslint-disable-next-line
  private valuesFromToken(values: { [key: string]: any }): void {
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        this.setField(key, value, true);
      });
    }
  }

  private valuesFromInvitation(): void {
    const invitation = this.$store.getters[
      "invitation/getInvitation"
    ] as Invitation;

    if(Object.prototype.hasOwnProperty.call(invitation.data, "relationship")) {
      this.entity = "Relationship";
      this.nowStartVR = "You successfully obtained your federal corporation credential!\nYou now must confirm your relationship to the corporation."
    }
    else {
      this.entity = "Organization";
    }
    if (invitation.data) {
      Object.entries(invitation.data).forEach(([key, value]) => {
        this.setField(key, value as string, true);
      });
    }
  }

  private setExistingClaimValues(claims: Claim[]): void {
    claims.forEach(claim => {
      this.setField(claim.name, claim.value);
    });
  }

  private setField(key: string, value: string, readonly = false): void {
    try {
      this.survey.getQuestionByName(key).setPropertyValue("value", value);
      this.survey.setValue(key, value);
      this.survey.getQuestionByName(key).readOnly = readonly;
    } catch (e) {
      // eslint-disable-next-line
      console.warn(
        `The provided key '${key}' is not a valid field and was skipped.`
      );
    }
  }

  private registerSurveyFunctions(): void {
    // eslint-disable-next-line
    // @ts-ignore: implicit any type
    const surveyFunctions = window["surveyFunctions"] || [];
    surveyFunctions.forEach((f: any) => {
      // eslint-disable-line
      SurveyVue.FunctionFactory.Instance.register(f.name, f);
    });
  }
}


</script>
