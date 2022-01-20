<template>
    <div class="wrapper-circle">
        <!-- <input
            class="slide-wizard"
            type="range"
            name=""
            id=""
            > -->

            <Circle
                class="circle"
                v-for="(step, index) of list"
                :key="index"
                :color="step ? '#64380c' : '#b29475'"
                height="20"
                width="20"
                />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Circle from '@/components/icons/Circle.vue'

export default defineComponent({
    components: {
        Circle
    },
    props: {
        list: {
            type: Array,
            default: () => {[true]}
        }
    },
}) 
</script>

<style scoped>
.wrapper-circle {
    display: flex;
    justify-content: center;
}
.circle {
    margin-left: 20px;
}
.circle:first-child {
    margin-left: 0;
}
</style>