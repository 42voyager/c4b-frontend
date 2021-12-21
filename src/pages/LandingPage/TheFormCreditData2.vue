<template>
  <div class="container-credit">
    <p class="creditLabel">De quanto seu negócio precisa</p>
    <FormCurrencyInput
      class="creditInput"
      placeholder="R$ 0,00"
      is-valid="true"
      :errors="[]"
      v-model="credit"
      :currencyOptions="currencyOptions"
      @inputEvent="
        (value) => {
          handleCreditChange(value)
        }
      "
    />
    <p class="creditLabel">Em quantas vezes você quer pagar?</p>
    <FormTextInput
      class="installmentInput"
      type="number"
      min="6"
      max="36"
      placeholder="Quantos meses"
      is-valid="true"
      :errors="[]"
      :value="installment.toString()"
      @inputEvent="
        (value) => {
          handleInstallmentsChange(value)
        }
      "
    />
    <InfoBox>
      <p>
        Faturamento mensual recomendado seria: <b> R$ {{ minIncome }} </b>
      </p>
    </InfoBox>
    <div class="btn-next">
      <ButtonDefault msg="Continuar" @buttonClicked="handleSubmit()" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { CurrencyInputOptions, CurrencyDisplay } from 'vue-currency-input'
import InfoBox from '@/components/ui/InfoBox.vue'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import FormCurrencyInput from '@/components/ui/FormCurrencyInput.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'

/**
 * Includes:
 * Two numeric inputs
 * 1. Credit amount -
 * 2. Installements
 * A text information box
 * "How much does the person needs to earn"
 */
export default defineComponent({
  props: {
    limit: {
      type: Number,
      required: true,
    },
    installment: {
      type: Number,
      required: true,
    },
  },
  components: {
    FormTextInput,
    InfoBox,
    ButtonDefault,
    FormCurrencyInput,
  },
  emits: ['formButtonClicked', 'valuesChanged'],
  setup: (props, context) => {
    const credit = ref(props.limit)
    const installments = ref<number>(props.installment)
    const currencyOptions: CurrencyInputOptions = {
      currency: 'BRL',
      currencyDisplay: CurrencyDisplay.symbol,
      locale: 'pt-BR',
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: true,
      hideNegligibleDecimalDigitsOnFocus: true,
      autoDecimalDigits: false,
      autoSign: true,
      useGrouping: true,
    }
    const currencyFormatBR = (num: number) => {
      return num
        .toFixed(2)
        .replace('.', ',') 
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    const minIncome = computed(() => {
      const minIncomeNumber = calMinIncome(credit.value, installments.value)
      return currencyFormatBR(minIncomeNumber)
    })
    const handleSubmit = () => {
      context.emit('formButtonClicked')
    }
    const handleInstallmentsChange = (value: number) => {
      installments.value = value
      context.emit('valuesChanged', credit.value, installments.value)
    }
    const handleCreditChange = (value: number) => {
      console.log('value', value)
      context.emit('valuesChanged', credit.value, installments.value)
    }
    const calMinIncome = (credit: number, installments: number) => {
      if (credit <= 0 || installments <= 0) return 0
      const perc = 0.2
      const interest = 0.05
      return ((credit + credit * interest) / installments) * (1 / perc)
    }
    return {
      handleSubmit,
      handleInstallmentsChange,
      handleCreditChange,
      minIncome,
      credit,
      currencyOptions,
    }
  },
})
</script>

<style scoped>
.btn-next {
  margin: 40px 20px;
  text-align: right;
}
.creditLabel {
  margin: 25px 0;
  text-align: center;
  font-size: 20px;
}
.container-credit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
::v-deep .creditInput {
  width: 240px;
  border: none;
}
::v-deep .installmentInput {
  width: 240px;
  border: none;
  margin-bottom: 30px;
}
</style>
