<template>
	<button v-on:click="onClick()"> {{ msg }} </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		msg: String
	},
	emit: ['buttonClicked']
})
export default class ButtonDefault extends Vue {
	onClick(): void {
		this.$emit('buttonClicked')
	}
}
</script>

<style scoped>
button {
	color: #b29475;
	padding: 15px 40px;
	background-color: #fff;
	border-radius: 2px;
	font-size: 18px;
	cursor: pointer;
	border: 1px solid #b29475;
}

button:hover {
	color: #fff;
	background-color: #b29475;
}
</style>