<template>
  <div>
    <input
      v-bind="$attrs"
      class="input-base"
      v-bind:class="{ invalid: isValid }"
      @input="onInput"
      :modelValue="formattedValue"
      ref="inputRef"
    />
    <div v-show="isValid">
      <InputError :msg="errors" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useCurrencyInput, CurrencyInputOptions } from "vue-currency-input";
import InputError from "@/components/ui/InputError.vue";
import { checkErrorsReturn } from "@/use/validInput";

/**
 * Component utilizado para input
 * @prop {Boolean} isValid - Condição para verficar se o input é válido
 * @prop {Array<String>} errors - Array de string contendo todos as mensagens de erros
 * @event inputEvent - Evento para quando algo é escrito no input
 */
export default defineComponent({
  components: {
    InputError,
  },
  props: {
    isValid: {
      type: Boolean,
      required: true,
    },
    errors: {
      type: Array as PropType<string[]>,
      required: true,
    },
    currencyOptions: {
      type: Object as PropType<CurrencyInputOptions>,
      required: true,
    },
  },
  emits: ["inputEvent"],
  setup(props, context) {
    const { inputRef, formattedValue } = useCurrencyInput(
      props.currencyOptions
    );
    /**
     * Função chamada para emitir um evento quando algo é escrito no input
     * @param {any} event - dados do evento recebido pelo input
     */
    function onInput(event: any) {
      context.emit("inputEvent", event.target.value);
    }
    return {
      checkErrorsReturn,
      onInput,
      inputRef,
      formattedValue
    };
  },
});
</script>

<style scoped>
.input-base {
  max-width: 100%;
  width: calc(100% - 30px);
  padding: 15px;
  font-size: 18px;
  margin: 10px 0;
  border-radius: 5px;
  border: solid 1px #b29475;
}
.btn-next {
  margin: 40px 20px;
  text-align: right;
}
</style>