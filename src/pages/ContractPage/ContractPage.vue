<template>
	<div>
		<TheHeader>
			<template #menu-list>
				<NavBarMenuItems
					:listItems="ListItemsNavBarBankForm"/>
			</template>
		</TheHeader>
		<TheContractContent />
		<TheFooter />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import NavBarMenuItems from '@/components/common/NavBarMenuItems.vue'
import TheContractContent from '@/pages/ContractPage/TheContractContent.vue'
import { ListItemsNavBarBankForm } from '@/config/variables'

export default defineComponent({
    components: {
        TheHeader,
        TheFooter,
        NavBarMenuItems,
        TheContractContent
    },
    setup() {
        return {
            ListItemsNavBarBankForm
        }
    }
})
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.modal-header {
  text-align: center;
}
</style>