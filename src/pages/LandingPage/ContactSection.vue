<template>
    <div class="wrapper-Feedback">
        <div v-if="!success">
            <h2 class="feedback-title">
                {{ FeedbackConfiguration.text.title }}
            </h2>
            <form id="form-Feedback" class="form-Feedback" @submit.prevent>
                <FormTextInput
                    v-for="(item, index) of inputsInfo"
                    :key="index"
                    :type="item.type"
                    :name="item.name"
                    :label="item.placeholder"
                    v-model="userFeedBack[item.name]"
                    :errors="
                        !checkErrorsReturn(
                            messageResponse[capitalize(item.name)]
                        )
                            ? messageResponse[capitalize(item.name)]
                            : item.error
                    "
                    :isInvalid="
                        !checkErrorsReturn(
                            messageResponse[capitalize(item.name)]
                        )
                            ? true
                            : inputValidationStatus[item.name] ==
                              EValidity.Invalid
                    "
                />
                <div class="wrapper-textarea">
                    <label
                        class="label-textarea"
                        :class="{ 'textarea-focus': inFocus || filled ? true : false}"
                        >
                        Mensagem
                    </label>
                    <textarea
                        name="Feedback"
                        id="Feedback"
                        class="textarea-input"
                        v-bind:class="{
                            invalid: validLocalTextArea(
                                messageResponse.Message
                            ),
                        }"
                        cols="40"
                        rows="10"
                        required
                        v-model="userFeedBack.message"
                        @focus="focusTextArea"
                        @blur="outFocusTextArea"
                    />
                </div>
                <div v-show="validLocalTextArea(messageResponse.Message)">
                    <InputError
                        :msg="
                            !checkErrorsReturn(messageResponse.Message)
                                ? messageResponse.Message
                                : FeedbackConfiguration.text.errorTextArea
                        "
                    />
                </div>
                <ButtonDefault
                    id="btn-submit-contact-form"
                    @buttonClicked="submitFeedBack()"
                />
            </form>
        </div>
        <TheSuccessForm
            v-show="success"
            buttonLabel="Fechar"
            :messages="FeedbackConfiguration.text.success"
            @newRequestClicked="newFeedback()"
            :useRateStar="false"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import { c4bApi } from '@/api/C4bApi'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import InputError from '@/components/ui/InputError.vue'
import TheSuccessForm from '@/components/common/TheSuccessForm.vue'
import IUserFeedBack from '@/types/userFeedBack'
import { FeedbackConfiguration } from '@/config/variables'
import { checkErrorsReturn, EValidity, capitalize, validName,
    validEmail } from '@/use/validInput'

interface IInputsInfo {
    type: string
    name: string
    placeholder: string
    isInvalid: () => boolean
    error: string[]
}

const success = ref(false)
const inputValidationStatus = ref({
    name: EValidity.Undefined,
    email: EValidity.Undefined,
    message: EValidity.Undefined,
})
const userFeedBack = ref({
    name: '',
    email: '',
    message: '',
    recaptchaToken: '',
})

/**
 * Component para criação do formulário de contato.
 */
export default defineComponent({
    components: {
        ButtonDefault,
        InputError,
        TheSuccessForm,
        FormTextInput,
    },
    setup() {
        const inFocus = ref(false)
        const outFocus = ref(true)
        const filled = ref(false)
        const messageResponse = ref({})
        const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!

        /**
         * Função utilizada para gerar uma requisição para a API C4B
         */
        const submitFeedBack = async () => {
            if (!validFormVue(userFeedBack.value)) return
            try {
                await recaptchaLoaded()
                const token = await executeRecaptcha('login')
                userFeedBack.value.recaptchaToken = token

                await c4bApi.feedback().post(userFeedBack.value)
                success.value = true
                resetFeedBack()
                inputValidationStatus.value = {
                    name: EValidity.Valid,
                    email: EValidity.Valid,
                    message: EValidity.Valid,
                }
                messageResponse.value = {}
            } catch (err: any) {
                messageResponse.value = err.response.data.errors
            }
        }
        /**
         * @param {KeyboardEvent} e - Evento do click
         * Se a tecla esc é pressionada quando o modal de sucesso está aberto
         * o modal será fechado
         */
        const keyEscDown = (e: KeyboardEvent) => {
            if (success.value == true && e.key == 'Escape') newFeedback()
        }
        document.addEventListener('keyup', keyEscDown)

        const changeFilled = (): void => {
            if (userFeedBack.value.message.length != 0)
                filled.value = true
            else
                filled.value = false
        }

        const focusTextArea = (): void => {
            inFocus.value = true
            outFocus.value = false
            changeFilled()
        }
        const outFocusTextArea = (): void => {
            inFocus.value = false
            outFocus.value = true
            changeFilled()
        }
        return {
            success,
            FeedbackConfiguration,
            inputValidationStatus,
            userFeedBack,
            inputsInfo: createList(),
            submitFeedBack,
            checkErrorsReturn,
            newFeedback,
            validLocalTextArea,
            messageResponse,
            EValidity,
            capitalize,
            focusTextArea,
            outFocusTextArea,
            inFocus,
            outFocus,
            filled
        }
    },
})

