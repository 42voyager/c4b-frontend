<template>
	<div class="two-column-section">
		<div class="column-one">

		</div>
		<div class="column-two">

		</div>
	</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {

	}
})
export default class TwoColumnSection extends Vue {

}
</script>

<style scoped>
	.two-column-section {
		display: flex;

	}
</style>