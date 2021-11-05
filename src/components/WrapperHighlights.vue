<template>
	<div class="highlights container">
		<div class="wrapper-title">
			<h2>{{ title }}</h2>
		</div>
		<div class="wrapper-highlights">
			<Highlight
				imageFileName='img_item_01.jpg'
				altText='Imagem 1'
				title='Ponto 1'
				description='Nunc mattis feugiat ex scelerisque congue.' />
			<Highlight
				imageFileName='img_item_02.jpg'
				altText='Imagem 2'
				title='Ponto 2'
				description='Nunc mattis feugiat ex scelerisque congue.' />
			<Highlight
				imageFileName='img_item_03.jpg'
				altText='Imagem 3'
				title='Ponto 3'
				description='Nunc mattis feugiat ex scelerisque congue.' />
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Highlight from './HighlightItem.vue';

@Options({
	props: {
		title: String
	},
	components: {
		Highlight
	}
})
export default class WrapperHighlights extends Vue {

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