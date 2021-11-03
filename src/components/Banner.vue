<template>
	<div class="banner">
		<img src="../assets/banner2.png" alt="">
		<div class="text-banner">
			<h1>Lorem ipsum dolor sit amet, consectetur adipiscing</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
			<ButtonDefault msg="Solicitar"/>
		</div>
		<div class="banner-overlay"></div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ButtonDefault from './ButtonDefault.vue';

@Options({
	props: {

	},
	components: {
		ButtonDefault
	}
})
export default class Banner extends Vue {

}
</script>

<style scoped>

.banner {
	position: relative;
	z-index: 1;
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
	left: 90px;
	bottom: 90px;
	max-width: 500px;
	text-align: left;
	font-size: 23px;
	z-index: 10;
}

.banner img {
	max-width: 100%;
}


</style>