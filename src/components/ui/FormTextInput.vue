<template>
	<div>
		<input
		:type="type"
		:name="name"
		:placeholder="placeholder"
		required
		class="input-feedback"
		v-bind:class="{ invalid: isLocalInvalid || !checkErrorsReturn(FormResponseError[name])}"
		@input="onInput"
		/>
		<div v-show=" isLocalInvalid || !checkErrorsReturn(FormResponseError[name])">
			<InputError :msg="error"/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import InputError from "@/components/ui/InputError.vue";
import { checkErrorsReturn } from "@/use/validInput";

interface FormResponseError {
	name: [],
	email: [],
	message: []
}

const FormTextInput = defineComponent({
	components: {
		InputError
	},
	props: {
		type: {
			type: String,
			default: "text"
		},
		name: {
			type: String,
			default: "nome"
		},
		placeholder: {
			type: String,
			required: true
		},
		FormResponseError: {
			type: Object as PropType<FormResponseError>,
			required: true
		},
		isLocalInvalid: {
			type: Boolean,
			required: true
		},
		error: {
			type: Array as PropType<string[]>,
			required: true
		},
	},
	emits: ["inputModel"],
	setup(props, context) {
		function onInput(event: any) {
			context.emit("inputModel", event.target.value)
		}
		return {
			checkErrorsReturn,
			onInput
		}
	},
});

export default FormTextInput;
</script>

<style scoped>
.input-feedback {
	max-width: 100%;
	width: calc(100% - 30px);
	padding: 15px;
	font-size: 18px;
	margin: 10px 0;
	border-radius: 5px;
	border: solid 1px #b29475;
}
</style>