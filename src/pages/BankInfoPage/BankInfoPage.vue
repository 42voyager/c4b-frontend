<template>
    <TheHeader>
        <template #menu-list>
            <NavBarMenuItems
                :listItems="ListItemsNavBarBankForm"/>
        </template>
    </TheHeader>
    <TheFormBankInfo imageFileName="side-image-bank.jpg" />
    <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheFormBankInfo from '@/pages/BankInfoPage/TheFormBankInfo.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import NavBarMenuItems from '@/components/common/NavBarMenuItems.vue'
import { ListItemsNavBarBankForm } from '@/config/variables'

export default defineComponent({
    components: {
        TheFormBankInfo,
        TheHeader,
        TheFooter,
        NavBarMenuItems
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
