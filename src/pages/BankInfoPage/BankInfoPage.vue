<template>
	<TheHeader />
	<TheFormBankInfo />	
	<TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TheFormBankInfo from '@/pages/BankInfoPage/TheFormBankInfo.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

export default defineComponent({
	components: {
		TheFormBankInfo,
		TheHeader,
		TheFooter
	},
	setup() {
		const router = useRouter()
		const route = useRoute()

		console.log(route.params.id) // c4b/bankInfo/2345255436
		return {}	
	}
})
</script>
