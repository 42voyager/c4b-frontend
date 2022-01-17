<template>
    <TheHeader>
        <template #menu-list>
            <NavBarMenuItems
                :creditRequest="'/#form-request'"
                :infoSection="'/#information-section'"
                :faqSection="'/#faq-section'"/>
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

export default defineComponent({
    components: {
        TheFormBankInfo,
        TheHeader,
        TheFooter,
        NavBarMenuItems
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
