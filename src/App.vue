<template>
  <NavBar/>
  <Banner/>
  <WrapperHighlights :title="titlePontoForte" />
  <TwoColumnSection imageFileName="side-img.jpg"/>
  <InformationSection 
    imageFileName1="info-img1.jpg"
    imageFileName2="info-img3.jpg"
    imageFileName3="info-img4.jpg"
  />
  <TheFooter/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from './components/TheNavbar.vue';
import Banner from './components/Banner.vue';
import WrapperHighlights from './components/WrapperHighlights.vue';
import TwoColumnSection from './components/TwoColumnSection.vue';
import InformationSection from './components/InformationSection.vue';
import TheFooter from './components/TheFooter.vue';
import { TitlePontoForte } from './text/variables';

@Options({
  components: {
    NavBar,
    Banner,
    WrapperHighlights,
    TwoColumnSection,
    InformationSection,
    TheFooter
  },
})
export default class App extends Vue {
  titlePontoForte = TitlePontoForte;
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
