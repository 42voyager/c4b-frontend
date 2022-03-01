<template>
    <VueMultiselect
        class="default"
        v-bind="$attrs"
        v-model="value"
        :options="options"
        :showLabels="false"
    >
    </VueMultiselect>
    <div v-show="isInvalid">
        <InputError :msg="errors" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import InputError from '@/components/ui/InputError.vue'
import VueMultiselect from 'vue-multiselect'
import { theme } from '@/config/styles'

export default defineComponent({
    components: {
        VueMultiselect,
        InputError,
    },
    props: {
        isInvalid: {
            type: Boolean,
            default: false,
        },
        errors: {
            type: Array as PropType<string[]>,
            default: () => {
                return ['']
            },
        },
        options: {
            type: Array,
            required: true,
        },
    },
    inheritAttrs: false,
    setup() {
        const value = ref('')

        return {
            value,
            theme
        }
    },
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.default {
    max-width: 100%;
    font-size: 14px;
    margin: 10px auto !important;
    width: 310px;
}
:deep .multiselect__content-wrapper::-webkit-scrollbar {
    width: 12px;
}
:deep .multiselect__content-wrapper::-webkit-scrollbar-thumb {
    background: v-bind('theme.colors.primary.light');
    height: 30px;
}
:deep .multiselect__content-wrapper::-webkit-scrollbar-thumb:hover {
    background: v-bind('theme.colors.primary.midlight');
}
:deep .multiselect__content-wrapper::-webkit-scrollbar-track {
    background: v-bind('theme.colors.primary.lightest');
}
:deep .multiselect__option {
    white-space: normal;
    line-height: 1.2;
}
:deep .multiselect__option span {
    padding: 7px 14px;
}
:deep .multiselect__placeholder {
    font-size: 18px !important;
    color: v-bind('theme.colors.grays.dark') !important;
    padding: 0;
    margin-bottom: 0px;
}
:deep .multiselect__single {
    font-size: 14px !important;
    color: v-bind('theme.colors.black');
    padding: 0;
    margin-bottom: 0;
}
:deep .multiselect__tags {
    padding: 7px 14px !important;
    border-radius: 2px;
    border: solid 1px v-bind('theme.colors.primary.mid');
}

:deep .multiselect__tags:hover {
    border: solid 1px v-bind('theme.colors.primary.midlight');
    box-shadow: 5px 5px 5px rgb(187 187 187 / 50%);
}

:deep .multiselect__select {
    z-index: 1;
}
</style>
