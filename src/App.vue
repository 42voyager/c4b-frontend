<template>
  <TheHeader />
  <Banner />
  <WrapperHighlights :title="titlePontoForte" />
  <TwoColumnSection imageFileName="side-img.jpg" />
  <InformationSection/>
  <FaqSection :faqs="faqs" />
  <TheFooter />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TheHeader from "@/components/layout/TheHeader.vue";
import Banner from "@/pages/LandingPage/Banner.vue";
import WrapperHighlights from "@/pages/LandingPage/WrapperHighlights.vue";
import TwoColumnSection from "@/pages/LandingPage/TwoColumnSection.vue";
import InformationSection from "@/pages/LandingPage/InformationSection.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import FaqSection from "@/pages/LandingPage/FaqSection.vue";
import { TitlePontoForte, Faqs } from "./config/variables";

@Options({
  components: {
    TheHeader,
    Banner,
    WrapperHighlights,
    TwoColumnSection,
    InformationSection,
    TheFooter,
    FaqSection,
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
.modal-header {
	text-align: center;
}
</style>
