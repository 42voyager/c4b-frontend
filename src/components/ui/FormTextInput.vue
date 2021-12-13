<template>
	<div>
		<input
		:type="type"
		:name="name"
		:placeholder="placeholder"
		required
		class="input-feedback"
		v-bind:class="{ invalid: isValid}"
		@input="onInput"
		/>
		<div v-show=" isValid">
			<InputError :msg="errorsFront"/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import InputError from "@/components/ui/InputError.vue";
import { checkErrorsReturn } from "@/use/validInput";

/**
 * Component utilizado para input
 * @prop {String} type - tipo do input
 * @prop {String} name - Nome do input
 * @prop {String} placeholder - Placeholder a ser utilizado no input
 * @prop {Boolean} isValid - Condição para verficar se o input é válido
 * @prop {Array<String>} errorsFront - Array de string contendo todos as mensagens de erros
 * @event inputEvent - Evento para quando algo é escrito no input
*/
export default defineComponent({
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
		isValid: {
			type: Boolean,
			required: true
		},
		errorsFront: {
			type: Array as PropType<string[]>,
			required: true
		},
	},
	emits: ["inputEvent"],
	setup(props, context) {
		/**
		 * Função chamada para emitir um evento quando algo é escrito no input
		 * @param {any} event - dados do evento recebido pelo input
		 */
		function onInput(event: any) {
			context.emit("inputEvent", event.target.value)
		}
		return {
			checkErrorsReturn,
			onInput
		}
	},
});

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