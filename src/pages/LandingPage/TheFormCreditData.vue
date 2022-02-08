<template>
    <transition name="show-user-credit">
        <div class="container-credit">
            <div class="form-credit">
                <p class="creditLabel">
                    {{ creditData.text.titleLimits }}
                </p>
                <div class="radio-group">
                    <RadioInput
                        v-for="(creditLimit, id) of creditData.text
                            .creditLimits"
                        :key="id"
                        :id="creditLimit.id.toString()"
                        :name="creditLimit.name"
                        :label="creditLimit.label"
                        :value="limit"
                        :isChecked="creditLimit.id == limit ? true : false"
                        @radioClicked="handleInput(creditLimit.id, null)"
                    />
                </div>
                <p class="creditLabel">
                    {{ creditData.text.titleInstallments }}
                </p>
                <div class="radio-group">
                    <RadioInput
                        v-for="(creditInstallment, id) of creditData.text
                            .creditInstallments"
                        :key="id"
                        :id="creditInstallment.id.toString()"
                        :name="creditInstallment.name"
                        :label="creditInstallment.label"
                        :value="installment"
                        :isChecked="
                            creditInstallment.id == installment ? true : false
                        "
                        @radioClicked="handleInput(null, creditInstallment.id)"
                    />
                </div>
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
                        id="btn-next-step-buttons"
                        msg="Continuar"
                        @buttonClicked="nextStepClicked()"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import RadioInput from '@/components/ui/RadioInput.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import MultiSelect from '@/components/ui/MultiSelect.vue'
import InputError from '@/components/ui/InputError.vue'
import { CreditData } from '@/config/variables'
import { defineComponent, ref, watch } from 'vue-demi'

/**
 * Component utilizado na primeira etapa da solicitação de crédito
 * @props {String} limit - Limite de crédito
 * @props {String} installment - Parcelas para a solicitação
 * @emits nextStepClicked - utilizado para fazer a mudança de etapas do form
 * @emits valueChanged - utilizado para fazer a mudança dos valores do 
 * limits e installment
 */
export default defineComponent({
    props: {
        limit: [String, Number],
        installment: [String, Number],
    },
    emits: ['nextStepClicked', 'valueChanged'],
    components: {
        RadioInput,
        ButtonDefault,
        FormTextInput,
        MultiSelect,
        InputError,
    },
    setup(props, context) {
        const creditData = CreditData
        const lenghReason = creditData.text.listReasons.length
        const reason = ref('')
        const reasonOthers = ref('')
        const others = creditData.text.listReasons[lenghReason - 1]
        const isInvalid = ref(false)

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
        /**
         * Função utilizada para emitir um evendo
         * quando o botão continuar é clicado
         * Não faz nada caso um dos inputs obrigátorio seja inválido
         */
        const nextStepClicked = (): void => {
            validationReasonOthers()
            if (isInvalid.value == true) return
            if (reason.value === others)
                context.emit('nextStepClicked', reasonOthers.value, reset)
            else context.emit('nextStepClicked', reason.value, reset)
        }

        /** Este evento é acionado sempre que o multiselect é clicado.*/
        watch(reason, () => handleReasonSelect())
        /** No momento que o radio input e clicado, handle input triggers */
        const handleInput = (
            limit: string | null,
            installment: string | null
        ): void => {
            context.emit('valueChanged', limit, installment)
        }
        return {
            creditData,
            reason,
            others,
            reasonOthers,
            isInvalid,
            nextStepClicked,
            handleInput,
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
.container-credit {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.radio-group {
    display: flex;
    flex-wrap: wrap;
}
.radio-input {
    display: flex;
    flex: 2 0 50%;
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
</style>
