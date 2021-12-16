<template>
	<div class="container-credit">
		<FormTextInput 
			type="number"
			:placeholder="''"
			is-valid="true"
			:errorsFront="[]"/>
		<FormTextInput 
			type="number"
			:placeholder="''"
			is-valid="true"
			:errorsFront="[]"/>
		<InfoBox> 
			<p> Successo! </p>
		</InfoBox>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InfoBox from '@/components/ui/InfoBox.vue'
import FormTextInput from '@/components/ui/FormTextInput.vue'

/**
 * Includes:
 * Two numeric inputs
 * 1. Credit amount - 
 * 2. Installements
 * A text information box
 * "How much does the person needs to earn" 
 */
export default defineComponent({
	components: {
		FormTextInput,
		InfoBox
	}
})

</script>

<style>

</style>