<template>
  <NavBar/>
  <Banner/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from './components/Navbar.vue';
import Banner from './components/Banner.vue';
import ButtonDefault from './components/ButtonDefault.vue';

@Options({
  components: {
    NavBar,
    Banner,
    ButtonDefault,
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
