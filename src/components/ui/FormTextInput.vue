<template>
    <div>
        <div class="wrapper-input">
            <label :for="name"
                :class="{ 'input-focus': inFocus || filled ? true : false}"
                >
                {{ label }}
            </label>
            <input
                :name="name"
                v-bind="$attrs"
                class="input-base"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @focus="focusInput"
                @blur="outFocusInput"
            />
        </div>
        <div class="div-error" v-show="isInvalid">
            <InputError :msg="errors" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import InputError from '@/components/ui/InputError.vue'
import { checkErrorsReturn } from '@/use/validInput'
import { theme } from '@/config/styles'

/**
 * Component utilizado para input de texto/numerico
 * @prop {Boolean} isInvalid - Condição para verficar se o input é válido
 * @prop {Array<String>} errors - Array de string contendo todos
 * as mensagens de erros
 * @event inputEvent - Evento para quando algo é escrito no input
 */
export default defineComponent({
    components: {
        InputError,
    },
    props: {
        isInvalid: {
            type: Boolean,
            default: false,
        },
        errors: {
            type: Array as PropType<string[]>,
            default: () => {
                return ['']
            },
        },
        name: {
            type: String,
            required: true
        },
        modelValue: {
            type: [String],
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
    },
    emits: ['inputEvent'],
    inheritAttrs: false,
    setup(props, context) {
        const inFocus = ref(false)
        const outFocus = ref(true)
        const filled = ref(false)
        /**
         * Função chamada para emitir um evento quando algo é escrito no input
         * @param {any} event - dados do evento recebido pelo input
         */
        function onInput(event: Event) {
            context.emit('inputEvent', (event.target as HTMLInputElement).value)
        }

        function changeFilled()
        {
            if (props.modelValue.length != 0)
                filled.value = true
            else
                filled.value = false
        }
        function focusInput() {
            inFocus.value = true
            outFocus.value = false
            changeFilled()
        }
        function outFocusInput() {
            inFocus.value = false
            outFocus.value = true
            changeFilled()
        }


        return {
            checkErrorsReturn,
            onInput,
            focusInput,
            outFocusInput,
            inFocus,
            outFocus,
            filled,
            theme
        }
    },
})
</script>

<style scoped>
.input-focus {
    top: 3px;
    color: v-bind('theme.colors.primary.midlight');
    font-size: 14px;
}

.wrapper-input {
    max-width: 100%;
    width: calc(100% - 30px);
    padding: 15px;
    padding-top: 10px;
    padding-bottom: 5px;
    font-size: 18px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    border-bottom: inset 2px v-bind('theme.colors.primary.midlight');
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: v-bind('theme.colors.white');
    position: relative;
}
label {
    position: absolute;
    top: 21px;
    left: 29px;
    z-index: 1;
}

.input-base {
    background: none;
    border: none;
    font-size: 18px;
    padding: 15px;
    outline: none;
    width: calc(100% - 30px);
    position: relative;
    z-index: 9;
}
.input-base:focus {
    background: none;
}

.wrapper-input:hover {
    background-color: v-bind('theme.colors.grays.lightest');
    border-bottom: inset 2px v-bind("theme.colors.primary.mid");
}
/* .input-base:hover::placeholder {
    font-size: 19px;
} */
.btn-next {
    margin: 40px 20px;
    text-align: right;
}
</style>