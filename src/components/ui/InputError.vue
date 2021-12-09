<template>
	<p>{{ msg.join(" ") }}</p>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
	props: {
		msg: Array
	}
})

export default class InputError extends Vue{
		
}
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
