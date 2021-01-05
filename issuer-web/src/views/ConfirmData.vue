<style scoped lang="scss">

.claim-value {
  font-weight: bold;
}

label.v-label.theme--light {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
  top: 3px;
}

.v-icon {
  margin-bottom: 3px;
}

.v-application .mx-3.claim-value {
    margin-left: 0px !important;
    white-space: normal !important;
}
</style>

<template>
  <v-container fluid>
    <h2 class="text-center">Review and confirm</h2>
    <v-card class="mx-auto my-2 lighten-4" max-width="800" outlined>
      <v-list disabled>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in claims" :key="i">
            <v-list-item-content>
              <v-list-item-title>
                <v-row align="center" justify="space-around">
                  <v-col cols="4">
                    <span class="mx-3 claim-name">{{ item.title }}</span>
                  </v-col>
                  <v-col cols="2">
                    <v-icon small class="mx-3">fas fa-arrow-right</v-icon>
                  </v-col>
                  <v-col cols="4">
                    <span class="mx-3 claim-value">{{ item.value }}</span>
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-divider class="mx-4"></v-divider>

      <v-container fluid>
        <v-row align="center" justify="space-around">
          <v-col cols="1"></v-col>
          <v-col cols="10">
            <v-checkbox
              v-model="confirmed"
              color="success"
              label="I confirm that the above information is correct, and that I want to proceed."
            ></v-checkbox>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row align="center" justify="space-between" class="mr-2">
        <v-col cols="6" md="2">
        </v-col>
          <v-col cols="6" md="2">
            <v-btn
              color="success"
              :disabled="!confirmed"
              :to="{ path: 'connect' }"
              >Request credential</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Claim } from "../models/credential";

@Component
export default class ConfirmData extends Vue {
  private claims!: Array<Claim>;
  private confirmed = false;

  created() {
    const credential = this.$store.getters["credential/getCredential"];
    this.claims = credential.claims;
  }
}
</script>
