<template>
  <div class="container-credit">
    <p class="creditLabel">De quanto seu negócio precisa</p>
    <SliderInput
      :min="minCredit"
      :max="maxCredit"
      :minLabel="'R$' + currencyFormatBR(minCredit)"
      :maxLabel="'R$' + currencyFormatBR(maxCredit)"
      step="1000"
      v-model="credit"
      />
      <b class="current-value" > R$ {{ creditFormatted }} </b>
    <p class="creditLabel">Em quantas vezes você quer pagar?</p>
    <SliderInput
      :min="6"
      :max="36"
      :minLabel="'6 Meses'"
      :maxLabel="'35 Meses'"
      step="2"
      v-model="installments"
      />
      <b class="current-value"> {{ installments }} Meses </b>
    <InfoBox class="info-box">
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
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import SliderInput from '@/components/ui/SliderInput.vue'

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
    InfoBox,
    ButtonDefault,
    SliderInput
  },
  emits: ['formButtonClicked', 'valuesChanged'],
  setup: (props, context) => {
    const minCredit = 10000
    const maxCredit = 5000000
    const credit = ref(props.limit)
    const installments = ref(props.installment)
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
      console.log(num)
      return num
        .toFixed(2)
        .replace('.', ',') 
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    const creditFormatted = computed(() => {
      return currencyFormatBR(credit.value)
    })
    const minIncome = computed(() => {
      console.log(credit.value, installments.value)
      const minIncomeNumber = calMinIncome(credit.value, installments.value)
      console.log(minIncomeNumber)
      return currencyFormatBR(minIncomeNumber)
    })
    const handleSubmit = () => {
      context.emit('valuesChanged', credit.value, installments.value)
      context.emit('formButtonClicked')
    }
    const calMinIncome = (credit: number, installments: number) => {
      if (credit <= 0 || installments <= 0) return 0
      const perc = 0.2
      const interest = 0.05
      return ((credit + credit * interest) / installments) * (1 / perc)
    }
    return {
      handleSubmit,
      currencyFormatBR,
      minIncome,
      credit,
      creditFormatted,
      installments,
      currencyOptions,
      minCredit,
      maxCredit
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
.current-value {
  margin-bottom: 10px;
}
::v-deep .info-box {
  margin-top: 20px;
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
