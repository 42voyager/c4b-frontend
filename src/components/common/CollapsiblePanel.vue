<template>
    <div class="wrapper-panel">
        <div
            class="header-panel"
            :class="{ 'rounded-border': isCollapsed }"
            v-on:click="onHeaderClicked()"
        >
            <h3 class="title">
                {{ title }}
            </h3>
            <Caret
                color="#b29475"
                width="30"
                height="30"
                :isCollapsed="isCollapsed"
            />
        </div>
        <div class="content" v-bind:class="{ hidden: isCollapsed }">
            <div class="content-inner">
                {{ content }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Caret from '@/components/icons/Caret.vue'
import { defineComponent, ref } from 'vue'
import { theme } from '@/config/styles'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: 'Title',
        },
        content: {
            type: String,
            default: 'content',
        },
    },
    components: {
        Caret,
    },
    setup() {
        const isCollapsed = ref(true)

        const onHeaderClicked = (): void => {
            isCollapsed.value = isCollapsed.value ? false : true
        }
        return {
            onHeaderClicked,
            isCollapsed,
            theme
        }
    },
})
</script>

<style scoped>
.wrapper-panel {
    display: flex;
    flex-direction: column;
}
.rounded-border {
    border-radius: 15px;
}
.header-panel {
    display: flex;
    justify-content: space-between;
    border: 1px solid v-bind('theme.colors.black');
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    color: v-bind('theme.colors.primary.midlight');
    padding: 15px 30px;
    cursor: pointer;
    background-color: v-bind('theme.colors.black');
}
.header-panel svg {
    transition: all 0.25s linear;
}
.content {
    height: auto;
    transition: all 0.25s linear;
    overflow: hidden;
    border-bottom: 1px solid v-bind('theme.colors.primary.midlight');
    border-left: 1px solid v-bind('theme.colors.primary.midlight');
    border-right: 1px solid v-bind('theme.colors.primary.midlight');
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    opacity: 1;
}
.content-inner {
    padding: 15px 30px;
}
.title {
    padding: 5px;
}
.hidden {
    height: 0;
    padding: 0;
    opacity: 0;
    border: none;
}
</style>