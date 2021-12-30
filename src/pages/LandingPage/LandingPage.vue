<template>
  <TheHeader />
  <Banner />
  <WrapperHighlights :title="titlePontoForte" />
  <TwoColumnSection imageFileName="side-img.jpg" />
  <InformationSection :infos="infos" :titleInfo="titleInfo" />
  <FaqSection :faqs="faqs" />
  <ContactForm />
  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Options, Vue } from 'vue-class-component'
import TheHeader from '@/components/layout/TheHeader.vue'
import Banner from '@/pages/LandingPage/Banner.vue'
import WrapperHighlights from '@/pages/LandingPage/WrapperHighlights.vue'
import TwoColumnSection from '@/pages/LandingPage/TwoColumnSection.vue'
import InformationSection from '@/pages/LandingPage/InformationSection.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import FaqSection from '@/pages/LandingPage/FaqSection.vue'
import ContactForm from '@/pages/LandingPage/ContactSection.vue'
import { TitlePontoForte, Faqs, Infos, TitleInfo } from '@/config/variables'

export default defineComponent({
  components: {
    TheHeader,
    Banner,
    WrapperHighlights,
    TwoColumnSection,
    InformationSection,
    TheFooter,
    FaqSection,
    ContactForm,
  },
  setup() {
    return {
      titlePontoForte: TitlePontoForte,
      faqs: Faqs,
      infos: Infos,
      titleInfo: TitleInfo,
    }
  },
})
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
