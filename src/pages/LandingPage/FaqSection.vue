<template>
	<div id="faq-section" class="faq-section">
		<div class="wrapper-faq">
			<h2> {{faqsInfo.title}} </h2>
			<div class="faq" v-for="(faq, index) of faqsInfo.faqs" :key="index">
				<CollapsiblePanel
					:title="faq.question"
					:content="faq.answer"
					/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import CollapsiblePanel  from "@/components/common/CollapsiblePanel.vue"
import { defineComponent, PropType } from "vue-demi"

interface IFaqs {
	faqs: [
		{
			question: string,
			answer: string
		}
	]
}

/**
 * Componente de faqs
 * @props {Object<IFaqs>} faqs - Objeto do tipo IFaqs contendo um array de perguntas e resposta.
 */
export default defineComponent({
	props: {
		faqsInfo: Object as PropType<IFaqs>
	},
	components: {
		CollapsiblePanel
	}
})
</script>

<style scoped>

.faq-section {
	margin-top: 1px;
	background-color: #e9e1d8;
	font-size: 12px;
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
	.faq-section {
		font-size: 15px;
	}
}
</style>