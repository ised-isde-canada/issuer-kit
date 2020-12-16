<style scoped></style>

<template>
  <h2 class="text-center">Enter your information</h2>
  <DataCollection />
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import DataCollection from "@/components/DataCollection.vue";

@Component({ components: { DataCollection } })
export default class DataEntry extends Vue {}
</script>
