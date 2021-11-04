<template>
  <NavBar/>
  <Banner/>
  <WrapperHighlights title="Pontos fortes do produto" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from './components/TheNavbar.vue';
import Banner from './components/Banner.vue';
// import ButtonDefault from './components/ButtonDefault.vue';
import WrapperHighlights from './components/WrapperHighlights.vue';

@Options({
  components: {
    NavBar,
    Banner,
    // ButtonDefault,
	WrapperHighlights
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
