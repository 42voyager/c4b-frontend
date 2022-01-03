<template>
	<div class="form-wrapper">
		<div class="title">
			<h2> Ingrese seus dados bancarios </h2>
		</div>
		<div class="inputs">
			<FormTextInput
				v-for="(item, index) of inputList"
				:name="item.name"
				:key="index"
				:type="item.type"
				:placeholder="item.placeholder"
				:isValid="false"
				:errors="item.error"
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
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import { BankInfoFormConfiguration } from '@/config/variables'
import C4bApi from '@/api/C4bApi'

export default defineComponent({
	components: {
		FormTextInput,
		ButtonDefault
	},
	setup() {
		const formInfo = ref({
			bankName: '',
			branch: '',
			checkingAccount: ''
		})
		const route = useRoute()

		const handleSubmit = async () => {
			try {
				await new C4bApi().postBankInfo({
					...formInfo.value,
					hash: route.params.id as string
				})
			}
			catch (error) {
				console.log(error)
			}
			console.log(formInfo.value)
		}

		return {
			inputList: BankInfoFormConfiguration.formInputInfolist,
			formInfo,
			handleSubmit
		}	
	},
})
</script>

<style scoped>
.form-wrapper {
	margin-top: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.title {
	text-align: center;
}
.inputs {
	width: calc(100% - 40px);
	max-width: 500px;
}
</style>
