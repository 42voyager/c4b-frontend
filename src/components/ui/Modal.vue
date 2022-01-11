<template>
    <div class="modal-bg">
        <div class="modal-wrapper">
            <ButtonDefault msg="X" @buttonClicked="closeModal()" />
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import ButtonDefault from './ButtonDefault.vue'

export default defineComponent({
    components: {
        ButtonDefault
    },
    emits: ['buttonXModal'],
    setup(props, context){
        const closeModal = () => {
            context.emit('buttonXModal')
        }
        return {
            closeModal
        }
    }
})
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
        display: flex;
        flex-direction: column;
        justify-content: center;
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