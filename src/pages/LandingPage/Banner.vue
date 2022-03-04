<template>
    <div class="banner">
        <img src="@/assets/banner/banner.jpg" alt="">
        <div class="text-banner">
            <h1>{{ titleBanner }}</h1>
            <p>{{ textBanner }}</p>
            <ButtonDefault
                msg="Solicite seu crédito"
                id="btn-banner"
                @buttonClicked="goToElement('column-two')"
                />
        </div>
        <div class="banner-overlay"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import { TitleBanner, TextBanner } from '@/config/variables'
import { goToElement } from '@/use/navigation'
import { theme } from '@/config/styles'

export default defineComponent({
    components: {
        ButtonDefault
    },
    setup() {
        return {
            titleBanner: TitleBanner,
            textBanner: TextBanner,
            goToElement,
            theme
        }
    }
})
</script>

<style scoped>
button {
    padding: 20px 25px;
}
.banner {
    position: relative;
    z-index: 1;
    margin-top: 65px;
    height: calc(100vh - 69px);
    overflow: hidden;
}

.banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: v-bind('theme.colors.primary.darker');
    display: block;
    z-index: 9;
    opacity: 0.5;
}

.text-banner {
    color: v-bind('theme.colors.white');
    position: absolute;
    left: 50%;
    bottom: 20px;
    max-width: 280px;
    text-align: left;
    font-size: 13px;
    z-index: 10;
    text-align: center;
    transform: translateX(-50%);
}

.banner img {
    width: auto;
    height: 100vh;
    transform: translateX(-50%);
}
@media (min-width: 768px) {
    .banner {
        margin-top: 75px;
        height: calc(100vh - 75px);
    }
    .text-banner {
        font-size: 23px;
        left: 90px;
        bottom: 90px;
        text-align: left;
        width: auto;
        max-width: 500px;
        transform: translateX(0);
    }
    .banner img {
        transform: translateX(0);
    }
}
@media (min-width: 992px) {
    .banner img {
        height: unset;
        object-fit: cover;
        width: 100%;
    }
}
</style>