<style>
.container {
 padding-right:15px;
 padding-left:15px;
 padding-top:0px;
 padding-bottom:0px;
 margin-right:auto;
 margin-left:auto
}
.container:after,
.container:before {
 display:table;
 content:" "
}
.container:after {
 clear:both
}
@media (min-width:768px) {
 .container {
  width:750px
 }
}
@media (min-width:992px) {
 .container {
  width:970px
 }
}
@media (min-width:1200px) {
 .container {
  width:1170px
 }
}
.v-application--wrap {
  min-height: 100px;
}
</style>

<template>
  <v-app>
  <div id="def-top">
    <!-- Write closure fall-back static file -->
    <!-- /ROOT/app/cls/WET/gcweb/v4_0_30/cdts/static/appTop-en.html -->
    <ul id="wb-tphp">
         <li class="wb-slc"><a class="wb-sl" href="#wb-cont">Skip to main content</a></li>
         <li class="wb-slc visible-sm visible-md visible-lg"><a class="wb-sl" href="#wb-info">Skip to "About this Web application"</a></li>
    </ul>
  <header class="gc-app">
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
  </header>
  </div>
  <!-- Write closure template -->
  <script>
    var defTop = document.getElementById("def-top");
    defTop.outerHTML = wet.builder.appTop({

      "appName": [{"text": "Corporations digital credential issuing app", "href": "#"}],
      "lngLinks": [{"lang": "fr",	"href": "french.html", "text": "Français"}]
    });
  </script>
    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>
