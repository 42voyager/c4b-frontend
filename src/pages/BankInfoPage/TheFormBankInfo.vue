<template>
    <div class="two-column">
        <div class="column column-img">
            <img
                class="side-img"
                :src="require('@/assets/' + imageFileName)"
                :alt="altText"
            />
        </div>
        <div class="column-form-wrapper column">
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
                    class=""
                />
            </div>
            <ButtonDefault
                id="btn-bank-info-submit"
                :msg="BankInfoFormConfiguration.submittLabel"
                @buttonClicked="handleSubmit"
            />
        </div>
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
import { c4bApi } from '@/api/C4bApi'
import banksList from '@/config/banksList.json'
import { theme } from '@/config/styles'

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
    props: {
        imageFileName: String,
        altText: String,
    },
    setup() {
        const route = useRoute()
        const hash = route.params.id as string
        const formInfo = ref({
            bankName: '',
            branch: '',
            checkingAccount: '',
            hash: hash
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
                branch:
                    inputValidationStatus.value.branch === EValidity.Invalid,
                checkingAccount:
                    inputValidationStatus.value.checkingAccount ===
                    EValidity.Invalid,
            }
        })

        /** Funcao que faz o request dos dados bancarios para o servidor */
        const handleSubmit = async () => {
            try {
                
                await c4bApi.bankInfo().post(formInfo.value)
                window.location.href = '/contractSign/' + hash
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
            handleSubmit,
            theme
        }
    },
})
</script>

<style scoped>
:deep .wrapper-input {
    width: 310px;
    margin-left: auto;
    margin-right: auto;
}
:deep .default {
    width: 310px;
}
.two-column {
    display: flex;
    width: 100%;
    background-color: v-bind('theme.colors.primary.light');
    flex-direction: column;
    margin-top: 73px;
}
.column {
    width: calc(100% - 100px);
    max-height: calc(100vh - 73px);
}
.column-img {
    overflow: hidden;
    width: 100%;
    display: none;
}
.column-form-wrapper {
    padding: 0 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: v-bind('theme.colors.primary.light');
    background-image: url('~@/assets/side-image-bank.jpg');
    color: v-bind('theme.colors.white');
    height: calc(100vh - 70px);
}
.title {
    text-align: center;
}
.inputs {
    margin: 20px 0px;
}
.side-img {
    height: auto;
    width: 100%;
    min-height: calc(100vh - 70px);
}
@media (min-width: 768px) {
    .column-form-wrapper {
        background-image: none;
        color: v-bind('theme.colors.black');
    }
    .two-column {
        flex-direction: row;
    }
    .column {
        width: 50%;
    }
    .column-img {
        display: block;
    }
    .side-img {
        width: auto;
    }
    :deep .default {
        width: calc(450px - 30px);
    }
    :deep .wrapper-input {
        width: calc(450px - 60px);
    }
    :deep .input-base {
        padding: 5px;
    }
}
@media (min-width: 992px) {
    .side-img {
        height: 915px;
    }
}
@media (min-width: 1260px) {
    .side-img {
        width: 100%;
        transform: translateY(-38%);
        margin-top: 50%;
    }
}
@media (min-width: 1460px) {
    .side-img {
        width: 100%;
        height: auto;
    }
}
</style>
