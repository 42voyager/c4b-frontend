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
            {{ ContractConfiguration.text.pw_exemple }}
        </p>
        <iframe :src="pdfString"></iframe>
        <div class="wrapper-checkboxes">
            <CheckboxInput
                v-for="(item, index) of ContractConfiguration.text.list"
                :key="index"
                v-model="contractData[item.name]"
                :nameID="item.name"
                :labelMessage="item.text"
                :errors="
                    !checkErrorsReturn(messageResponse[capitalize(item.name)])
                        ? messageResponse[capitalize(item.name)]
                        : item.errors
                "
                :isInvalid="
                    !checkErrorsReturn(messageResponse[capitalize(item.name)])
                        ? true
                        : checkboxValidationStatus[item.name] ==
                          EValidity.Invalid
                "
            />
            <div class="div-btn">
                <ButtonDefault
                    id="btn-submit-request-credit"
                    msg="Assinar"
                    @buttonClicked="signContract"
                />
            </div>
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
import { EValidity, checkErrorsReturn, capitalize } from '@/use/validInput'
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
            capitalize
        }
    },
})
</script>
<style scoped>
:deep .wrapper-checkbox {
    margin-left: 30px;
    margin-right: 30px;
    width: unset;
}
.div-btn {
    text-align: center;
}
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
