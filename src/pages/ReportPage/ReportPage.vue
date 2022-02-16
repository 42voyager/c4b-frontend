<template>
    <div class="report-page">
        <Header />
        <div class="wrapper-table">
            <div class="wrapper-top-bar">
                <h1 class="title">Relatorio de Clientes C4b</h1>
                <ButtonDefault
                    :v-if="data.length > 0"
                    msg="Descargar como .csv"
                    @buttonClicked="handleDownload()"
                />
            </div>
            <TableView
                :columns="tableColumns"
                v-if="data.length > 0"
                :data="data"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { c4bApi } from '@/api/C4bApi'
import Papa from 'papaparse'
import { defineComponent, ref, onBeforeMount } from 'vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import Header from '@/components/layout/TheHeader.vue'
import TableView from '@/components/ui/TableView.vue'

export default defineComponent({
    components: {
        Header,
        TableView,
        ButtonDefault,
    },
    setup() {
        const data = ref([])

        const handleDownload = () => {
            const csv = Papa.unparse(data.value as any)
            console.log(csv)
            const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
            const csvURL = window.URL.createObjectURL(csvData)
            var testLink = document.createElement('a')
            testLink.href = csvURL
            testLink.setAttribute('test', 'test.csv')
            testLink.click()
        }

        /** Fetching o report de usuarios */
        onBeforeMount(async () => {
            const res = await c4bApi.report().get('')
            data.value = res.data
        })
        return {
            data,
            tableColumns,
            handleDownload,
        }
    },
})

const tableColumns = [
    {
        label: 'Nome',
        field: 'name',
        width: '3%',
        sortable: true,
        isKey: false,
    },
    {
        label: 'E-mail',
        field: 'email',
        width: '3%',
        sortable: true,
        isKey: false,
    },
    {
        label: 'Celular',
        field: 'cellphone',
        width: '3%',
        sortable: true,
        isKey: false,
    },
    {
        label: 'CNPJ',
        field: 'cnpj',
        width: '3%',
        sortable: true,
        isKey: false,
    },
    {
        label: 'Company',
        field: 'company',
        width: '3%',
        sortable: true,
        isKey: false,
    },
    {
        label: 'Credito (R$)',
        field: 'limit',
        width: '3%',
        sortable: true,
        isKey: false,
    },
    {
        label: 'Prazos (Meses)',
        field: 'installment',
        width: '3%',
        sortable: true,
        isKey: false,
    },
    {
        label: 'Motivo',
        field: 'reason',
        width: '3%',
        sortable: true,
        isKey: false,
    },
    {
        label: 'Status',
        field: 'status',
        width: '3%',
        sortable: true,
        isKey: false,
    },
]
</script>

<style scoped>
.title {
	margin-right: 20px;
}
.wrapper-top-bar {
	padding-top: 20px;
	align-items: center;
	display: flex;
	flex-direction: row;
}
.wrapper-table {
    margin: 80px 20px;
}
</style>
