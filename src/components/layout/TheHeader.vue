<template>
    <header class="header">
        <div class="wrapper-logo">
            <a href="/"
                ><img src="@/assets/logo-abc.png" alt="Logo Banco ABC"
            /></a>
        </div>
        <button class="toggle-menu" v-on:click="onClicked()">
            <MenuButton />
        </button>
        <ul id="menu" class="nav-bar" v-bind:class="{ hidden: isCollapsed }">
            <slot name="menu-list" />
        </ul>
    </header>
</template>

<script lang="ts">
import MenuButton from '@/components/icons/MenuButton.vue'
import { defineComponent, ref } from 'vue'
import { theme } from '@/config/styles'

export default defineComponent({
    components: {
        MenuButton,
    },
    setup() {
        const isCollapsed = ref(true)

        const onClicked = (): void => {
            isCollapsed.value = isCollapsed.value ? false : true
        }
        return {
            onClicked,
            isCollapsed,
            theme,
        }
    },
})
</script>

<style scoped>
.header {
    display: flex;
    position: fixed;
    width: 100%;
    top: 0;
    padding: 7px 15px;
    background-color: v-bind('theme.colors.white');
    align-items: center;
    z-index: 99;
    box-shadow: 5px 5px 5px rgba(187, 187, 187, 0.5);
}
.nav-bar {
    position: absolute;
    list-style-type: none;
    padding: 15px 5px;
    width: 100%;
    background-color: v-bind('theme.colors.white');
    margin-left: -15px;
    margin-right: -15px;
    margin-top: 180px;
    margin-bottom: 0;
    z-index: 99999;
}
.hidden {
    display: none;
}
.wrapper-logo img {
    width: 60px;
}
.toggle-menu {
    margin-left: auto;
    margin-right: 35px;
    background: none;
    border: none;
    width: 30px;
}
.toogle-menu svg {
    width: 60px;
}
@media (min-width: 768px) {
    .nav-bar {
        position: relative;
        display: flex;
        margin-top: 0;
        margin-left: auto;
        padding-right: 30px;
        padding-left: 30px;
        width: auto;
    }
    .wrapper-logo img {
        width: unset;
    }
    .toggle-menu {
        display: none;
    }
}
</style>
