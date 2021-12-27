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

/**
 * Component utilizado para input numerico do tipo slider
 * @prop {Boolean} showLabels - Condição para habilitar os labels no extremo do slider
 * @prop {number} modelValue - valor selecionado do input
 * @prop {string} minLabel - label para indicar o valor minimo
 * @prop {string} maxLabel - label para indicar o valor maximo
 */
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
