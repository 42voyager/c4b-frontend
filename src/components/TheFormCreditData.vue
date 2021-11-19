<template>
	<div class="container-credit">
		<p class="creditLabel">
			De quanto seu negócio precisa
		</p>
		<div class="form-credit" >
			<div class="radio-group">
				<RadioInput v-for="(creditLimit, id) of creditLimits" :key="id"
					:id="creditLimit.id"
					:name="creditLimit.name"
					:label="creditLimit.label"
					:value="limit"
					@radioClicked="handleInput(creditLimit.id, installment)"
					/>
			</div>
			<p class="creditLabel">
				Em quantas vezes você quer pagar?
			</p>
			<div class="radio-group">
				<RadioInput v-for="(creditInstallment, id) of creditInstallments" :key="id"
					:id="creditInstallment.id"
					:name="creditInstallment.name"
					:label="creditInstallment.label"
					:value="installment"
					@radioClicked="handleInput(limit, creditInstallment.id)"
					/>
			</div>
			<div>
				<ButtonDefault msg="Next" @buttonClicked="nextStepClicked()"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import RadioInput from './RadioInput.vue';
import ButtonDefault from "./ButtonDefault.vue";
import { CreditInstallments, CreditLimits } from '../text/variables';

@Options({
	emits: ["nextStepClicked"],
	components: {
		RadioInput,
		ButtonDefault
	}
})
export default class TheFromCreditData extends Vue {
	creditLimits = CreditLimits;
	creditInstallments = CreditInstallments;
	limit = "10k";
	installment = "6x";
	nextStepClicked(): void {
		console.log(this.limit, this.installment)
		this.$emit("nextStepClicked", this.limit, this.installment)
	}
	handleInput(limit: string, installment: string): void {
		console.log("FOI", limit, installment)
		this.limit = limit;
		this.installment = installment;
	}

}
</script>
<style scoped>
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
</style>
