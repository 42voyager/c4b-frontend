<template>
  <header class="header">
    <div class="wrapper-logo">
      <a href="#"><img src="../assets/logo-abc.png" alt="Logo Banco ABC" /></a>
    </div>
    <button class="toggle-menu" v-on:click="onClicked()">
      <MenuButton />
    </button>
    <ul id="menu" class="nav-bar" v-bind:class="{ hidden: isCollapsed }">
      <li><a class="active" href="#form-request">Solicitar</a></li>
      <li><a href="#information-section">Informações</a></li>
      <li><a href="#faq-section">FAQ</a></li>
    </ul>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MenuButton from "./icons/MenuButton.vue";

@Options({
  props: {},
  components: { MenuButton },
})
export default class NavBar extends Vue {
  isCollapsed = true;

  onClicked() {
    this.isCollapsed = this.isCollapsed ? false : true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  padding: 7px 15px;
  background-color: #fff;
  align-items: center;
  z-index: 99;
}
.nav-bar {
  position: absolute;
  list-style-type: none;
  padding: 15px 5px;
  width: 100%;
  background-color: white;
  margin-left: -15px;
  margin-right: -15px;
  margin-top: 225px;
  margin-bottom: 0;
  z-index: 99999;
}
.hidden {
  display: none;
}
.wrapper-logo img {
  width: 60px;
}
li:first-child {
  /* margin-right: auto; */
}

li {
  display: block;
  margin: 0 10px;
  padding: 10px;
}

li a {
  padding: 10px;
}

a:hover {
  color: #b29475;
}

.active:hover {
  background-color: #b29475;
  color: white;
  border-radius: 2px;
}

.active {
  color: #b29475;
}
.toggle-menu {
  margin-left: auto;
  margin-right: 35px;
  background: none;
  border: none;
  width: 30px;
}
.toogle-menu svg {
  width: 60px;
}
@media (min-width: 768px) {
  .nav-bar {
    position: relative;
    display: flex;
    margin-top: 0;
    margin-left: auto;
    padding-right: 30px;
    padding-left: 30px;
    width: auto;
  }
  .wrapper-logo img {
    width: unset;
  }
  .toggle-menu {
    display: none;
  }
  li {
    padding: 0;
  }
}
</style>
