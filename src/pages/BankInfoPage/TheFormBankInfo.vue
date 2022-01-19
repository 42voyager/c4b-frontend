<template>
    <div class="form-wrapper">
        <div class="title">
            <h2>{{ BankInfoFormConfiguration.title }}</h2>
        </div>

        <div class="inputs">
            <MultiSelect
                placeholder="Nome do Banco"
                :options="banksListSum"
                v-model="formInfo.bankName"
                :allow-empty="false"
                :isInvalid="inputIsInvalid.bankName"
                :errors="inputsErrors.bankName"
            />
            <FormTextInput
                v-for="(
                    item, index
                ) of BankInfoFormConfiguration.formInputsInfo"
                v-maska="item.mask"
                :name="item.name"
                :key="index"
                :type="item.type"
                :placeholder="item.placeholder"
                :isInvalid="inputIsInvalid[item.name]"
                :errors="inputsErrors[item.name]"
                v-model="formInfo[item.name]"
            />
            <SuccessForm
                v-if="wasFormSubmitted"
                buttonLabel="Finalizar"
                :messages="['Recebemos seus dados']"
                @newRequestClicked="handleSuccessModalClose"
            />
        </div>
        <ButtonDefault
            :msg="BankInfoFormConfiguration.submittLabel"
            @buttonClicked="handleSubmit"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import MultiSelect from '@/components/ui/MultiSelect.vue'
import SuccessForm from '@/components/common/TheSuccessForm.vue'
import { BankInfoFormConfiguration } from '@/config/variables'
import { EValidity, checkErrorsReturn } from '@/use/validInput'
import C4bApi from '@/api/C4bApi'
import banksList from '@/config/banksList.json'

interface BankInfo {
    ShortName: string
    COMPE: string
}

const initialInputErrors = {
    bankName: [],
    branch: [],
    checkingAccount: [],
}

const initialInputValidationStatus = {
    bankName: EValidity.Undefined,
    branch: EValidity.Undefined,
    checkingAccount: EValidity.Undefined,
}

export default defineComponent({
    components: {
        FormTextInput,
        ButtonDefault,
        MultiSelect,
        SuccessForm,
    },
    setup() {
        const route = useRoute()
        const formInfo = ref({
            bankName: '',
            branch: '',
            checkingAccount: '',
        })
        const inputsErrors = ref(initialInputErrors)
        const inputValidationStatus = ref(initialInputValidationStatus)
        const wasFormSubmitted = ref(false)
        const banksListSum = banksList.map((bank: BankInfo) => {
            return `${bank.COMPE} - ${bank.ShortName}`
        })
        const inputIsInvalid = computed(() => {
            return {
                bankName:
                    inputValidationStatus.value.bankName === EValidity.Invalid,
                branch: inputValidationStatus.value.branch === EValidity.Invalid,
                checkingAccount:
                    inputValidationStatus.value.checkingAccount ===
                    EValidity.Invalid,
            }
        })

        /** Funcao que vai redireccionar o usuario para a landing page */
        const handleSuccessModalClose = () => {
            window.location.href = '/'
        }

        /** Funcao que faz o request dos dados bancarios para o servidor */
        const handleSubmit = async () => {
            try {
                await new C4bApi().postBankInfo({
                    ...formInfo.value,
                    hash: route.params.id as string,
                })
                wasFormSubmitted.value = true
            } catch (error: any) {
                const newStatus = { ...initialInputValidationStatus }
                const newErrors = { ...initialInputErrors }

                if (!checkErrorsReturn(error.response.data.errors.BankName)) {
                    newErrors.bankName = error.response.data.errors.BankName
                    newStatus.bankName = EValidity.Invalid
                }
                if (!checkErrorsReturn(error.response.data.errors.Branch)) {
                    newErrors.branch = error.response.data.errors.Branch
                    newStatus.branch = EValidity.Invalid
                }
                if (
                    !checkErrorsReturn(
                        error.response.data.errors.CheckingAccount
                    )
                ) {
                    newErrors.checkingAccount =
                        error.response.data.errors.CheckingAccount
                    newStatus.checkingAccount = EValidity.Invalid
                }
                inputValidationStatus.value = newStatus
                inputsErrors.value = newErrors
            }
        }

        return {
            formInfo,
            inputValidationStatus,
            inputIsInvalid,
            inputsErrors,
            banksListSum,
            wasFormSubmitted,
            BankInfoFormConfiguration,
            handleSuccessModalClose,
            handleSubmit,
        }
    },
})
</script>

<style scoped>
.form-wrapper {
    margin-top: 65px;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #e0ccba;
}
.title {
    text-align: center;
}
.inputs {
    width: calc(100% - 40px);
    max-width: 500px;
    margin: 20px 0px;
}

@media (min-width: 768px) {
    .form-wrapper {
        height: calc(100vh - 300px);
    }
}
</style>
