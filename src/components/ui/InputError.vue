<template>
    <p>{{ msg.join(' ') }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { theme } from '@/config/styles'

/**
 * Component utilizado para mostrar os erros dos inputs
 * @prop {Array<String>} msg - Um array de strings contendo todas as 
 * mensagens de erro
 */
export default defineComponent({
    props: {
        msg: {
            type: Array as PropType<string[]>,
            required: true,
        },
    },
    setup() {
        return {
            theme
        }
    }
})
</script>

<style scoped>
p {
    font-size: 12px;
    color: v-bind('theme.colors.error');
    max-width: 300px;
    width: 100%;
    margin: 0;
    text-align: left;
}
</style>
