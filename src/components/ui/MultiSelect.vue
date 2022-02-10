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
        }
    },
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.default {
    max-width: 100%;
    font-size: 18px;
    margin: 10px 0 !important;
}
:deep .multiselect__content-wrapper::-webkit-scrollbar {
    width: 12px;
}
:deep .multiselect__content-wrapper::-webkit-scrollbar-thumb {
    background: #ddb893;
    /* border-radius: 10px; */
    height: 30px;
}
:deep .multiselect__content-wrapper::-webkit-scrollbar-thumb:hover {
    background: #c09f7f;
}
:deep .multiselect__content-wrapper::-webkit-scrollbar-track {
    background: #fcf6f0;
}
:deep .multiselect__option {
    white-space: normal;
    line-height: 22px;
}
:deep .multiselect__placeholder {
    font-size: 18px !important;
    color: rgb(116, 114, 114) !important;
    padding: 0;
    margin-bottom: 0px;
}
:deep .multiselect__single {
    font-size: 18px !important;
    color: black !important;
    padding: 0;
    margin-bottom: 0;
}
:deep .multiselect__tags {
    padding: 14px !important;
    border-radius: 2px;
    border: solid 1px #8d6236;

}

:deep .multiselect__tags:hover {
    border: solid 1px #b29475;
    box-shadow: 5px 5px 5px rgb(187 187 187 / 50%);
}

:deep .multiselect__select {
    top: 10px;
    Z-index: 1;
}
</style>