/**
 * Função utilizada para limpar todos os campos do formulário
 */
function resetFeedBack(): void {
    const emptyUserFeedBack: IUserFeedBack = {
        name: '',
        email: '',
        message: '',
        recaptchaToken: '',
    }
    userFeedBack.value = emptyUserFeedBack
}

/**
 * Função utilizada para validar o formulário
 * @param {IUserFeedBack} userFeedBack - Objeto que contem os dados dos inputs
 * O nome não pode ser menor que 2 caracteres
 * O email precisa ser válido
 * A mensagem precisa ser maior que 10 caracteres
 * @returns {boolean} - False se algum campo for inválido
 * caso contrário retorna true
 */
function validFormVue(userFeedBack: IUserFeedBack): boolean {
    const newStatus = { ...inputValidationStatus.value }
    if (!validName(userFeedBack.name)) newStatus.name = EValidity.Invalid
    else newStatus.name = EValidity.Valid
    if (!validEmail(userFeedBack.email)) newStatus.email = EValidity.Invalid
    else newStatus.email = EValidity.Valid
    if (userFeedBack.message.length < 10) newStatus.message = EValidity.Invalid
    else newStatus.message = EValidity.Valid
    inputValidationStatus.value = newStatus
    if (
        inputValidationStatus.value.name == EValidity.Valid &&
        inputValidationStatus.value.email == EValidity.Valid &&
        inputValidationStatus.value.message == EValidity.Valid
    )
        return true
    else return false
}

/**
 * Válida o campo da mensagem
 * @returns {boolean} - True se a mensagem for válida
 *  caso contrário retorna false
 */
function validLocalTextArea(msgError: any): boolean {
    return !checkErrorsReturn(msgError)
        ? true
        : inputValidationStatus.value.message == EValidity.Invalid
}

/**
 * Função chamada quando o usuário deseja fazer uma nova solicitação
 * Ela altera o valor da variável que mostra a mensagem de succeso para false
 * Assim aparece um novo form com os campos limpos
 */
function newFeedback(): void {
    success.value = false
}

/**
 * Função utilizada para criar um array contendo todos os dados
 * necessário para gerar os inputs
 * @returns {Array<IInputsInfo>} - Um array com todos
 * os dados utilizados nos inputs
 */
function createList(): Array<IInputsInfo> {
    let inputsInfo = [
        {
            type: 'text',
            name: 'name',
            placeholder:
                FeedbackConfiguration.text.formInputInfolist[0].placeholder,
            isInvalid: () =>
                inputValidationStatus.value.name == EValidity.Invalid,
            error: FeedbackConfiguration.text.formInputInfolist[0].error,
        },
        {
            type: 'email',
            name: 'email',
            placeholder:
                FeedbackConfiguration.text.formInputInfolist[1].placeholder,
            isInvalid: () =>
                inputValidationStatus.value.email == EValidity.Invalid,
            error: FeedbackConfiguration.text.formInputInfolist[1].error,
        },
    ]
    return inputsInfo
}
</script>

<style scoped>
.feedback-title {
    padding-bottom: 15px;
}
.form-Feedback {
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
}
.wrapper-Feedback {
    padding: 15px;
    text-align: center;
}

.wrapper-textarea {
    margin: 10px 0;
    max-width: 100%;
    width: calc(100% - 30px);
    padding: 15px;
    font-family: inherit;
    border: none;
    border-radius: 5px;
    border-bottom: inset 2px #b29475;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: rgb(245 245 245 / 80%);
    position: relative;
}
.label-textarea {
    position: absolute;
    top: 21px;
    left: 29px;
    z-index: 1;
}
.textarea-focus {
    top: 10px;
    color: #b29475;
    font-size: 14px;
}
.wrapper-textarea {
    text-align: left;
}
.textarea-input {
    position: relative;
    resize: none;
    outline: none;
    z-index: 9;
    border: none;
    background: none;
    font-size: 18px;
    padding: 15px;
    max-width: 90%;
}
.textarea-input:focus {
    background: none;
}
.textarea-input::placeholder {
    font-size: 16px;
}
:deep .wrapper-input {
    background-color: rgb(245 245 245 / 80%);
}
:deep .wrapper-input:hover {
    background-color: rgb(228 228 228 / 80%);
}
.wrapper-textarea:hover {
    border-bottom: inset 2px #937454;
    background-color: rgb(228 228 228 / 80%);
}
/* .textarea-input:hover::placeholder {
    font-size: 19px;
} */
.form-Feedback button {
    margin-bottom: 50px;
    margin-top: 15px;
}

@media (max-width: 576px) {
    .wrapper-Feedback {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
@media (min-width: 768px) {
    .feedback-title {
        padding-top: 50px;
    }
}
</style>