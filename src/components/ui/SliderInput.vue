<template>
	<div class="slider-wrapper">
		<input
			class="slider-input"
			v-bind="$attrs"
			type="range" 
			:value="modelValue" 
			@input="$emit('update:modelValue', Number($event.target.value))" 
		/>
		<div class="min-max-wrapper" v-show="showLabels">
			<p> {{ minLabel }} </p>
			<p> {{ maxLabel }} </p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		showLabels: {
			type: Boolean,
			default: false
		},
		modelValue: {
			type: Number,
			required: true
		},
		minLabel: {
			type: String,
			required: true
		},
		maxLabel: {
			type: String,
			required: true
		}
	},
	inheritAttrs: false
})
</script>

<style scoped>
.slider-wrapper {
	display: flex;
	justify-content: center;
	padding: 15px 0px;
	width: 100%;
}
.slider-input {
	width: calc(100% - 30px);
}
.min-max-wrapper {
	display: flex;
	justify-content: space-between;
}
</style>
