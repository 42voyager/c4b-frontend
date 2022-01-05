<template>
      <li><a class="active" href="#form-request">Solicite seu crédito</a></li>
      <li><a href="#information-section">Informações</a></li>
      <li><a href="#faq-section">FAQ</a></li>
</template>

.<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style scoped>
li:first-child {
  /* margin-right: auto; */
}

li {
  display: block;
  margin: 0 10px;
  padding: 0px;
}

li a {
  padding: 15px;
}

a:hover {
  color: #b29475;
}

.active:hover {
  background-color: #b29475;
  color: white;
  border-radius: 10px;
}

.active {
  color: #b29475;
}
</style>
