<template>
  <TheHeader />
  <Banner />
  <WrapperHighlights :pontosForte="pontosForte" />
  <TwoColumnSection imageFileName="side-img.jpg" />
  <InformationSection
    :infos="infos"
  />
  <FaqSection :faqsInfo="faqsInfo" />
  <ContactForm/>
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
import ContactForm from "@/pages/LandingPage/ContactSection.vue";
import { PontosForte, FaqsInfo, Infos} from "./config/variables";

@Options({
  components: {
    TheHeader,
    Banner,
    WrapperHighlights,
    TwoColumnSection,
    InformationSection,
    TheFooter,
    FaqSection,
    ContactForm
  },
})
export default class App extends Vue {
  pontosForte = PontosForte;
  faqsInfo = FaqsInfo;
  infos = Infos;
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
