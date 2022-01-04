<template>
	<VueMultiselect
		class="default"
		v-bind="$attrs"
		v-model="value"
		:options="options"
		:showLabels="false">
	</VueMultiselect>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueMultiselect from 'vue-multiselect'

export default defineComponent({
	components: {
		VueMultiselect
	},
	props: {
		options: {
			type: Array,
			required: true
		}
	},
	inheritAttrs: false,
	setup() {
		const value = ref('')
		
		return {
			value
		}
	},
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.default {
	max-width: 100%;
	font-size: 18px;
	margin: 10px 0 !important;
}
:deep .multiselect__placeholder {
	font-size: 18px !important;
	color: rgb(116, 114, 114) !important;
	padding: 0;
	margin-bottom: 0px;
}
:deep .multiselect__single {
	font-size: 18px !important;
	color: rgb(116, 114, 114) !important;
	padding: 0;
	margin-bottom: 0;
}
:deep .multiselect__tags {
	padding: 14px !important;
	border-radius: 5px;
	border: solid 1px #b29475;
}
:deep .multiselect__select {
	top: 10px;
}
</style>