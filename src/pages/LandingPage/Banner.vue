<template>
	<div class="banner">
		<img src="@/assets/banner/banner2.png" alt="">
		<div class="text-banner">
			<h1>{{ titleBanner }}</h1>
			<p>{{ textBanner }}</p>
			<ButtonDefault msg="Solicitar"/>
		</div>
		<div class="banner-overlay"></div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ButtonDefault from '@/components/ui/ButtonDefault.vue';
import { TitleBanner, TextBanner } from '@/config/variables';

@Options({
	components: {
		ButtonDefault
	}
})
export default class Banner extends Vue {
	titleBanner = TitleBanner;
	textBanner = TextBanner;
}
</script>

<style scoped>
.banner {
	position: relative;
	z-index: 1;
	margin-top: 65px;
	height: calc(100vh - 65px);
	overflow: hidden;
}

.banner-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #47392b;
	display: block;
	z-index: 9;
	opacity: 0.5;
}

.text-banner {
	color: white;
	position: absolute;
	left: 0;
	bottom: 20px;
	max-width: 500px;
	text-align: left;
	font-size: 13px;
	z-index: 10;
	text-align: center;
	width: 100%;
}

.banner img {
	width: auto;
	height: calc(100vh - 65px);
	transform: translateX(-50%);
}

@media (min-width: 768px) {
	.banner {
		margin-top: 75px;
		height: calc(100vh - 75px);
	}
	.text-banner {
		font-size: 23px;
		left: 90px;
		bottom: 90px;
		text-align: left;
		width: auto;
	}
	.banner img {
		transform: translateX(0);
	}
}

@media (min-width: 1200px) {
	.banner img {
		max-width: 100%;
		height: auto;
	}
}
</style>