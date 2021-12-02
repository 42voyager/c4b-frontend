<template>
	<button v-on:click="onClick()"> {{ msg }} </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		msg: {
			type: String,
			default: "Submit"
		}
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
	padding: 7px 30px;
	background-color: #fff;
	border-radius: 10px;
	font-size: 15px;
	cursor: pointer;
	border: 1px solid #b29475;
}

button:hover {
	color: #fff;
	background-color: #b29475;
}
@media (min-width: 768px) {
	button {
		padding: 15px 40px;
		font-size: 18px;
	}
}
</style>