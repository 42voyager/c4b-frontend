<template>
    <div class="wrapper-footer">
        <div
            v-for="(item, index) of FooterConfiguration.list"
            :key="index"
            class="footer-col"
        >
            <h3>{{ item.title }}</h3>
            <a v-if="item.link.length > 0" :href="item.link" target="_blank">
                <p>{{ item.text }}</p>
            </a>
            <p v-else>{{ item.text }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { theme } from '@/config/styles'
import { FooterConfiguration } from '@/config/variables'
import { defineComponent } from 'vue-demi'

export default defineComponent({
    name: 'TheFooter',
    setup() {
        return {
            theme,
            FooterConfiguration,
        }
    },
})
</script>

<style scoped>
.wrapper-footer {
    width: calc(100% - 60px);
    padding: 40px 30px 10px 30px;
    background-color: v-bind('theme.colors.black');
    margin-left: 0;
    margin-right: 0;
    color: v-bind('theme.colors.white');
    display: flex;
    text-align: left;
    flex-direction: column;
}
.footer-col {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
}
p {
    font-size: 14px;
    font-weight: 300;
}

a {
    text-decoration: none;
    color: v-bind('theme.colors.white');
}

p:hover {
    text-decoration: underline;
}
@media (min-width: 768px) {
    .wrapper-footer {
        flex-direction: row;
    }
    .footer-col {
        width: 25%;
        text-align: left;
    }
}
</style>