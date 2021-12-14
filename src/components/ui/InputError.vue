<template>
	<p>{{ msg.join(" ") }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

/**
 * Component utilizado para mostrar os erros dos inputs
 * @prop {Array<String>} msg - Um array de strings contendo todas as mensagens de erro
 */
export default defineComponent({
	props: {
			msg: {
				type: Array as PropType<string[]>,
				required: true
			}
		}
});
</script>

<style scoped>
p {
	font-size: 12px;
	color: red;
	padding: 5px;
	max-width: 300px;
	width: 100%;
	margin-top: 0;
	text-align: left;
}
</style>
