<template>
	<div class="form-wrapper">
		<div class="title">
			<h2> Ingrese seus dados bancarios </h2>
		</div>
		<div class="inputs">
			<FormTextInput
				v-for="(item, index) of inputList"
				:key="index"
				:type="item.type"
				:placeholder="item.placeholder"
				:isValid="true"
				:errorsFront="[]"
				:modelValue="modelsArray[index]"
			/>	
		</div>
	</div>	
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import { BankInfoFormConfiguration } from '@/config/variables'

export default defineComponent({
	components: {
		FormTextInput
	},
	setup() {
		const bankName = ref('')
		const branch = ref('')
		const checkingAccount = ref('')

		return {
			inputList: BankInfoFormConfiguration.formInputInfolist,
			modelsArray: [bankName, branch, checkingAccount]
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
