<template>
    <div class="slider-wrapper">
        <input
            class="slider-input"
            v-bind="$attrs"
            type="range"
            :value="modelValue"
            @input="$emit('update:modelValue', Number($event.target.value))"
        />
        <div class="min-max-wrapper" v-show="showLabels">
            <p>{{ minLabel }}</p>
            <p>{{ maxLabel }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { theme } from '@/config/styles'

/**
 * Component utilizado para input numerico do tipo slider
 * @prop {Boolean} showLabels - Condição para habilitar os labels no 
 * extremo do slider
 * @prop {number} modelValue - valor selecionado do input
 * @prop {string} minLabel - label para indicar o valor minimo
 * @prop {string} maxLabel - label para indicar o valor maximo
 */
export default defineComponent({
    props: {
        showLabels: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: Number,
            required: true,
        },
        minLabel: {
            type: String,
            required: true,
        },
        maxLabel: {
            type: String,
            required: true,
        },
    },
    inheritAttrs: false,
    setup() {
        return
    }
})
</script>

<style scoped>
.slider-wrapper {
    display: flex;
    justify-content: center;
    padding: 15px 0px;
    width: 100%;
}
.slider-input {
    -webkit-appearance: none;
    height: 25px;
    background: v-bind('theme.colors.primary.light');
    border-radius: 25px;
    outline: none;
    opacity: 0.7;
    overflow: hidden;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    width: calc(80% - 30px);
}
.slider-input:hover {
    opacity: 1;
}

.slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: v-bind('theme.colors.primary.dark');
    box-shadow: -500px 0 0 490px v-bind('theme.colors.primary.mid');
    cursor: pointer;
    border: none;
}

.slider-input::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: v-bind('theme.colors.primary.dark');
    cursor: pointer;
    border: none;
}
.min-max-wrapper {
    display: flex;
    justify-content: space-between;
}
.slider-input::-webkit-slider-runnable-track {
    color: v-bind('theme.colors.primary.light');
    height: 25px;
}
.slider-input::-moz-range-progress {
    background-color: v-bind('theme.colors.primary.light');
    height: 25px;
}
.slider-input::-moz-range-track {
    background-color: v-bind('theme.colors.primary.light');
    height: 25px;
}
.slider-input::-ms-fill-lower {
    background-color: v-bind('theme.colors.primary.light');
    height: 25px;
}
.slider-input::-ms-fill-upper {
    background-color: v-bind('theme.colors.primary.light');
    height: 25px;
}
</style>
