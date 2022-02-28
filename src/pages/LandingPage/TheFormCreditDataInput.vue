<template>
    <transition name="show-user-credit">
        <div class="container-credit">
            <p class="creditLabel">De quanto seu negócio precisa</p>
            <FormCurrencyInput
                class="creditInput"
                placeholder="R$ 0,00"
                is-valid="true"
                :errors="[]"
                v-model="credit"
                :currencyOptions="currencyOptions"
            />
            <p class="creditLabel">Em quantas vezes você quer pagar?</p>
            <FormTextInput
                class="installmentInput"
                type="number"
                min="6"
                max="36"
                placeholder="Quantos meses"
                is-valid="true"
                :errors="[]"
                v-model="installments"
            />
            <InfoBox class="info-box">
                <p>
                    Faturamento mensual recomendado seria:
                    <b> R$ {{ minIncome }} </b>
                </p>
            </InfoBox>
            <div class="input-wrapper">
                <p class="creditLabel">
                    {{ creditData.text.titleMotivo }}
                </p>
                <MultiSelect
                    :options="creditData.text.listReasons"
                    v-model="reason"
                />
                <FormTextInput
                    v-if="reason === others"
                    v-model="reasonOthers"
                    placeholder="Motivo"
                    name="Motivo"
                />
                <div v-show="isInvalid">
                    <InputError :msg="creditData.text.errors" />
                </div>
            </div>
            <div class="btn-next">
                <ButtonDefault
                    id="btn-step-next-text-input"
                    msg="Continuar"
                    @buttonClicked="handleSubmit()"
                />
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { CurrencyInputOptions, CurrencyDisplay } from 'vue-currency-input'
import { CreditData } from '@/config/variables'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import FormCurrencyInput from '@/components/ui/FormCurrencyInput.vue'
import InfoBox from '@/components/ui/InfoBox.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import MultiSelect from '@/components/ui/MultiSelect.vue'
import InputError from '@/components/ui/InputError.vue'
import { c4bApi } from '@/api/C4bApi'
import { theme } from '@/config/styles'

export default defineComponent({
    props: {
        limit: {
            type: Number,
            required: true,
        },
        installment: {
            type: Number,
            required: true,
        },
    },
    components: {
        InfoBox,
        ButtonDefault,
        FormTextInput,
        MultiSelect,
        InputError,
        FormCurrencyInput,
    },
    emits: ['formButtonClicked', 'valuesChanged'],
    setup: (props, context) => {
        const minCredit = 10000
        const maxCredit = 5000000
        const credit = ref(props.limit)
        const installments = ref(props.installment)
        const currencyOptions: CurrencyInputOptions = {
            currency: 'BRL',
            currencyDisplay: CurrencyDisplay.symbol,
            locale: 'pt-BR',
            hideCurrencySymbolOnFocus: false,
            hideGroupingSeparatorOnFocus: true,
            hideNegligibleDecimalDigitsOnFocus: true,
            autoDecimalDigits: false,
            autoSign: true,
            useGrouping: true,
        }
        const creditData = CreditData
        const lenghReason = creditData.text.listReasons.length
        const reason = ref('')
        const reasonOthers = ref('')
        const others = creditData.text.listReasons[lenghReason - 1]
        const isInvalid = ref(false)
        const income = ref(0)

        /**
         * Função utilizada para limpar o campo do motivo no form
         */
        const reset = (): void => {
            reasonOthers.value = ''
            isInvalid.value = false
        }
        /** Função para validar o multiselect */
        const handleReasonSelect = (): void => {
            if (reason.value == '' || reason.value == undefined)
                isInvalid.value = true
            else isInvalid.value = false
        }
        /** Função utilizada para validar o input de outro motivos */
        const validationReasonOthers = (): void => {
            handleReasonSelect()
            if (reason.value == others)
                if (reasonOthers.value == '' || reasonOthers.value.length < 10)
                    isInvalid.value = true
                else isInvalid.value = false
        }
        const currencyFormatBR = (num: number) => {
            //console.log(num)
            return num
                .toFixed(2)
                .replace('.', ',')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }
        const creditFormatted = computed(() => {
            return currencyFormatBR(credit.value)
        })
        const minIncome = computed(() => {
            return currencyFormatBR(income.value)
        })
        const handleSubmit = () => {
            context.emit('valuesChanged', credit.value, installments.value)
            validationReasonOthers()
            if (isInvalid.value == true) return
            else if (reason.value === others)
                context.emit('formButtonClicked', reasonOthers.value, reset)
            else context.emit('formButtonClicked', reason.value, reset)
        }
        const CalculateIncome = async (limit: number, installment: number) => {
            try {
                const creditUser = {
                    limit: limit,
                    installment: installment
                }
                const recomendedIncome = await c4bApi.credit().post(creditUser)
                return recomendedIncome.data
            } catch (error: any) {
                console.log(error)
            }
        }
        /** Este evento é acionado sempre que o multiselect é clicado.*/
        watch(reason, () => handleReasonSelect())
        /** Espera que o slider do limite de crédito mude de valor */
        watch(credit, (currentCredit) =>
            calMinIncome(currentCredit, installments.value)
        )
        /** Espera que o slider de parcelas mude de valor */
        watch(installments, (currentInstallments) =>
            calMinIncome(credit.value, currentInstallments)
        )
        /** Função asíncrona que espera que o backend faça o cálculo do 
         * faturamento recomendado */
        const calMinIncome = async (credit: number, installments: number) => {
            const minIncome = await CalculateIncome(credit, installments)
            if (credit <= 0 || installments <= 0) return 0
            income.value = minIncome
            return 0
        }
        return {
            handleSubmit,
            currencyFormatBR,
            minIncome,
            credit,
            creditFormatted,
            installments,
            currencyOptions,
            minCredit,
            maxCredit,
            creditData,
            reason,
            others,
            reasonOthers,
            isInvalid,
            theme
        }
    },
})
</script>

<style scoped>
:deep .input-base {
    border: none;
}
.input-wrapper {
    text-align: center;
}
.btn-next {
    margin: 40px 20px 45px 20px;
    text-align: right;
}
.creditLabel {
    margin: 25px 0;
    text-align: center;
    font-size: 20px;
}
.container-credit {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.current-value {
    margin-bottom: 10px;
}
:deep .info-box {
    margin-top: 20px;
}
:deep .creditInput {
    width: 240px;
    border: none;
}
:deep .installmentInput {
    width: 240px;
    border: none;
    margin-bottom: 30px;
}
</style>
