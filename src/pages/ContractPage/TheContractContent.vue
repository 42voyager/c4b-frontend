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
        <p class="pw-alert">
            A senha é o CNPJ usando . - e /. exemplo: (19.259.103/0001-07)
        </p>
        <iframe :src="pdfString"></iframe>
        <div class="wrapper-checkboxes">
            <CheckboxInput
                v-model="contractData.acceptTerms"
                :nameID="'aceitaTermos'"
                :labelMessage="
                'Li e acepto os Termos e Condições de ' +
                'Relacionamento com o Banco ABC. Declaro que tenho poderes ' +
                'de assinatura pela empresa e autorizo a ' +
                'assinatura eletrônica.'
                "
                :errors="
                    !checkErrorsReturn(messageResponse.AcceptTerms)
                        ? messageResponse.AcceptTerms
                        : ContractConfiguration.text.acceptTerms.errors
                "
                :isInvalid="
                    !checkErrorsReturn(messageResponse.AcceptTerms)
                        ? true
                        : checkboxValidationStatus.acceptTerms ==
                          EValidity.Invalid
                "
            />
            <CheckboxInput
                v-model="contractData.authorizeSCR"
                :nameID="'autorizaSCR'"
                :labelMessage="
                    'Autorizo a Consulta de SCR e da Agenda de ' +
                    'Recebíveis e ac eito os Termos de Sigilo Bancário'
                "
                :errors="
                    !checkErrorsReturn(messageResponse.AuthorizeSCR)
                        ? messageResponse.AuthorizeSCR
                        : ContractConfiguration.text.authorizeSCR.errors
                "
                :isInvalid="
                    !checkErrorsReturn(messageResponse.AuthorizeSCR)
                        ? true
                        : checkboxValidationStatus.authorizeSCR ==
                          EValidity.Invalid
                "
            />
            <CheckboxInput
                v-model="contractData.existsPEP"
                :nameID="'temPEP'"
                :labelMessage="
                'Na empresa, há alguma Pessoa Exposta ' +
                'Publicamente (PEP) em uma função de administração, controle ' +
                'direto ou indireto, direção, procuração ou representação?'
                "
                :errors="
                    !checkErrorsReturn(messageResponse.ExistsPEP)
                        ? messageResponse.ExistsPEP
                        : ContractConfiguration.text.existsPEP.errors
                "
                :isInvalid="
                    !checkErrorsReturn(messageResponse.ExistsPEP)
                        ? true
                        : checkboxValidationStatus.existsPEP ==
                          EValidity.Invalid
                "
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
import { c4bApi } from '@/api/C4bApi'
import { useRoute } from 'vue-router'
import { currencyFormatBR } from '@/use/numberFormatBR'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import SuccessForm from '@/components/common/TheSuccessForm.vue'
import { EValidity, checkErrorsReturn } from '@/use/validInput'
import IContract from '@/types/contract'
import { ContractConfiguration } from '@/config/variables'

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
        const messageResponse = ref({})
        const hash = route.params.id as string
        const checkboxValidationStatus = ref({
            acceptTerms: EValidity.Undefined,
            authorizeSCR: EValidity.Undefined,
            existsPEP: EValidity.Undefined,
        })
        const generateContract = async () => {
            try {
                const contractInfo = await c4bApi.contract().get(hash)
                if (
                    contractInfo.data.acceptTerms == true ||
                    contractInfo.data.authorizeSCR == true ||
                    contractInfo.data.existsPEP == true
                )
                    window.location.href = '/Error'
                pdfString.value = contractInfo.data.contractPdf
            } catch (err: any) {
                window.location.href = '/Error'
            }
        }
        const getCustomerInfo = async () => {
            try {
                const customerInfo = await c4bApi.user().get(hash)
                credit.value = Number(customerInfo.data.limit)
                installments.value = customerInfo.data.installment
            } catch (err: any) {
                window.location.href = '/Error'
            }
        }
        const getBankInfo = async () => {
            try {
                const bankInfo = await c4bApi.bankInfo().get(hash)
                bank.value = bankInfo.data.bankName
                branch.value = bankInfo.data.branch
                account.value = bankInfo.data.checkingAccount
                contractData.value.customerID = bankInfo.data.customerID
            } catch (err: any) {
                window.location.href = '/Error'
            }
        }
        const validFrontSign = (sign: IContract) => {
            const newStatus = { ...checkboxValidationStatus.value }
            if (sign.acceptTerms == false)
                newStatus.acceptTerms = EValidity.Invalid
            else newStatus.acceptTerms = EValidity.Valid
            if (sign.authorizeSCR == false)
                newStatus.authorizeSCR = EValidity.Invalid
            else newStatus.authorizeSCR = EValidity.Valid
            if (sign.existsPEP == false) newStatus.existsPEP = EValidity.Invalid
            else newStatus.existsPEP = EValidity.Valid
            checkboxValidationStatus.value = newStatus
            if (
                checkboxValidationStatus.value.acceptTerms == EValidity.Valid &&
                checkboxValidationStatus.value.authorizeSCR ==
                    EValidity.Valid &&
                checkboxValidationStatus.value.existsPEP == EValidity.Valid
            )
                return true
            else return false
        }
        const signContract = async () => {
            if (!validFrontSign(contractData.value)) return
            try {
                await c4bApi.contract().put(contractData.value)
                wasContractSigned.value = true
                messageResponse.value = {}
            } catch (err: any) {
                wasContractSigned.value = false
                messageResponse.value = err.response.data.errors
            }
        }
        const handleSuccessModalClose = () => {
            window.location.href = '/'
        }
        onBeforeMount(async () => {
            await getCustomerInfo()
            await generateContract()
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
            messageResponse,
            ContractConfiguration,
            checkErrorsReturn,
            checkboxValidationStatus,
            EValidity,
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
