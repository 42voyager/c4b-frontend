<template>
    <TheHeader>
        <template #menu-list>
            <NavBarMenuItems
                :listItems="ListItemsNavBarBankForm"/>
        </template>
    </TheHeader>
    <div class="alert">
        <h1>Erro 400</h1>
        <h3>Página não encontrada</h3>
        <p><a href="/">Voltar para a home.</a></p>
    </div>
    <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import NavBarMenuItems from '@/components/common/NavBarMenuItems.vue'
import { ListItemsNavBarBankForm } from '@/config/variables'
import TheFooter from '@/components/layout/TheFooter.vue'

export default defineComponent({
    components: {
        TheHeader,
        NavBarMenuItems,
        TheFooter
    },
    setup() {
        return {
            ListItemsNavBarBankForm
        }
    },
})
</script>

<style scoped>
.alert {
    text-align: center;
    margin-top: 60px;
    padding-top: 60px;
    padding-bottom: 60px;
}
h1 {
    font-size: 72px;
}
h3 {
    font-size: 30px;
}
.wrapper-footer {
    position: fixed;
    bottom: 0;
}
@media (min-width: 768px) {
    .alert {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 50%);
    }
}
</style>
