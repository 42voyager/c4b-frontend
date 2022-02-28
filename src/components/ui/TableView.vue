<template>
    <VueTableLite
        :is-static-mode="true"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :messages="messages"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive } from 'vue'
import VueTableLite from 'vue3-table-lite/ts'

type VueTableLiteColumns = {
    label: string,
    field: string,
    width: string,
    sortable: boolean,
    isKey: boolean
}

export default defineComponent({
    components: {
        VueTableLite,
    },
    props: {
        columns: {
            type: Array as PropType<VueTableLiteColumns[]>,
            required: true
        },
        data: {
            type: Array as PropType<Record<string, unknown>[]>,
            required: true,
        },
    },
    setup(props) {
        const messages = {
            pagingInfo: 'Mostrando {0}-{1} de {2}'
        }
        const table = reactive({
            columns:  props.columns,
            rows: reactive([...props.data]),
            totalRecordCount: computed(() => {
                return props.data.length
            })
        })
        return {
            table,
            messages
        }
    },
})
</script>

<style scoped>
:deep .vtl-paging-change-div {
    display: none
}
:deep .vtl-paging-info {
    flex: 0 0 50%;
    max-width: 50%;
}
:deep .vtl-paging-pagination-div {
    flex: 0 0 50%;
    max-width: 50%;
}
</style>
