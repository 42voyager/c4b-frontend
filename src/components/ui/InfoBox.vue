<template>
    <div :class="['box-wrapper', activeClass]">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { theme } from '@/config/styles'

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
            theme
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
    background-color: v-bind('theme.colors.white');
    border-color: v-bind('theme.colors.primary.midlight');
}

.warning-style {
    background-color: v-bind('theme.colors.white');
    border-color: v-bind('theme.colors.white');
}

.error-style {
    background-color: v-bind('theme.colors.white');
    border-color: v-bind('theme.colors.error');
}
</style>>