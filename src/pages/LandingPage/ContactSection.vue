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
                    :placeholder="item.placeholder"
                    :isInvalid="item.isInvalid()"
                    :errors="item.error"
                    v-model="userFeedBack[item.name]"
                />
                <div class="wrapper-input">
                    <textarea
                    name="Feedback"
                    placeholder="Mensagem"
                    id="Feedback"
                    class="textarea-input"
                    v-bind:class="{ invalid: validLocalTextArea()}"
                    cols="40"
                    rows="10"
                    required
                    v-model="userFeedBack.message"
                    />
                </div>
                <div v-show=" validLocalTextArea()">
                    <InputError 
                        :msg="FeedbackConfiguration.text.errorTextArea"
                        />
                </div>
                <ButtonDefault @buttonClicked="submitFeedBack()"/>
            </form>
        </div>
        <TheSuccessForm
            v-show="success"
            buttonLabel="Fechar"
            :messages="FeedbackConfiguration.text.success"
            @newRequestClicked="newFeedback()"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import ApiController from '@/api/C4bApi'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import InputError from '@/components/ui/InputError.vue'
import TheSuccessForm from '@/components/common/TheSuccessForm.vue'
import IUserFeedBack from '@/types/userFeedBack'
import { FeedbackConfiguration } from '@/config/variables'
import { checkErrorsReturn, Validity } from '@/use/validInput'

interface IInputsInfo {
    type: string,
    name: string,
    placeholder: string,
    isInvalid: () => boolean,
    error: string[]
}

const success = ref(false)
const inputValidationStatus = ref(
    {name: Validity.Undefined, email: Validity.Undefined,
        message: Validity.Undefined})
const userFeedBack = ref({
    name: '',
    email: '',
    message: '',
    recaptchaToken: ''
})

/**
 * Component para criação do formulário de contato.
 */
export default defineComponent({
    components: {
        ButtonDefault,
        InputError,
        TheSuccessForm,
        FormTextInput
    },
    setup() {
        const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!
        /**
         * Função utilizada para gerar uma requisição para a API C4B
         */
        const submitFeedBack = async () => {
            if (!validFormVue(userFeedBack.value))
                return
            try
            {
                await recaptchaLoaded()
                const token = await executeRecaptcha('login')
                userFeedBack.value.recaptchaToken = token

                await new ApiController().postUserFeedback(userFeedBack.value)
                success.value = true
                resetFeedBack()
                inputValidationStatus.value = 
                    {name: Validity.Valid, email: Validity.Valid,
                        message: Validity.Valid}
            }
            catch (err: any)
            {
                const newStatus = {...inputValidationStatus.value}
                if (!checkErrorsReturn(err.response.data.errors.Name))
                    newStatus.name = Validity.Invalid
                if (!checkErrorsReturn(err.response.data.errors.Email))
                    newStatus.email = Validity.Invalid
                if (!checkErrorsReturn(err.response.data.errors.Message))
                    newStatus.message = Validity.Invalid
                inputValidationStatus.value = newStatus
            }
        }
        /**
        * @param {KeyboardEvent} e - Evento do click
        * Se a tecla esc é pressionada quando o modal de sucesso está aberto
        * o modal será fechado
        */
        const keyEscDown = (e: KeyboardEvent) => {
            if (success.value == true &&  e.key == 'Escape') newFeedback()
        }
        document.addEventListener('keyup', keyEscDown)
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
        }
    }
})



/**
 * Função utilizada para limpar todos os campos do formulário
 */
function resetFeedBack(): void {
    const emptyUserFeedBack: IUserFeedBack = {
        name: '',
        email: '',
        message: '',
        recaptchaToken: ''
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
    const newStatus = {...inputValidationStatus.value}
    if (userFeedBack.name.length < 2)
        newStatus.name = Validity.Invalid
    else
        newStatus.name = Validity.Valid
    if (userFeedBack.email.length < 11)
        newStatus.email = Validity.Invalid
    else
        newStatus.email = Validity.Valid
    if (userFeedBack.message.length < 10)
        newStatus.message = Validity.Invalid
    else
        newStatus.message = Validity.Valid
    inputValidationStatus.value = newStatus
    if (inputValidationStatus.value.name == Validity.Valid
            && inputValidationStatus.value.email == Validity.Valid
            && inputValidationStatus.value.message == Validity.Valid)
        return (true)
    else
        return (false)
}

/**
 * Válida o campo da mensagem
 * @returns {boolean} - True se a mensagem for válida
 *  caso contrário retorna false
 */
function validLocalTextArea(): boolean {
    if (inputValidationStatus.value.message == Validity.Invalid)
        return true
    else
        return false
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
function  createList(): Array<IInputsInfo> {

    let inputsInfo = [
        {
            type: 'text',
            name: 'name',
            placeholder: FeedbackConfiguration.text.formInputInfolist[0]
                .placeholder,
            isInvalid: () => inputValidationStatus.value.name ==
                Validity.Invalid,
            error: FeedbackConfiguration.text.formInputInfolist[0].error,
        },
        {
            type: 'email',
            name: 'email',
            placeholder: FeedbackConfiguration.text.formInputInfolist[1]
                .placeholder,
            isInvalid: () => inputValidationStatus.value.email ==
                Validity.Invalid,
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

.textarea-input {
    border: solid 1px #b29475;
    margin: 10px 0;
    max-width: 100%;
    width: calc(100% - 30px);
    border-radius: 5px;
    padding: 15px;
    font-family: inherit;
}
.wrapper-input {
    text-align: left;
}
.textarea-input::placeholder {
    font-size: 16px;
}

.form-Feedback button {
    margin-bottom: 50px;
}

@media (max-width: 576px)
{
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