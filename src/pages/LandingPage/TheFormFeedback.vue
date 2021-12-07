<template>
	<div class="wrapper-feedback">
		<h2>{{ feedback.title }}</h2>
		<div v-if="!success">
			<form id="form-feedback" class="form-feedback" @submit.prevent="submit">
				<FormTextInput
					v-for="(item, index) of inputsInfo" :key="index"
					@input="model"
					:type="item.type"
					:name="item.name"
					:placeholder="item.placeholder"
					:messageResponse="messageResponse[item.name]"
					:isLocalInvalid="item.isLocalInvalid()"
					:error="item.error"
				/>
				<div class="wrapper-input">
					<label for="feedback" class="label-message">feedback/dúvida</label>
					<textarea 
					name="feedback" 
					placeholder="Mensagem"
					id="feedback"
					class="textarea-input"
					v-bind:class="{ invalid: validLocalTextArea() || !validInput(messageResponse.message) }"
					cols="40" 
					rows="10" 
					required
					v-model="userFeedBack.message"
					/>
				</div>
				<div v-show=" validLocalTextArea() || !validInput(messageResponse.message)">
					<InputError :msg="feedback.errorTextArea"/>
				</div>
				<ButtonDefault @buttonClicked="submitFeedBack()"/>
			</form>
		</div>
		<TheSuccessForm 
			v-show="success"
			:messages="feedback.success"
			@newRequestClicked="newFeedback()"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormTextInput from "@/components/ui/FormTextInput.vue";
import ApiController from "@/api/C4bApi";
import ButtonDefault from "@/components/ui/ButtonDefault.vue";
import InputError from "@/components/ui/InputError.vue";
import TheSuccessForm from "@/pages/LandingPage/TheSuccessForm.vue";
import IUserFeedBack from "@/types/userFeedBack"
import { Feedback } from "@/config/variables";

enum Validity {
	Valid,
	Invalid,
	Undefined
}

const TheFormFeedback = defineComponent({
components: {
		ButtonDefault,
		InputError,
		TheSuccessForm,
		FormTextInput
	},
	setup() {
		let feedback = Feedback;
		let success = ref(false);
		let inputValidationStatus = ref({name: Validity.Undefined, email: Validity.Undefined, message: Validity.Undefined});
		let messageResponse = ref({name: [], email: [], message: []});
		let userFeedBack = ref({
					name: "",
					email: "",
					message: ""
				});
		const submitFeedBack = () => {
			// Function that will validity the form at frontend
			if (!validForm(userFeedBack.value))
				return
			new ApiController()
				.postUserFeedback(userFeedBack.value)
				.then((res) => {
					resetFeedBack()
					console.log(res);
					inputValidationStatus.value = {name: Validity.Valid, email: Validity.Valid, message: Validity.Valid};
					success.value = true;
				})
				.catch((err) => {
					console.log("Error:  ", err)
					messageResponse.value = 
						{
							name: err.response.data.errors.Name,
							email: err.response.data.errors.Email,
							message: err.response.data.errors.Message
						}
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
			const newStatus = {...inputValidationStatus.value};
			if (userFeedBack.name.length < 2)
				newStatus.name = Validity.Invalid;
			else
				newStatus.name = Validity.Valid;
			if (userFeedBack.email.length < 11)
				newStatus.email = Validity.Invalid;
			else
				newStatus.email = Validity.Valid;
			if (userFeedBack.message.length < 10)
				newStatus.message = Validity.Invalid;
			else
				newStatus.message = Validity.Valid;
			inputValidationStatus.value = newStatus;
			if (inputValidationStatus.value.name == Validity.Valid
					&& inputValidationStatus.value.email == Validity.Valid
					&& inputValidationStatus.value.message == Validity.Valid)
				return (true)
			else
				return (false)
		}

		const validLocalTextArea = () => {
			if (inputValidationStatus.value.message == Validity.Invalid)
				return true
			else
				return false
		}
		const newFeedback = () => {
			success.value = false;
		}
		const  createList = ()  => {
			
			let inputsInfo = [
				{
					type: "text",
					name: "name",
					placeholder: feedback.list[0].placeholder,
					isLocalInvalid: () => inputValidationStatus.value.name == Validity.Invalid,
					error: feedback.list[0].error,
				},
				{
					type: "email",
					name: "email",
					placeholder: feedback.list[1].placeholder, 
					isLocalInvalid: () =>inputValidationStatus.value.email == Validity.Invalid,
					error: feedback.list[1].error,
				},
			];
			return inputsInfo;
		}

		const model = (value: string, name: string) => {
			const newUserFeedback = {...userFeedBack.value};

			if (name == "name")
				newUserFeedback.name = value;
			else if (name == "email")
				newUserFeedback.email = value;
			newUserFeedback.message = userFeedBack.value.message;
			userFeedBack.value = newUserFeedback;
		}
		return {
			success,
			feedback,
			inputValidationStatus,
			messageResponse,
			userFeedBack,
			inputsInfo: createList(),
			submitFeedBack,
			validInput,
			newFeedback,
			validLocalTextArea,
			model
		}

	}
})
function validInput(data: Array<string>): boolean {
	if (data != undefined && data.length != 0) return false;
	else return true;
}
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