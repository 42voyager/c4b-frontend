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
