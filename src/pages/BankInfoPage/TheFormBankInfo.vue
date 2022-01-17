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
import { Validity, checkErrorsReturn } from '@/use/validInput'
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
    bankName: Validity.Undefined,
    branch: Validity.Undefined,
    checkingAccount: Validity.Undefined,
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
        altText: String
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
                    inputValidationStatus.value.bankName === Validity.Invalid,
                branch: inputValidationStatus.value.branch === Validity.Invalid,
                checkingAccount:
                    inputValidationStatus.value.checkingAccount ===
                    Validity.Invalid,            }
        })

        /** Função que vai redirecionar o usuário para a landing page */
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
                    newStatus.bankName = Validity.Invalid
                }
                if (!checkErrorsReturn(error.response.data.errors.Branch)) {
                    newErrors.branch = error.response.data.errors.Branch
                    newStatus.branch = Validity.Invalid
                }
                if (
                    !checkErrorsReturn(
                        error.response.data.errors.CheckingAccount
                    )
                ) {
                    newErrors.checkingAccount =
                        error.response.data.errors.CheckingAccount
                    newStatus.checkingAccount = Validity.Invalid
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
.two-column {
  display: flex;
  width: 100%;
  background-color: #e0ccba;
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
    background-color: #e0ccba;
    background-image: url('~@/assets/side-image-bank.jpg');
    color: white;
    height: calc(100vh - 70px);
}
.title {
    text-align: center;
}
.inputs {
    width: calc(100% - 40px);
    max-width: 500px;
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
        color: black;
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
