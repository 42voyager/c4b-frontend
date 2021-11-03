<template>
	<button> {{ msg }} </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		msg: String
	}
})
export default class ButtonDefault extends Vue {

}
</script>

<style scoped>
button {
	color: #b29475;
	padding: 15px 40px;
	background-color: #fff;
	border: none;
	border-radius: 2px;
	font-size: 18px;
	cursor: pointer;
}

button:hover {
	color: #fff;
	background-color: #b29475;
}
</style>