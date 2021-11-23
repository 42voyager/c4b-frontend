<template>
	<div class="container-credit">
		<div class="form-credit" >
			<p class="creditLabel">
				De quanto seu negócio precisa
			</p>
			<div class="radio-group">
				<RadioInput
					v-for="(creditLimit, id) of creditLimits"
					:key="id"
					:id="creditLimit.id"
					:name="creditLimit.name"
					:label="creditLimit.label"
					:value="limit"
					:isChecked="creditLimit.id == limit ? true : false"
					@radioClicked="handleInput(creditLimit.id, null)"
					/>
			</div>
			<p class="creditLabel">
				Em quantas vezes você quer pagar?
			</p>
			<div class="radio-group">
				<RadioInput
					v-for="(creditInstallment, id) of creditInstallments"
					:key="id"
					:id="creditInstallment.id"
					:name="creditInstallment.name"
					:label="creditInstallment.label"
					:value="installment"
					:isChecked="creditInstallment.id == installment ? true : false"
					@radioClicked="handleInput(null, creditInstallment.id)"
					/>
			</div>
			<div class="btn-next">
				<ButtonDefault msg="Próximo" @buttonClicked="nextStepClicked()"/>
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
	props: {
		limit: String,
		installment: String
	},
	emits: ["nextStepClicked", "valueChanged"],
	components: {
		RadioInput,
		ButtonDefault
	}
})
export default class TheFromCreditData extends Vue {
	creditLimits = CreditLimits;
	creditInstallments = CreditInstallments;

	nextStepClicked(): void {
		// console.log(this.limit, this.installment)
		this.$emit("nextStepClicked")
	}
	/** No momento que o radio input e clickado, handle input triggers */
	handleInput(limit: string | null, installment: string | null): void {
		// console.log("FOI", limit, installment)
		this.$emit("valueChanged", limit, installment)
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
