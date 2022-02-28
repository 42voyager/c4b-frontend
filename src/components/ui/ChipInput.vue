<template>
    <div
        class="chip-input"
        v-on:click="clicked()"
        :class="{ checked: isChecked }"
    >
        <label class="label-chip" :for="id">{{ label }}</label>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { theme } from '@/config/styles'

/**
 * Componente para chips clicáveis
 * @prop {String[]} label - texto do botão
 * @prop {String} id - id do botão
 * @prop {String, Number} value - value do botão
 * @prop {Boolean} isChecked - Boolean para saber se o elemento foi clicado.
 * @event chipClicked - Evento Acionado quando el botão é clicado.
 */
export default defineComponent({
    props: {
        label: String,
        id: String,
        name: String,
        value: [String, Number],
        isChecked: Boolean,
    },
    emits: ['chipClicked'],
    setup(props, context) {
        const clicked = (): void => {
            context.emit('chipClicked')
        }
        return {
            clicked,
            theme,
        }
    },
})
</script>

<style scoped>
.label-chip {
    background-color: v-bind('theme.colors.primary.mid');
    color: v-bind('theme.colors.white');
    padding: 6px 16px;
    margin: 10px;
    width: 100%;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    white-space: nowrap;
    font-size: 14px;
}
.label-chip:hover {
    background-color: v-bind('theme.colors.secondary.mid');
}
.checkbox-chip {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
.chip-input.checked .label-chip {
    background-color: v-bind('theme.colors.secondary.middark');
}
</style>