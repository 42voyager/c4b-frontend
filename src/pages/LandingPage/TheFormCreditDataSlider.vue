<template>
    <transition name="show-user-credit">
        <div class="container-credit">
            <p class="creditLabel">{{ creditData.text.titleLimits }}</p>
            <div class="wrapper-slider">
                <Slider
                    id="credit-slider"
                    class="slider"
                    :format="format"
                    :min="Number(minCredit)"
                    :max="Number(maxCredit)"
                    v-model="creditUser.limit"
                />
            </div>
            <div class="input-credit">
                <FormTextInput
                    :isInvalid="invalidCredit"
                    :errors="errorsCredit"
                    id="input-credit-slider"
                    name="input-credit-slider"
                    class="current-value"
                    v-model="creditFormatted"
                    v-maska="[
                        'R$ ##.###,##',
                        'R$ ###.###,##',
                        'R$ #.###.###,##',
                    ]"
                />
            </div>
            <p class="creditLabel">{{ creditData.titleInstallments }}</p>
            <div class="wrapper-slider">
                <Slider
                    id="installments-slider"
                    class="slider"
                    :min="6"
                    :max="36"
                    :step="1"
                    v-model="creditUser.installment"
                />
            </div>
            <InfoBox class="info-box">
                <p>
                    {{ creditData.text.titleFaturamento }}
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
                <p class="creditLabel-reason">
                    {{ creditData.text.titleMotivo }}
                </p>
                <MultiSelect
                    class="select-reason"
                    :options="creditData.text.listReasons"
                    v-model="reason"
                    placeholder="Selecione uma opção"
                />
                <div class="reason-input">
                    <FormTextInput
                        v-if="reason === others"
                        v-model="reasonOthers"
                        placeholder="Escreva seu motivo"
                        name="Motivo"
                    />
                </div>
                <div v-show="isInvalid" class="div-error-reason">
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
import { c4bApi } from '@/api/C4bApi'
import Slider from '@vueform/slider'
import ICredit from '@/types/credit'
import { theme } from '@/config/styles'

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
        Slider,
    },
    emits: ['formButtonClicked', 'valuesChanged'],
    setup: (props, context) => {
        const inputStart = ref(false)
        const minCredit = 10000
        const maxCredit = 5000000
        const creditUser = ref({
            limit: props.limit,
            installment: props.installment,
        })
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
        const errorsCredit = [
            'O crédito precisa ser maior que R$10.000,00' +
                ' e menor que R$5.000.000,00',
        ]
        /**
         * Está função serve para formatar o número mostrado no
         * tooltip do slider
         * @param {number} value - Numbero recebido do slider
         */
        const format = (value: number): string => {
            return `R$ ${currencyFormatBR(value)}`
        }
        /**
         * Função utilizada para limpar o campo do motivo no form
         */
        const reset = (): void => {
            reasonOthers.value = ''
            isInvalid.value = false
            creditUser.value.limit = 10000
            creditUser.value.installment = 6
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
        /**
         * Função utilizada para converter um numero em formato real
         * para sem formato.
         * @param {string} value - String do valor formatado
         * @return {number} - retorna o valor formatado sem formato.
         */
        const convertToNumber = (value: string): number => {
            const newValue = value
                .replace(/,/g, '')
                .replace(/\./g, '')
                .replace(/R/g, '')
                .replace(/\$/g, '')
            return Number(newValue.substr(0, newValue.length - 2))
        }
        /**
         * Função utilizada para pegar o valor do input e colocar no slider
         * com um debounce de 500ms
         * @param {string} inputSlide - O input do slider.
         */
        const changeSlide = debounce((inputSlide: string) => {
            const newvalue = convertToNumber(inputSlide)
            creditUser.value.limit = newvalue
        }, 500)

        /**
         * variavel computed com posibilidade de pegar o valor atual
         * e setar um novo com debounce.
         */
        const creditFormatted = computed({
            get: () =>
                'R$ ' +
                currencyFormatBR(
                    inputStart.value == true ? creditUser.value.limit : 0
                ),
            set: (value) => {
                changeSlide(value)
            },
        })
        const minIncome = computed(() => {
            return currencyFormatBR(income.value)
        })
        const handleSubmit = () => {
            context.emit(
                'valuesChanged',
                creditUser.value.limit,
                creditUser.value.installment
            )
            validationReasonOthers()
            if (invalidCredit.value == true) return
            if (isInvalid.value == true) return
            else if (reason.value === others)
                context.emit('formButtonClicked', reasonOthers.value, reset)
            else context.emit('formButtonClicked', reason.value, reset)
        }
        const CalculateIncome = async (creditUser: ICredit) => {
            try {
                const recomendedIncome = await c4bApi.credit().post(creditUser)
                return recomendedIncome.data
            } catch (error: any) {
                console.log(error)
            }
        }
        /** Calculo para os valores por defeto do credito */
        onMounted(() => {
            requestStatus.value = ERequestStatus.InProgress
            calMinIncome(creditUser.value)
        })
        /** Este evento é acionado sempre que o multiselect é clicado.*/
        watch(reason, (reason) => handleReasonSelect(reason))
        /** Espera que o slider do limite de crédito mude de valor */
        watch(
            creditUser,
            (currentCreditUser) => {
                requestStatus.value = ERequestStatus.Debounced

                if (
                    (currentCreditUser.limit < 10000 ||
                        currentCreditUser.limit > 5000000) &&
                    inputStart.value == true
                )
                    invalidCredit.value = true
                else invalidCredit.value = false
                inputStart.value = true
                calMinIncomeDebounce(currentCreditUser)
            },
            {
                deep: true,
            }
        )
        /** Função asíncrona que espera que o backend faça o cálculo do
         * faturamento recomendado */
        const calMinIncome = async (creditUser: ICredit) => {
            const minIncome = await CalculateIncome(creditUser)
            if (creditUser.limit <= 0 || creditUser.installment <= 0) return 0
            if (requestStatus.value != ERequestStatus.Debounced) {
                income.value = minIncome
                requestStatus.value = ERequestStatus.Done
            }
        }
        /** Wrapper de funcao calMinIncome para adicionar um delay */
        const calMinIncomeDebounce = debounce(
            (creditUser: ICredit) => {
                requestStatus.value = ERequestStatus.InProgress
                calMinIncome(creditUser)
            },
            500 // 500ms
        )
        return {
            handleSubmit,
            currencyFormatBR,
            minIncome,
            creditUser,
            creditFormatted,
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
            invalidCredit,
            theme
        }
    },
})
</script>
<style scoped>
.div-error-reason p {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}
.creditLabel-reason {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
}
.select-reason {
    text-transform: capitalize;
}
.wrapper-slider {
    width: 80%;
    margin-bottom: 20px;
}
.slider {
    --slider-handle-width: 30px;
    --slider-handle-height: 30px;
    --slider-width: 16px;
    --slider-height: 16px;
    --slider-bg: v-bind('theme.colors.secondary.light');
    --slider-connect-bg: v-bind('theme.colors.secondary.middark');
    --slider-handle-ring-color: v-bind('theme.colors.black');
    --slider-tooltip-bg: v-bind('theme.colors.secondary.middark');
}
.reason-input :deep .input-base {
    width: 280px;
    padding: 7px 14px;
    text-align: left;
}
.input-wrapper {
    text-align: center;
}
.btn-next {
    margin: 20px 20px 50px 20px;
    text-align: right;
}
.creditLabel {
    margin: 20px 0;
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
.current-value :deep label {
    display: none;
}

.input-credit :deep .input-base {
    width: 132px;
    padding: 7px 14px;
    font-size: 14px;
}

.input-credit :deep .wrapper-input {
    text-align: center;
}
:deep .div-error p {
    margin-left: auto;
    margin-right: auto;
}

:deep .info-box {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    padding: 7px 14px;
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
