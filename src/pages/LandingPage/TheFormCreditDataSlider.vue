<template>
    <transition name="show-user-credit">
        <div class="container-credit">
            <p class="creditLabel">De quanto seu negócio precisa</p>
            <div class="wrapper-slider">
                <Slider
                    id="credit-slider"
                    class="slider"
                    :format="format"
                    :min="Number(minCredit)"
                    :max="Number(maxCredit)"
                    v-model="credit"
                    :step="1000"
                />
            </div>
            <!-- <SliderInput
                :min="minCredit"
                :max="maxCredit"
                :minLabel="'R$' + currencyFormatBR(minCredit)"
                :maxLabel="'R$' + currencyFormatBR(maxCredit)"
                step="1000"
                v-model="credit"
            /> -->
            <!-- <b class="current-value"> R$ {{ creditFormatted }} </b> -->
            <FormTextInput
                :isInvalid="invalidCredit"
                :errors="errorsCredit"
                id="input-credit-slider"
                class="current-value"
                v-model="credit"
                v-maska="{ 
                    mask: ['######','Y######'], 
                    tokens: {'Y': {pattern: /[0-5]/}}}"
            />
            <p class="creditLabel">Em quantas vezes você quer pagar?</p>
            <div class="wrapper-slider">
                <Slider
                    id="installments-slider"
                    class="slider"
                    :min="6"
                    :max="36"
                    :step="1"
                    v-model="installments"
                />
            </div>
            <!-- <SliderInput
                :min="6"
                :max="36"
                :minLabel="'6 Meses'"
                :maxLabel="'35 Meses'"
                step="1"
                v-model="installments"
            /> -->
            <!-- <b class="current-value"> {{ installments }} Meses </b> -->
            <InfoBox class="info-box">
                <p>
                    Faturamento mensual recomendado seria:
                    <br />
                    <b
                        v-show="
                            requestStatus == ERequestStatus.Done ||
                            requestStatus == ERequestStatus.Idle
                        "
                    >
                        R$ {{ minIncome }}
                    </b>
                    <i
                        v-show="
                            requestStatus == ERequestStatus.Debounced ||
                            requestStatus == ERequestStatus.InProgress
                        "
                    >
                        {{ `Calculando... ` }}
                    </i>
                </p>
            </InfoBox>
            <div class="input-wrapper">
                <p class="creditLabel">
                    {{ creditData.text.titleMotivo }}
                </p>
                <MultiSelect
                    :options="creditData.text.listReasons"
                    v-model="reason"
                    placeholder="Selecione uma opção"
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
                    id="btn-step-next-slider"
                    msg="Continuar"
                    @buttonClicked="handleSubmit()"
                />
            </div>
        </div>
    </transition>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { CurrencyInputOptions, CurrencyDisplay } from 'vue-currency-input'
import { debounce } from '@/use/debounce'
import { currencyFormatBR } from '@/use/numberFormatBR'
import { CreditData } from '@/config/variables'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import InfoBox from '@/components/ui/InfoBox.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import SliderInput from '@/components/ui/SliderInput.vue'
import MultiSelect from '@/components/ui/MultiSelect.vue'
import InputError from '@/components/ui/InputError.vue'
import C4bApi from '@/api/C4bApi'
import Slider from '@vueform/slider'

