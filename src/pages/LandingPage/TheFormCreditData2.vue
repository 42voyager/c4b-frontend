<template>
	<div class="container-credit">
		<p class="creditLabel">
			De quanto seu negócio precisa
		</p>
		<FormCurrencyInput
			class="creditInput"
			type="text"
			placeholder="R$ 0,00"
			is-valid="true"
			:errors="[]"
			v-model="credit"
			:currencyOptions="currencyOptions"
			/>
		<p class="creditLabel">
			Em quantas vezes você quer pagar?
		</p>
		<FormTextInput
			class="creditInput"
			type="number"
			min=6
			max=36
			placeholder="Quantos meses"
			is-valid="true"
			:errors="[]"
			@inputEvent="(value) => { handleInstallmentsChange(value)}"
			/>
		<InfoBox v-show="minSalary != null"> 
			<p> Faturamento mensual recomendado seria: <b> R$ {{ minSalary }} </b> </p>
		</InfoBox>
		<div class="btn-next">
			<ButtonDefault msg="Continuar" @buttonClicked="handleSubmit()"/>
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
	components: {
		FormTextInput,
		InfoBox,
		ButtonDefault,
		FormCurrencyInput
	},
	emits: ["submitButtonClicked"],
	setup: (props, context) => {
		const credit = ref(0)
		const installments = ref<number>(0) 
		const currencyOptions: CurrencyInputOptions = {
			currency: 'BRL',
			currencyDisplay: CurrencyDisplay.symbol,
			hideCurrencySymbolOnFocus: false,
			hideGroupingSeparatorOnFocus: true,
			hideNegligibleDecimalDigitsOnFocus: true,
			autoDecimalDigits: false,
			autoSign: true,
			useGrouping: true
		}
		const minSalary = computed(() => {
			return calMinSalary(credit.value, installments.value)	
		})

		const handleSubmit = () => {
			context.emit("submitButtonClicked")
		}
		const handleInstallmentsChange = (value: number) => {
			installments.value = value
		}
		const calMinSalary = (credit: number, installments: number) => {
			if (credit <= 0 || installments <= 0)
				return null
			const perc = 0.2
			const interest = 0.05
			return (((credit + (credit * interest)) / installments) * (1 / perc)).toFixed(2)
		}
		return {
			handleSubmit,
			handleInstallmentsChange,
			minSalary,
			credit,
			currencyOptions
		}
	}
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
.creditInput {
	min-width: 200px;
}
</style>>
