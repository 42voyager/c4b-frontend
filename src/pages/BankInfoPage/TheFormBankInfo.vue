<template>
	<div class="form-wrapper">
		<div class="title">
			<h2> Insira seus dados bancários </h2>
		</div>

		<div class="inputs">
			<MultiSelect
				placeholder="Nome do Banco"
				:options="banksListSum"
				v-model="formInfo.bankName"
			/>
			<FormTextInput
				v-for="(item, index) of inputList"
				:name="item.name"
				:key="index"
				:type="item.type"
				:placeholder="item.placeholder"
				:isValid="inputIsValid[item.name]"
				:errors="inputsErrors[item.name]"
				v-model="formInfo[item.name]"
			/>	
		</div>
		<ButtonDefault 
			msg="Enviar"
			@buttonClicked="handleSubmit"
		/>
	</div>	
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import MultiSelect from '@/components/ui/MultiSelect.vue'
import { BankInfoFormConfiguration } from '@/config/variables'
import { Validity, checkErrorsReturn } from '@/use/validInput'
import C4bApi from '@/api/C4bApi'
import { banksList } from '@/config/bankslit'

export default defineComponent({
	components: {
		FormTextInput,
		ButtonDefault,
		MultiSelect
	},
	setup() {
		const route = useRoute()
		const formInfo = ref({
			bankName: '',
			branch: '',
			checkingAccount: ''
		})
		const inputsErrors = ref({
			bankName: [],
			branch: [],
			checkingAccount: []
		})
		const inputValidationStatus =  ref({
			bankName: Validity.Undefined,
			branch: Validity.Undefined,
			checkingAccount: Validity.Undefined
		})
		const banksListSum = banksList.map(bank => {
			return bank.ShortName
		})
		// Actually, should be called if input is invalid
		const inputIsValid = computed(() => {
			return {
				bankName: inputValidationStatus.value.bankName === Validity.Invalid,
				branch: inputValidationStatus.value.branch === Validity.Invalid,
				checkingAccount: inputValidationStatus.value.checkingAccount === Validity.Invalid
			}
		})

		watch(formInfo, (info) => console.log(info), {deep: true})

		const handleSubmit = async () => {
			try {
				await new C4bApi().postBankInfo({
					...formInfo.value,
					hash: route.params.id as string
				})
			}
			catch (error: any) {
				console.log('err', error)
				const newStatus = {...inputValidationStatus.value}
				const newErrors = {...inputsErrors.value}

				if (!checkErrorsReturn(error.response.data.errors.BankName))
				{
					newErrors.bankName = error.response.data.errors.BankName
					newStatus.bankName = Validity.Invalid;
				}
				if (!checkErrorsReturn(error.response.data.errors.Branch))
				{
					newErrors.branch = error.response.data.errors.Branch
					newStatus.branch = Validity.Invalid;
				}
				if (!checkErrorsReturn(error.response.data.errors.CheckingAccount))
				{
					newErrors.checkingAccount = error.response.data.errors.CheckingAccount
					newStatus.checkingAccount = Validity.Invalid;
				}
				inputValidationStatus.value = newStatus
				inputsErrors.value = newErrors
			}
		}

		return {
			inputList: BankInfoFormConfiguration.formInputInfolist,
			formInfo,
			inputValidationStatus,
			inputIsValid,
			inputsErrors,
			banksListSum,
			handleSubmit
		}	
	},
})
</script>

<style scoped>
.form-wrapper {
	margin-top: 65px;
	padding: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #e0ccba;
}
.title {
	text-align: center;
}
.inputs {
	width: calc(100% - 40px);
	max-width: 500px;
}

@media (min-width: 768px) {
	.form-wrapper {
		height: calc(100vh - 300px);
	}
}
</style>
