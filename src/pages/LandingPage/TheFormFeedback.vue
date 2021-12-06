<template>
	<div class="wrapper-feedback">
		<h2>Feedback</h2>
		<div v-if="!success">
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
		<TheSuccessForm 
			v-show="success"
			:messages="successMessage"
			@newRequestClicked="newFeedback()"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ApiController from "@/api/controller";
import ButtonDefault from "@/components/ui/ButtonDefault.vue";
import InputError from "@/components/ui/InputError.vue";
import TheSuccessForm from "@/pages/LandingPage/TheSuccessForm.vue";
import IUserFeedBack from "@/types/userFeedBack"
import { SucessMessage } from "@/config/variables";


const TheFormFeedback = defineComponent({
components: {
		ButtonDefault,
		InputError,
		TheSuccessForm
	},
	setup() {
		let success = ref(false);
		let successMessage = ref(SucessMessage);
		let vName = ref(false);
		let vEmail = ref(false);
		let vMessage = ref(false);
		let Errors = ref([["Wrong Name"], ["Wrong Email"], ["Wrong Message"]]);
		let messageResponse = ref([]);
		let userFeedBack = ref({
					name: "",
					email: "",
					message: ""
				});

		const submitFeedBack = () => {
			//console.log("DADOS",	userFeedBack)
			if (!validForm(userFeedBack.value))
				return
			new ApiController()
				.postUserFeedback(userFeedBack.value)
				.then((res) => {
					console.log(res);
					vName.value = false;
					vEmail.value = false;
					vMessage.value = false;
					success.value = true;
					resetFeedBack()
				})
				.catch((err) => {
					console.log("Error:  ", err)
					messageResponse = err.response.data.errors
				})
		}
		const resetFeedBack = () => {
			const emptyUserFeedBack: IUserFeedBack = {
				name: "",
				email: "",
				message: ""
			};
			userFeedBack.value = emptyUserFeedBack 
		}
		const validForm = (userFeedBack: IUserFeedBack) =>
		{
			if (userFeedBack.name.length < 2)
				vName.value = true;
			else
				vName.value = false;
			if (userFeedBack.email.length < 11)
				vEmail.value = true;
			else
				vEmail.value = false;
			if (userFeedBack.message.length < 10)
				vMessage.value = true;
			else
				vMessage.value = false;
			if 	(vName.value ||	vEmail.value ||	vMessage.value)
				return (false)
			else
				return (true)
		}
		const validInput = (data: Array<string>) => {
			if (data != undefined && data.length != 0) return false;
			else return true;
		}
		const newFeedback = () => {
			success.value = false;
		}

		return {
			success,
			successMessage,
			vName,
			vEmail,
			vMessage,
			Errors,
			messageResponse,
			userFeedBack,
			submitFeedBack,
			validInput,
			newFeedback
		}
	}
})

export default TheFormFeedback;

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