<template>
	<TheHeader />
	<TheFormBankInfo />	
	<TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheFormBankInfo from '@/pages/BankInfoPage/TheFormBankInfo.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

export default defineComponent({
	components: {
		TheFormBankInfo,
		TheHeader,
		TheFooter
	}
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