enum ERequestStatus {
    Idle,
    Debounced,
    InProgress,
    Done,
}

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
        SliderInput,
        FormTextInput,
        MultiSelect,
        InputError,
        Slider
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
        const requestStatus = ref(ERequestStatus.Idle)
        const invalidCredit = ref(false)
        const errorsCredit = ['O crédito precisa ser maior que R$10.000,00'+
            ' e menor que R$5.000.000,00']
        /**
         * Está função serve para formatar o número mostrado no
         * tooltip do slider
         * @param {number} value - Numbero recebido do slider
         */
        const format = (value: number): string => {
            return `R$${currencyFormatBR(value)}`
        }
        /**
         * Função utilizada para limpar o campo do motivo no form
         */
        const reset = (): void => {
            reasonOthers.value = ''
            isInvalid.value = false
            credit.value = 10000
            installments.value = 6
        }
        /** Função para validar o multiselect */
        const handleReasonSelect = (reason: string): void => {
            if (reason == '' || reason == undefined) isInvalid.value = true
            else isInvalid.value = false
        }
        /** Função utilizada para validar o input de outro motivos */
        const validationReasonOthers = (): void => {
            handleReasonSelect(reason.value)
            if (reason.value == others)
                if (reasonOthers.value == '' || reasonOthers.value.length < 10)
                    isInvalid.value = true
                else isInvalid.value = false
        }
        const convertToNumber = (value: string): string => {
            const newValue = value.replace(/,/g, '').replace(/\./g, '')
            return newValue
        }
        const creditFormatted = computed({
            get: () =>  currencyFormatBR(credit.value),
            set: value =>  {credit.value = Number(convertToNumber(value))}
        })
        const minIncome = computed(() => {
            return currencyFormatBR(income.value)
        })
        const handleSubmit = () => {
            context.emit('valuesChanged', credit.value, installments.value)
            validationReasonOthers()
            if (invalidCredit.value == true) return
            if (isInvalid.value == true) return
            else if (reason.value === others)
                context.emit('formButtonClicked', reasonOthers.value, reset)
            else context.emit('formButtonClicked', reason.value, reset)
        }
        const CalculateIncome = async (limit: number, installment: number) => {
            try {
                const recomendedIncome = await new C4bApi().getCreditInfo(
                    limit,
                    installment
                )
                return recomendedIncome.data
            } catch (error: any) {
                console.log(error)
            }
        }
        /** Calculo para os valors por defeto do credito */
        onMounted(() => {
            requestStatus.value = ERequestStatus.InProgress
            calMinIncome(credit.value, installments.value)
        })
        /** Este evento é acionado sempre que o multiselect é clicado.*/
        watch(reason, (reason) => handleReasonSelect(reason))
        /** Espera que o slider do limite de crédito mude de valor */
        watch(credit, (currentCredit) => {
            requestStatus.value = ERequestStatus.Debounced
            if (credit.value < 10000 || credit.value > 5000000)
                invalidCredit.value = true
            else
                invalidCredit.value = false

            calMinIncomeDebounce(currentCredit, installments.value)
        })
        /** Espera que o slider de parcelas mude de valor */
        watch(installments, (currentInstallments) => {
            requestStatus.value = ERequestStatus.Debounced
            calMinIncomeDebounce(credit.value, currentInstallments)
        })
        /** Função asíncrona que espera que o backend faça o cálculo do
         * faturamento recomendado */
        const calMinIncome = async (credit: number, installments: number) => {
            const minIncome = await CalculateIncome(credit, installments)
            if (credit <= 0 || installments <= 0) return 0
            if (requestStatus.value != ERequestStatus.Debounced) {
                income.value = minIncome
                requestStatus.value = ERequestStatus.Done
            }
        }
        /** Wrapper de funcao calMinIncome para adicionar um delay */
        const calMinIncomeDebounce = debounce(
            (credit: number, installments: number) => {
                requestStatus.value = ERequestStatus.InProgress
                calMinIncome(credit, installments)
            },
            500 // 500ms
        )
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
            requestStatus,
            ERequestStatus,
            format,
            errorsCredit,
            invalidCredit
        }
    },
})
</script>
<style scoped>
.wrapper-slider {
    width: 80%;
    margin-bottom: 20px;
}
.slider {
    --slider-handle-width: 30px;
    --slider-handle-height: 30px;
    --slider-width: 16px;
    --slider-height: 16px;
    --slider-bg: #b9ada0;
    --slider-connect-bg: #64380c;
    --slider-handle-ring-color: #00000030;
    --slider-tooltip-bg: #64380c;
}
:deep .input-base {
    border: none;
}
.input-wrapper {
    text-align: center;
}
.btn-next {
    margin: 40px 20px 50px 20px;
    text-align: right;
}
.creditLabel {
    margin: 25px 0;
    margin-bottom: 50px;
    text-align: center;
    font-size: 20px;
}
.container-credit {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.current-value {
    margin-bottom: 10px;
}
:deep .info-box {
    margin-top: 20px;
}
:deep .info-box p {
    margin-bottom: 2px;
    text-align: center;
    line-height: 1.5;
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
:deep .input-base {
    width: 100px;
    text-align: center;
    margin-top: 0;
}
:deep .div-error {
    text-align: center;
}
</style>
