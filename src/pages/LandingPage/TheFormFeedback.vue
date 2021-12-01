<template>
	<div class="wrapper-feedback">
		<h2>Feedback</h2>
		<form id="form-feedback" class="form-feedback" @submit.prevent="submit">
			<div class="wrapper-input">
				<input
				type="text"
				name="nome"
				placeholder="Nome Completo"
				class="input-feedback"
				v-model="userFeedBack.name"
				/>
			</div>
			<div class="wrapper-input">
				<input
				type="email"
				name="email"
				placeholder="E-mail"
				class="input-feedback"
				v-model="userFeedBack.email"
				/>
			</div>
			<div class="wrapper-input">
				<label for="feedback" class="label-message">feedback/dúvida</label>
				<textarea 
				name="feedback" 
				id="feedback"
				class="textarea-input"
				cols="40" 
				rows="10" 
				required
				v-model="userFeedBack.message"
				/>
			</div>
			<ButtonDefault @buttonClicked="submitFeedBack()"/>
		</form>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ButtonDefault from "@/components/ui/ButtonDefault.vue";
import IUserFeedBack from "@/types/userFeedBack"

@Options({
	emits: ["submitFeedback"],
	components: {
		ButtonDefault
	}})
export default class TheFormFeedback extends Vue {
	userFeedBack: IUserFeedBack = {
				name: "",
				email: "",
				message: ""
			};
		submitFeedBack(): void {
			this.$emit("submitFeedback", this.userFeedBack)
			console.log("DADOS", this.userFeedBack)
			this.resetFeedBack()
		}
		resetFeedBack(): void {
			const emptyUserFeedBack: IUserFeedBack = {
				name: "",
				email: "",
				message: ""
			};
			this.userFeedBack = emptyUserFeedBack 
		}
}
</script>

<style scoped>
.form-feedback {
	max-width: 350px;
	margin-left: auto;
	margin-right: auto;
}
.wrapper-feedback {
	padding: 15px;
	background-color: #e9e1d8;
	text-align: center;
}
.input-feedback {
	width: calc(100% - 15px);
	padding: 15px;
	font-size: 18px;
	margin: 10px 0;
	border-radius: 5px;
	border: none;
}
.textarea-input {
	border: none;
	margin: 10px 0;
	width: calc(100% - 15px);
	border-radius: 5px;
	padding: 15px;
}
.wrapper-input {
	text-align: left;
}
</style>