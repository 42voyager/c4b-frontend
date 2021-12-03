<template>
	<div class="wrapper-feedback">
		<h2>Feedback</h2>
		<form id="form-feedback" class="form-feedback" @submit.prevent="submit">
			<div class="wrapper-input">
				<input
				type="text"
				name="nome"
				placeholder="Nome Completo"
				required
				class="input-feedback"
				v-bind:class="{ invalid: vName, invalid: !validInput(messageResponse.Name)}"
				v-model="userFeedBack.name"
				/>
			</div>
			<div v-show="vName | !validInput(messageResponse.Name)">
				<InputError :msg="Errors[0]"/>
			</div>
			<div class="wrapper-input">
				<input
				type="email"
				name="email"
				placeholder="E-mail"
				required
				class="input-feedback"
				v-bind:class="{ invalid: vEmail, invalid: !validInput(messageResponse.Email)}"
				v-model="userFeedBack.email"
				/>
			</div>
			<div v-show="vEmail | !validInput(messageResponse.Email)">
				<InputError :msg="Errors[1]"/>
			</div>
			<div class="wrapper-input">
				<label for="feedback" class="label-message">feedback/dúvida</label>
				<textarea 
				name="feedback" 
				placeholder="Mensagem"
				id="feedback"
				class="textarea-input"
				v-bind:class="{ invalid: vMessage, invalid: !validInput(messageResponse.Message) }"
				cols="40" 
				rows="10" 
				required
				v-model="userFeedBack.message"
				/>
			</div>
			<div v-show="vMessage | !validInput(messageResponse.Message)">
				<InputError :msg="Errors[2]"/>
			</div>
			<ButtonDefault @buttonClicked="submitFeedBack()"/>
		</form>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ApiController from "@/api/controller";
import ButtonDefault from "@/components/ui/ButtonDefault.vue";
import InputError from "@/components/ui/InputError.vue";
import IUserFeedBack from "@/types/userFeedBack"

@Options({
	components: {
		ButtonDefault,
		InputError
	}})
export default class TheFormFeedback extends Vue {
	vName = false;
	vEmail = false;
	vMessage = false;
	Errors = [["Wrong Name"], ["Wrong Email"], ["Wrong Message"]]
	messageResponse = []
	userFeedBack: IUserFeedBack = {
				name: "",
				email: "",
				message: ""
			};
	submitFeedBack(): void {
		//console.log("DADOS", this.userFeedBack)
		if (!this.validForm(this.userFeedBack))
			return
		new ApiController()
			.postUserFeedback(this.userFeedBack)
			.then((res) => {
				console.log(res);
				this.resetFeedBack()
				this.vName = false;
				this.vEmail = false;
				this.vMessage = false;
			})
			.catch((err) => {
				console.log("Error:  ", err)
				this.messageResponse = err.response.data.errors
			})
	}
	resetFeedBack(): void {
		const emptyUserFeedBack: IUserFeedBack = {
			name: "",
			email: "",
			message: ""
		};
		this.userFeedBack = emptyUserFeedBack 
	}
	validForm(userFeedBack: IUserFeedBack): boolean
	{
		if (userFeedBack.name.length < 2)
			this.vName = true;
		else
			this.vName = false;
		if (userFeedBack.email.length < 11)
			this.vEmail = true;
		else
			this.vEmail = false;
		if (userFeedBack.message.length < 5)
			this.vMessage = true;
		else
			this.vMessage = false;
		if (this.vName || this.vEmail || this.vMessage)
			return (false)
		else
			return (true)
	}
	validInput(data: Array<string>): boolean {
		if (data != undefined && data.length != 0) return false;
		else return true;
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
.invalid::placeholder {
	color: red;
	opacity: 1;
}
</style>