<template>
    <li v-for="(item, index) of listItems" :key="index">
        <a v-on:click="goToElement(item.href)">
            {{ item.title }}
        </a>
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ListItemsNavBar } from '@/config/variables'
import { goToElement } from '@/use/navigation'
import { theme } from '@/config/styles'

export interface IitemsNavBar {
    title: string
    href: string
}

export default defineComponent({
    props: {
        listItems: {
            type: Object as PropType<IitemsNavBar[]>,
            default: ListItemsNavBar,
        },
    },
    setup() {
        return {
            goToElement,
            theme,
        }
    },
})
</script>

<style scoped>
li {
    display: block;
    margin: 7px 10px;
    padding: 0px;
}

li a {
    padding: 15px;
}

a:hover {
    color: v-bind('theme.colors.primary.midlight');
}

li:first-child a:hover {
    background-color: v-bind('theme.colors.primary.midlight');
    color: v-bind('theme.colors.white');
    border-radius: 10px;
}

li:first-child a {
    color: v-bind('theme.colors.primary.midlight');
}
</style>
