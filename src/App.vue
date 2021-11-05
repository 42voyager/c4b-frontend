<template>
  <NavBar/>
  <Banner/>
  <WrapperHighlights title="Pontos fortes do produto" />
  <TwoColumnSection imageFileName="side-img.jpg"/>
  <InformationSection 
    imageFileName1="info-img1.jpg"
    imageFileName2="info-img3.jpg"
    imageFileName3="info-img4.jpg"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from './components/TheNavbar.vue';
import Banner from './components/Banner.vue';
import WrapperHighlights from './components/WrapperHighlights.vue';
import TwoColumnSection from './components/TwoColumnSection.vue'
import InformationSection from './components/InformationSection.vue'

@Options({
  components: {
    NavBar,
    Banner,
    WrapperHighlights,
    TwoColumnSection,
    InformationSection
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
