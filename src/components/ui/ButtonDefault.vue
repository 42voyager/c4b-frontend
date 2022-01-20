<template>
    <button v-bind="$attrs" v-on:click="onClick()">
        {{ msg }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
        }
    },
})
</script>

<style scoped>
button {
    color: #b29475;
    padding: 7px 30px;
    background-color: #fff;
    border-radius: 10px;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid #b29475;
}

button:hover {
    color: #fff;
    background-color: #b29475;
}
@media (min-width: 768px) {
    button {
        padding: 15px 40px;
        font-size: 18px;
    }
}
</style>