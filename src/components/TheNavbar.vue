<template>
  <ul class="nav-bar">
    <li class="wrraper-logo"><a href="#"><img src="../assets/logo-abc.png" alt="Logo Banco ABC"></a></li>
    <li><a class="active" href="#two-column-section">Solicitar</a></li>
    <li><a href="#information-section">Informações</a></li>
    <li><a href="#faq-section">FAQ</a></li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    
  }
})
export default class NavBar extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  list-style-type: none;
  padding: 15px 5px;
  width: calc(100% - 60px);
  padding-right: 30px;
  padding-left: 30px;
  z-index: 999;
  background-color: white;
  margin: 0;
}

li:first-child {
  margin-right: auto;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a:hover {
  color: #b29475;
}

.active:hover {
  background-color:#b29475;
  color: white;
  border-radius: 2px;
}

.active {
  color: #b29475;
}

a {
  color: grey;
  text-decoration: none;
  padding: 10px;
}
</style>
