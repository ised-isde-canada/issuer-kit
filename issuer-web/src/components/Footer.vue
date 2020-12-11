<style scoped lang="scss"></style>

<template>
<div id="def-preFooter">
  <!-- Write closure fall-back static file -->
  <!-- /ROOT/app/cls/WET/gcweb/v4_0_30/cdts/static/preFooter-en.html -->
  <div class="pagedetails">
          <div class="row">
              <div class="col-sm-6 col-md-5 col-lg-4">
                  <a href="https://www.canada.ca/en/report-problem.html" class="btn btn-default text-center">Report a problem on this page</a>
              </div>
          </div>

          <dl id="wb-dtmd">
              <dt>Date modified: </dt>
              <dd><time property="dateModified">2019-03-01</time></dd>
          </dl>
      </div>

</div>
<!-- Write closure template -->
<script>
  var defPreFooter = document.getElementById("def-preFooter");
  defPreFooter.outerHTML = wet.builder.preFooter({

    "dateModified": "2017-08-01"
  });
</script>
</main>
<div id="def-footer">

<footer id="wb-info">
<div class="brand">
  <div class="container">
    <div class="row">
      <nav class="col-md-10 ftr-urlt-lnk">
        <h2 class="wb-inv">About this Web application</h2>
        <ul>
          <li><a href="https://www.canada.ca/en/contact.html">Contact information</a></li>
          <li><a href="https://www.canada.ca/en/transparency/terms.html">Terms and conditions</a></li>
          <li><a href="https://www.canada.ca/en/transparency/privacy.html">Privacy</a></li>
        </ul>
      </nav>
      <div class="col-xs-6 visible-sm visible-xs tofpg">
        <a href="#wb-cont">Top of Page <span class="glyphicon glyphicon-chevron-up"></span></a>
      </div>
      <div class="col-xs-6 col-md-2 text-right">
        <img src="https://www.canada.ca/etc/designs/canada/cdts/gcweb/v4_0_30/assets/wmms-blk.svg" alt="Symbol of the Government of Canada" />
      </div>
    </div>
  </div>
</div>
</footer>

</div>
<!-- Write closure template -->
<script>
var defFooter = document.getElementById("def-footer");
defFooter.outerHTML = wet.builder.appFooter({

  "showFeatures": false
});
</script>
<!-- Write closure template -->
<script>
document.write(wet.builder.refFooter({

  "isApplication": true
}));
</script>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Configuration } from "../models/appConfig";

@Component
export default class Footer extends Vue {
  private issuerName = "";

  created() {
    const appConfig = this.$store.getters[
      "configuration/getConfiguration"
    ] as Configuration;
    this.issuerName = appConfig.app.issuer.name;
  }
}
</script>
