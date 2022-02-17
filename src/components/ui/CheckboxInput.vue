<template>
    <div>
        <div class="wrapper-checkbox">
            <label :for="nameID" class="label-checkbox">
                <p v-if="labelMessage === ''">
                   <slot></slot>
                </p>
                <p v-if="labelMessage != ''">
                    {{ labelMessage }}
                </p>
                <input
                    :id="nameID"
                    type="checkbox"
                    class="checkbox-input"
                    v-bind="$attrs"
                    :value="modelValue"
                    @input="
                        $emit(
                            'update:modelValue',
                            Boolean($event.target.checked)
                        )
                    "
                    @change="$emit('change', $event.target.checked)"
                />
                <span class="checkmark"></span>
            </label>
            <div class="div-error" v-show="isInvalid">
                <InputError :msg="errors"/>
            </div>
        </div>
    </div>
</template>

/**
 * Componente de checkbox
 * @prop {String[]} messageError - Array de mensagens de erro
 * @prop {Boolean} modelValue - Variavel para salvar se o checkbox está
 * selecionado ou não
 * @prop {String} labelMessage - Label do checkbox, caso não passe nenhum
 * é possivel escreve dentro por causa do slot.
 */
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import InputError from '@/components/ui/InputError.vue'
import { checkErrorsReturn } from '@/use/validInput'

export default defineComponent({
    components: {
        InputError,
    },
    props: {
        isInvalid: {
            type: Boolean,
            default: false
        },
        errors: {
            type: Array as PropType<string[]> | undefined,
            default: () => {
                return ['']
            },
        },
        modelValue: {
            type: Boolean,
            required: true,
        },
        labelMessage: {
            type: String,
            default: '',
        },
        nameID: {
            type: String,
            required: true,
        },
    },
    inheritAttrs: false,
    setup() {
        return {
            checkErrorsReturn,
        }
    },
})
</script>

<style scoped>
.wrapper-checkbox {
    margin: 10px 0;
    width: 100%;
}
.wrapper-checkbox a {
    color: #977f66;
    text-decoration: underline;
}
.wrapper-checkbox a:hover {
    text-decoration: none;
}
.label-checkbox {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 13px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: white;
    border: solid 1px #b29475;
}
.label-checkbox:hover input ~ .checkmark {
    border-color: #977f66;
}
.label-checkbox:hover input:checked ~ .checkmark {
    border-color: #b29475;
}
.label-checkbox input:checked ~ .checkmark {
    background-color: #b29475;
}
.checkmark::after {
    content: '';
    position: absolute;
    display: none;
}
.label-checkbox input:checked ~ .checkmark::after {
    display: block;
}
.label-checkbox .checkmark::after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
</style>