<template>
    <div :class="['box-wrapper', activeClass]">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

type BoxType = 'info' | 'warning' | 'error'

export default defineComponent({
    props: {
        boxType: {
            type: String as PropType<BoxType>,
            default: 'info',
        },
    },
    setup(props) {
        const activeClass = computed(() => {
            if (props.boxType == 'warning') return 'warning-style'
            if (props.boxType == 'error') return 'error-style'
            return 'info-style'
        })
        return {
            activeClass,
        }
    },
})
</script>

<style scoped>
.box-wrapper {
    padding: 12px 20px;
    border-radius: 5px;
}

.info-style {
    background-color: #f6f2ef;
    border-color: #b29475;
}

.warning-style {
    background-color: #cce5ff;
    border-color: #b8daff;
}

.error-style {
    background-color: #cce5ff;
    border-color: #b8daff;
}
</style>>