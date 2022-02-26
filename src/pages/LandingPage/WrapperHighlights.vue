<template>
    <div class="highlights container">
        <div class="wrapper-title">
            <h2>{{ pontosForte.title }}</h2>
        </div>
        <div class="wrapper-highlights">
            <Highlight
                v-for="(item, index) of pontosForte.pontos"
                :key="index"
                :title="item.title"
                :description="item.description"
                :imageFileName="item.image"
                :altText="item.altText"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Highlight from '@/components/common/HighlightItem.vue'
import { defineComponent, PropType } from 'vue-demi'
import { theme } from '@/config/styles'

interface IPontosForte {
    title: string
    pontos: [
        {
            title: string
            description: string
            image: string
            altText: string
        }
    ]
}

/**
 * Componente para informações de destaque
 * @props {Object} pontosForte - Um objeto contendo todos os dados utilizado no
 * component
 * @interface IPontosForte - interface utilizada para o props pontosForte
 */
export default defineComponent({
    props: {
        pontosForte: Object as PropType<IPontosForte>,
    },
    components: {
        Highlight,
    },
    setup() {
        return {
            theme
        }
    }
})
</script>

<style scoped>
.highlights {
    padding-bottom: 30px;
}
.wrapper-title {
    width: 100%;
}
.wrapper-highlights {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
@media (min-width: 768px) {
    .wrapper-highlights {
        flex-direction: row;
    }
    .highlights {
        padding-top: 60px;
        padding-bottom: 60px;
    }
}
</style>