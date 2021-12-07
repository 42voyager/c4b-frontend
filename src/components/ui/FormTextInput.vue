<template>
	<div>
		<input
		:type="type"
		:name="name"
		:placeholder="placeholder"
		required
		class="input-feedback"
		v-bind:class="{ invalid: isLocalInvalid || !validInput(messageResponse[name])}"
		@input="onInput"
		/>
		<div v-show=" isLocalInvalid || !validInput(messageResponse[name])">
			<InputError :msg="error"/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import InputError from "@/components/ui/InputError.vue";

interface response {
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
		messageResponse: {
			type: Object as PropType<response>,
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
	setup(props, context) {
		function onInput(event: any) {
			context.emit('input', event.target.value, props.name)
		}
		return {
			validInput,
			onInput
		}
	},
});

function validInput(data: Array<string>): boolean {
	if (data != undefined && data.length != 0) return false;
	else return true;
}

export default FormTextInput;
</script>

<style scoped>
.input-feedback {
	width: calc(100% - 15px);
	padding: 15px;
	font-size: 18px;
	margin: 10px 0;
	border-radius: 5px;
	border: none;
}
</style>