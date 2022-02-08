<template>
    <li v-for="(item, index) of listItems" :key="index">
        <a :href="item.href">
            {{ item.title }}
        </a>
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ListItemsNavBar } from '@/config/variables'

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
    color: #b29475;
}

li:first-child a:hover {
    background-color: #b29475;
    color: white;
    border-radius: 10px;
}

li:first-child a {
    color: #b29475;
}
</style>
