<template>
	<div v-if="pageReady">
		<div class="wrapper-contract-info">
			<div class="info-valor">
				<p>Valor a receber:</p>
				<p class="info">R${{ currencyFormatBR(credit) }}</p>
			</div>
			<div class="info-valor">
				<p>Forma de pagamento:</p>
				<p class="info">{{ installments }}x mensais</p>
			</div>
			<div class="info-banco">
				<p>Dados bancários para crédito</p>
				<p>
					<span
						><b>Banco: {{ bank }}</b></span
					>
					<span
						><b>Agência: {{ branch }}</b></span
					>
					<span
						><b>Conta: {{ account }}</b></span
					>
				</p>
			</div>
		</div>
		<p class="pw-alert">A senha é o CNPJ usando . - e /. exemplo: (19.259.103/0001-07)</p>
		<iframe :src="pdfString"></iframe>
		<div class="wrapper-checkboxes">
			<CheckboxInput
				v-model="contractData.acceptTerms"
				:nameID="'aceitaTermos'"
				:labelMessage="'Li e acepto os Termos e Condições de Relacionamento com o Banco ABC. Declaro que tenho poderes de assinatura pela empresa e autorizo a assinatura eletrônica.'"
			/>
			<CheckboxInput
				v-model="contractData.authorizeSCR"
				:nameID="'autorizaSCR'"
				:labelMessage="'Autorizo a Consulta de SCR e da Agenda de Recebíveis e ac eito os Termos de Sigilo Bancário'"
			/>
			<CheckboxInput
				v-model="contractData.existsPEP"
				:nameID="'temPEP'"
				:labelMessage="'Na empresa, há alguma Pessoa Exposta Publicamente (PEP) em uma função de administração, controle direto ou indireto, direção, procuração ou representação?'"
			/>
			<ButtonDefault
				id="btn-submit-request-credit"
				msg="Assinar"
				@buttonClicked="signContract"
			/>
			<SuccessForm
				v-if="wasContractSigned"
				buttonLabel="Finalizar"
				:messages="['Contrato assinado']"
				@newRequestClicked="handleSuccessModalClose"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue-demi'
import C4bApi from '@/api/C4bApi'
import { useRoute } from 'vue-router'
import { currencyFormatBR } from '@/use/numberFormatBR'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import SuccessForm from '@/components/common/TheSuccessForm.vue'

export default defineComponent({
    components: {
        CheckboxInput,
        ButtonDefault,
        SuccessForm,
    },
    setup() {
        const pdfString = ref('')
        const credit = ref(0)
        const installments = ref('')
        const bank = ref('')
        const branch = ref('')
        const account = ref('')
        const pageReady = ref(false)
        const wasContractSigned = ref(false)
        const route = useRoute()
        const contractData = ref({
            customerID: 1,
            ContractPdf: pdfString,
            acceptTerms: false,
            authorizeSCR: false,
            existsPEP: false,
        })
        const hash = route.params.id as string
        const generateContract = async () => {
            try {
                const contractInfo = await new C4bApi().getContract(hash)
                pdfString.value = contractInfo.data.contractPdf
            } catch (err: any) {
                window.location.href = '/Error'
            }
        }
        const getCustomerInfo = async () => {
            try {
                const customerInfo = await new C4bApi().getCustomerInfo(hash)
                credit.value = Number(customerInfo.data.limit)
                installments.value = customerInfo.data.installment
            } catch (err: any) {
                window.location.href = '/Error'
            }
        }
        const getBankInfo = async () => {
            try {
                const bankInfo = await new C4bApi().getBankInfo(hash)
                bank.value = bankInfo.data.bankName
                branch.value = bankInfo.data.branch
                account.value = bankInfo.data.checkingAccount
                contractData.value.customerID = bankInfo.data.customerID
            } catch (err: any) {
                window.location.href = '/Error'
            }
        }
        const signContract = async () => {
            try {
                await new C4bApi().postContract(contractData.value)
                wasContractSigned.value = true
            } catch (err: any) {
                wasContractSigned.value = false
            }
        }
        const handleSuccessModalClose = () => {
            window.location.href = '/'
        }
        onBeforeMount(async () => {
            await generateContract()
            await getCustomerInfo()
            await getBankInfo()
            pageReady.value = true
        })
        return {
            pdfString,
            credit,
            installments,
            bank,
            branch,
            account,
            currencyFormatBR,
            contractData,
            signContract,
            wasContractSigned,
            handleSuccessModalClose,
            pageReady,
        }
    },
})
</script>
<style scoped>
.wrapper-contract-info {
    display: flex;
    flex-flow: column;
    margin-top: 81px;
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 30px;
    padding-right: 30px;
    justify-content: center;
}
.info-valor {
    padding: 20px 30px;
    background-color: #b2937548;
}
.info-banco {
    padding: 20px 30px;
    background-color: #e7d9cb48;
}
.info-banco span {
    margin-right: 15px;
}
iframe {
    display: block;
    width: 970px;
    max-width: 100%;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
}
.wrapper-checkboxes {
    width: 970px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
    padding-bottom: 30px;
}
.pw-alert {
	padding-left: 30px;
	padding-right: 30px;
	text-align: center;
}
@media (min-width: 992px) {
    .wrapper-contract-info {
        flex-flow: row;
    }
}
</style>
