<template>
	<div id="faq-section" class="faq-section">
		<div class="wrapper-faq">
			<h2> FAQ </h2>
			<div class="faq" v-for="(faq, index) of faqs" :key="index">
				<CollapsiblePanel
					:title="faq.question"
					:content="faq.answer"
					/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import CollapsiblePanel  from "./CollapsiblePanel.vue"

@Options({
	props: {
		faqs: Array
	},
	components: {
		CollapsiblePanel
	}
})

export default class FaqSection extends Vue {
}
</script>

<style scoped>

.faq-section {
	margin-top: 1px;
	background-color: #e9e1d8;
}

.wrapper-faq {
	width: calc(100% - 60px);
	max-width: 900px;
	margin: 0 auto;
	padding: 1px 30px 30px;
}

.wrapper-faq h2 {
	text-align: center;
}

.faq {
	margin: 20px 0px;
}
@media (min-width: 768px) {
	.wrapper-faq {
		width: calc(100% - 200px);
		padding-top: 30px;
	}
}
</style>