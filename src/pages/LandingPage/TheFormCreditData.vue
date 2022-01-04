<template>
	<div class="container-credit">
		<div class="form-credit" >
			<p class="creditLabel">
				{{ creditData.text.titleLimits }}
			</p>
			<div class="radio-group">
				<RadioInput
					v-for="(creditLimit, id) of creditData.text.creditLimits"
					:key="id"
					:id="creditLimit.id.toString()"
					:name="creditLimit.name"
					:label="creditLimit.label"
					:value="limit"
					:isChecked="creditLimit.id == limit ? true : false"
					@radioClicked="handleInput(creditLimit.id, null)"
					/>
			</div>
			<p class="creditLabel">
				{{ creditData.text.titleInstallments }}
			</p>
			<div class="radio-group">
				<RadioInput
					v-for="(creditInstallment, id) of creditData.text.creditInstallments"
					:key="id"
					:id="creditInstallment.id.toString()"
					:name="creditInstallment.name"
					:label="creditInstallment.label"
					:value="installment"
					:isChecked="creditInstallment.id == installment ? true : false"
					@radioClicked="handleInput(null, creditInstallment.id)"
					/>
			</div>
			<div class="input-wrapper">
				<p class="creditLabel">
					{{ creditData.text.titleMotivo }}
				</p>
				<FormTextInput
					placeholder="Motivo"
					name="motivo"
					v-model="reason"
				/>
			</div>
			<div class="btn-next">
				<ButtonDefault msg="Continuar" @buttonClicked="nextStepClicked()"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import RadioInput from '@/components/ui/RadioInput.vue';
import ButtonDefault from "@/components/ui/ButtonDefault.vue";
import  FormTextInput from "@/components/ui/FormTextInput.vue";
import { CreditData } from '@/config/variables';
import { defineComponent, ref } from 'vue-demi';

/**
 * Component utilizado na primeira etapa da solicitação de crédito
 * @props {String} limit - Limite de crédito
 * @props {String} installment - Parcelas para a solicitação
 * @emits nextStepClicked - utilizado para fazer a mudança de etapas do form
 * @emits valueChanged - utilizado para fazer a mudança dos valores do limits e installment
 */
export default defineComponent({
	props: {
		limit: [String, Number],
		installment: [String, Number]
	},
	emits: ["nextStepClicked", "valueChanged"],
	components: {
		RadioInput,
		ButtonDefault,
		FormTextInput
	},
	setup(props, context){
		const creditData = CreditData;
		const reason = ref("");

		/**
		 * Função utilizada para limpar o campo do motivo no form
		 */
		const reset = (): void => {
			reason.value = "";
		}
		/**
		 * Função utilizada para emitir um evendo quando o botão continuar é clicado
		 */
		const nextStepClicked = (): void => {
			context.emit("nextStepClicked", reason.value, reset)
		}

		/** No momento que o radio input e clicado, handle input triggers */
		const handleInput = (limit: string | null, installment: string | null): void => {
			context.emit("valueChanged", limit, installment)
		}
		return {
			creditData,
			reason,
			nextStepClicked,
			handleInput
		}
	}
})
</script>
<style scoped>
:deep .input-base {
	border: none;
	width: calc(80% - 30px);
}
.input-wrapper {
	text-align: center;
}
.container-credit {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.radio-group {
	display: flex;
	flex-wrap: wrap;
}
.radio-input {
	display: flex;
	flex: 2 0 50%;
}
.btn-next {
	margin: 40px 20px;
	text-align: right;
}
.creditLabel {
	margin: 25px 0;
	text-align: center;
	font-size: 20px;
}
</style>
