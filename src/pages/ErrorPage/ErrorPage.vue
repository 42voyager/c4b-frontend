<template>
    <TheHeader>
        <template #menu-list>
            <NavBarMenuItems
                :listItems="ListItemsNavBarBankForm"/>
        </template>
    </TheHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import { ListItemsNavBarBankForm } from '@/config/variables'

export default defineComponent({
	components: {
		TheHeader
	},
	setup() {
		return {
			ListItemsNavBarBankForm
		}		
	},
})
</script>

<style scoped>

</style>
