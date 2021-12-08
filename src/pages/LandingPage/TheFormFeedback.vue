<template>
	<div class="wrapper-Feedback">
		<h2>{{ Feedback.title }}</h2>
		<div v-if="!success">
			<form id="form-Feedback" class="form-Feedback" @submit.prevent>
				<FormTextInput
					v-for="(item, index) of inputsInfo" :key="index"
					@input="(value) => { handleInputChange(value, item.name )}"
					:type="item.type"
					:name="item.name"
					:placeholder="item.placeholder"
					:FormResponseError="messageResponse[item.name]"
					:isLocalInvalid="item.isLocalInvalid()"
					:error="item.error"
				/>
				<div class="wrapper-input">
					<label for="Feedback" class="label-message">Feedback/dúvida</label>
					<textarea 
					name="Feedback" 
					placeholder="Mensagem"
					id="Feedback"
					class="textarea-input"
					v-bind:class="{ invalid: validLocalTextArea() || !checkErrorsReturn(messageResponse.message) }"
					cols="40" 
					rows="10" 
					required
					v-model="userFeedBack.message"
					/>
				</div>
				<div v-show=" validLocalTextArea() || !checkErrorsReturn(messageResponse.message)">
					<InputError :msg="Feedback.errorTextArea"/>
				</div>
				<ButtonDefault @buttonClicked="submitFeedBack()"/>
			</form>
		</div>
		<TheSuccessForm 
			v-show="success"
			:messages="Feedback.success"
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
import { checkErrorsReturn } from "@/use/validInput";

interface InputsInfo {
	type: string,
	name: string,
	placeholder: string,
	isLocalInvalid: () => boolean,
	error: string[]
}
enum Validity {
	Valid,
	Invalid,
	Undefined
}

const success = ref(false);
const inputValidationStatus = ref({name: Validity.Undefined, email: Validity.Undefined, message: Validity.Undefined});
const messageResponse = ref({name: [], email: [], message: []});
const userFeedBack = ref({
			name: "",
			email: "",
			message: ""
		});

const TheFormFeedback = defineComponent({
components: {
		ButtonDefault,
		InputError,
		TheSuccessForm,
		FormTextInput
	},
	setup() {
		return {
			success,
			Feedback,
			inputValidationStatus,
			messageResponse,
			userFeedBack,
			inputsInfo: createList(),
			submitFeedBack,
			checkErrorsReturn,
			newFeedback,
			validLocalTextArea,
			handleInputChange
		}

	}
})

function submitFeedBack(): void {
	// Function that will validity the form at frontend
	if (!validFormVue(userFeedBack.value))
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

function resetFeedBack(): void {
	const emptyUserFeedBack: IUserFeedBack = {
		name: "",
		email: "",
		message: ""
	};
	userFeedBack.value = emptyUserFeedBack 
}

function validFormVue(userFeedBack: IUserFeedBack): boolean {
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

function validLocalTextArea(): boolean {
	if (inputValidationStatus.value.message == Validity.Invalid)
		return true
	else
		return false
}

function newFeedback(): void {
	success.value = false;
}

function  createList(): Array<InputsInfo> {
	
	let inputsInfo = [
		{
			type: "text",
			name: "name",
			placeholder: Feedback.formInputInfolist[0].placeholder,
			isLocalInvalid: () => inputValidationStatus.value.name == Validity.Invalid,
			error: Feedback.formInputInfolist[0].error,
		},
		{
			type: "email",
			name: "email",
			placeholder: Feedback.formInputInfolist[1].placeholder, 
			isLocalInvalid: () => inputValidationStatus.value.email == Validity.Invalid,
			error: Feedback.formInputInfolist[1].error,
		},
	];
	return inputsInfo;
}

function handleInputChange(value: string, name: string): void {
	const newUserFeedback = {...userFeedBack.value};

	const string = "";
	if ((typeof value) != (typeof string))
		return ;
	if (name == "name")
		newUserFeedback.name = value;
	if (name == "email")
		newUserFeedback.email = value;
	newUserFeedback.message = userFeedBack.value.message;
	userFeedBack.value = newUserFeedback;
}
export default TheFormFeedback;

</script>

<style scoped>
.form-Feedback {
	max-width: 350px;
	margin-left: auto;
	margin-right: auto;
}
.wrapper-Feedback {
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