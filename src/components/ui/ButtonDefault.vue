<template>
    <button v-bind="$attrs" v-on:click="onClick()">
        {{ msg }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { theme } from '@/config/styles'

/**
 * Component utilizado para inserir um botão
 * @prop {String} msg - Texto do botão
 * @event buttonClicked - Evento quando clica o botão
 */
export default defineComponent({
    props: {
        msg: {
            type: String,
            default: 'Submit',
        },
    },
    emit: ['buttonClicked'],
    inheritAttrs: false,
    setup(props, context) {
        function onClick(): void {
            context.emit('buttonClicked')
        }
        return {
            onClick,
            theme
        }
    },
})
</script>

<style scoped>
button {
    color: v-bind('theme.colors.primary.midlight');
    padding: 7px 30px;
    background-color: v-bind('theme.colors.white');
    border-radius: 10px;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid v-bind('theme.colors.primary.midlight');
}

button:hover {
    color: v-bind('theme.colors.white');
    background-color: v-bind('theme.colors.primary.midlight');
}
@media (min-width: 768px) {
    button {
        padding: 15px 40px;
        font-size: 18px;
    }
}
</style>