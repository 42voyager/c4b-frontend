<template>
	<div class="highlights container">
		<div class="wrapper-title">
			<h2>{{ title }}</h2>
		</div>
		<div class="wrapper-highlights">
			<Highlight
				imageFileName='img_item_01.jpg'
				altText='Imagem 1'
				:title='titlePonto1'
				:description='ponto1' />
			<Highlight
				imageFileName='img_item_02.jpg'
				altText='Imagem 2'
				:title='titlePonto2'
				:description='ponto2' />
			<Highlight
				imageFileName='img_item_03.jpg'
				altText='Imagem 3'
				:title='titlePonto3'
				:description='ponto3' />
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Highlight from './HighlightItem.vue';
import { TitlePonto1, Ponto1, TitlePonto2, Ponto2, TitlePonto3, Ponto3 } from '../text/variables';

@Options({
	props: {
		title: String
	},
	components: {
		Highlight
	}
})
export default class WrapperHighlights extends Vue {
	titlePonto1 = TitlePonto1;
	ponto1 = Ponto1;
	titlePonto2 = TitlePonto2;
	ponto2 = Ponto2;
	titlePonto3 = TitlePonto3;
	ponto3 = Ponto3;
}
</script>

<style scoped>
h2 {
	font-size: 32px;
	font-weight: 400;
	text-align: center;
}
.highlights {
	padding-top: 60px;
	padding-bottom: 60px;
}
.wrapper-title {
	width: 100%;
}
.wrapper-highlights {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>