<template>
    <div class="div-error">
        <input
        v-bind="$attrs"
        class="input-base"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        />
        <div v-show="isInvalid">
            <InputError :msg="errors"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import InputError from '@/components/ui/InputError.vue'
import { checkErrorsReturn } from '@/use/validInput'

/**
 * Component utilizado para input de texto/numerico
 * @prop {Boolean} isInvalid - Condição para verficar se o input é válido
 * @prop {Array<String>} errors - Array de string contendo todos 
 * as mensagens de erros
 * @event inputEvent - Evento para quando algo é escrito no input
*/
export default defineComponent({
    components: {
        InputError
    },
    props: {
        isInvalid: {
            type: Boolean,
            default: false
        },
        errors: {
            type: Array as PropType<string[]>,
            default: () => { return (['']) },
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },
    emits: ['inputEvent'],
    inheritAttrs: false,
    setup(props, context) {
        /**
         * Função chamada para emitir um evento quando algo é escrito no input
         * @param {any} event - dados do evento recebido pelo input
         */
        function onInput(event: Event) {
            context.emit('inputEvent', (event.target as HTMLInputElement).value)
        }
        return {
            checkErrorsReturn,
            onInput
        }
    },
})
</script>

<style scoped>
.input-base {
    max-width: 100%;
    width: calc(100% - 30px);
    padding: 15px;
    font-size: 18px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    border-bottom: inset 2px #b29475;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.input-base:hover {
    background-color:rgb(255 255 255 / 80%);
    border-bottom: inset 2px #937454;
    /* box-shadow: 5px 5px 5px rgb(187 187 187 / 50%); */
}
/* .input-base:hover::placeholder {
    font-size: 19px;
} */
.btn-next {
    margin: 40px 20px;
    text-align: right;
}
</style>