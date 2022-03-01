<template>
    <div class="wrapper-circle">
            <Circle
                class="circle"
                v-for="(step, index) of list"
                :key="index"
                :color="step ? theme.colors.primary.dark : theme.colors.primary.midlight"
                height="20"
                width="20"
                />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Circle from '@/components/icons/Circle.vue'
import { theme } from '@/config/styles'

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
    setup() {
        return {
            theme
        }
    }
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