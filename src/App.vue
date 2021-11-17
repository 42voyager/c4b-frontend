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
  <FaqSection :faqs="faqs"/>
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
import FaqSection from './components/FaqSection.vue';
import { TitlePontoForte, Faqs } from './text/variables';

@Options({
  components: {
    NavBar,
    Banner,
    WrapperHighlights,
    TwoColumnSection,
    InformationSection,
    TheFooter,
    FaqSection
  },
})
export default class App extends Vue {
  titlePontoForte = TitlePontoForte;
  faqs = Faqs;
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
