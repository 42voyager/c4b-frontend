<template>
	<div class="radio-input" v-on:click="clicked()">
		<input 
			class="checkbox-radio" 
			type="radio" 
			:id="id" 
			:name="name" 
			:value="id"
			:checked="isChecked"
			@change="$emit('change', $event.target.checked)"
				>
		<label class="label-radio" :for="id">{{ label }}</label>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		label: String,
		id: String,
		name: String,
		value: [String, Number],
		isChecked: Boolean
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
.label-radio {
	background-color: #b29475;
	color: white;
	padding: 15px 0;
	margin: 10px;
	width: 100%;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
}
.checkbox-radio {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.radio-input input:checked + .label-radio {
	background-color: #64380c;
}

</style>