<template>
      <li><a class="active" :href="creditRequest">Solicite seu crédito</a></li>
      <li><a :href="infoSection">Informações</a></li>
      <li><a :href="faqSection">FAQ</a></li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        creditRequest: {
            type: String,
            default: '#form-request'
        },
        infoSection: {
            type: String,
            default: '#information-section'
        },
        faqSection: {
            type: String,
            default: '#faq-section'
        }
    }
})
</script>

<style scoped>
li:first-child {
  /* margin-right: auto; */
}

li {
  display: block;
  margin: 7px 10px;
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
