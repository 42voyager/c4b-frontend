<template>
	<div class="radio-input" v-on:click="clicked()">
		<input type="radio" :id="id" :name="name" :value="id">
		<label :for="id">{{ label }}</label>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		label: String,
		id: String,
		name: String,
		value: String
	},
	emit: ["radioClicked"]
})
export default class RadioInput extends Vue {
	clicked(): void {
		this.$emit("radioClicked")
	}
}
</script>


<style scoped>
</style>