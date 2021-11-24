<template>
	<div class="modal-bg">
		<div class="modal-wrapper">
			<ButtonDefault msg="X" @buttonClicked="closeModal()" />
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ButtonDefault from "./ButtonDefault.vue";

@Options ({
	components: {
		ButtonDefault
	},
	emits: ["buttonClicked"]
})
export default class Modal extends Vue {
	closeModal(): void {
		this.$emit("buttonClicked")
	}
}
</script>

<style scoped>
	.modal-bg {
		position: fixed;
		background: rgba(255, 255, 255, 0.8);
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 99999;
		overflow: hidden;
	}
	.modal-bg.show {
		display: block;
	}
	.modal-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #ffffff;
		padding: 20px 30px 50px;
		border-radius: 15px;
		width: calc(100% - 40px);
		height: calc(100% - 180px);
	}
	button {
		position: absolute;
		top: 20px;
		right: 20px;
		top: 10px;
		right: 10px;
		padding: 0px 5px;
	}
	@media (min-width: 768px) {
		.modal-wrapper {
			width: 650px;
		}
	}
</style>