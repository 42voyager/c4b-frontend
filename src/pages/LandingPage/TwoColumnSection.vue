<template>
    <div class="two-column-section" id="two-column-section">
        <div class="column column-one">
            <img
                class="side-img"
                :src="require('@/assets/' + imageFileName)"
                :alt="altText"
            />
        </div>
        <div class="column column-two" id="column-two">
            <h2 v-if="requestSucceeded == false">{{ titleForm }}</h2>
            <form
                id="form-request"
                class="wrapper-form"
                @submit.prevent
                ref="div-1"
            >
                <TheFormCreditDataSlider
                    v-show="!nextStep"
                    @formButtonClicked="goNextStep"
                    @valuesChanged="creditDataChanged"
                    :limit="limit"
                    :installment="installment"
                />
                <TheFormUserData
                    v-show="nextStep && requestSucceeded == false"
                    @submitForm="submitUser"
                    @backStep="backStepClicked"
                    :enableMessage="enableMessage"
                    :messageResponse="messageResponse"
                    class="form-data"
                />
                <Wizard
                    class="circles-wizard"
                    :list="[statusStepOne, nextStep]"
                />
                <TheSuccessForm
                    v-if="requestSucceeded === true"
                    buttonLabel="ENVIAR"
                    @newRequestClicked="newRequestClicked"
                    @rateClicked="submitStarRate"
                    :useRatingChips="true"
                    :useRateStar="true"
                    :userData="userData"
                />
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import TheFormUserData from './TheFormUserData.vue'
import { c4bApi } from '@/api/C4bApi'
import IUserData from '@/types/user'
import TheFormCreditData from './TheFormCreditData.vue'
import TheFormCreditDataSlider from './TheFormCreditDataSlider.vue'
import Wizard from '@/components/ui/Wizard.vue'
import TheFormCreditDataInput from './TheFormCreditDataInput.vue'
import TheSuccessForm from '@/components/common/TheSuccessForm.vue'
import { TitleForm, errorMsgs } from '@/config/variables'
import GetIPApi from '@/api/getIpApi'
import IUserFeedBackStar from '@/types/userFeedBackStar'
import { theme } from '@/config/styles'

const TwoColumnSection = defineComponent({
    props: {
        imageFileName: String,
        altText: String,
    },
    components: {
        TheFormUserData,
        TheFormCreditData,
        TheFormCreditDataInput,
        TheSuccessForm,
        TheFormCreditDataSlider,
        Wizard,
    },
    setup() {
        const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!
        const titleForm = TitleForm
        const enableMessage = ref(false)
        const messageResponse = ref({ title: '' })
        const requestSucceeded = ref(false)
        const statusStepOne = ref(true)
        const nextStep = ref(false)
        const installment = ref(6)
        const limit = ref(10000)
        const userIP = ref('')
        const userOS = ref('Unknown OS')
        const userReason = ref('')
        const userData = ref()
        let resetInputReason = () => {
            return
        }

        /**
         * Função utilizada quando o botão continuar da primeira etapa do form
         * é clicado. Pega o motivo e altera as variaveis necessárias para ir
         * pra proxima etapa.
         * @param {string} reason - Motivo da solicitação de crédito.
         * @param {function} reset - Função utilizada para resetar o
         * input do motivo.
         */
        const goNextStep = (reason: string, reset: () => void) => {
            nextStep.value = true
            userReason.value = reason
            resetInputReason = reset
            statusStepOne.value = false
        }

        /**
         * Função utilizada quando o botão de voltar do form é clicado.
         * Altera as variaveis necessárias para voltar uma etapa.
         */
        const backStepClicked = () => {
            nextStep.value = false
            statusStepOne.value = true
        }

        /**
         * @param {number | null} newLimit - Variavel do valor do crédito.
         * @param {number | null} newInstallment - Novas quantidade de parcelas.
         */
        const creditDataChanged = (
            newLimit: number | null,
            newInstallment: number | null
        ) => {
            if (newLimit != null && Number(newLimit) != 0)
                limit.value = newLimit
            if (newInstallment != null && Number(newInstallment) != 0)
                installment.value = newInstallment
        }

        /**
         * Função utilizada quando o botão do modal é clicado, muda as
         * variaveis de status necessária para voltar para a primeira
         * etapada do form.
         */
        const newRequestClicked = () => {
            nextStep.value = false
            messageResponse.value = { title: '' }
            requestSucceeded.value = false
        }
        const getOS = () => {
            if (navigator.userAgent.indexOf('Win') != -1)
                userOS.value = 'Windows'
            if (navigator.userAgent.indexOf('Mac') != -1) userOS.value = 'MacOS'
            if (navigator.userAgent.indexOf('Linux') != -1)
                userOS.value = 'Linux'
        }
        onMounted(() => {
            new GetIPApi().getIP().then((res) => {
                userIP.value = res.data.ip
            })
            getOS()
        })
        /**
         * Função utilizada para submiter a avaliação com estrelas.
         * @param {IUserFeedBackStar} feedbackStar - Objeto com os dados
         * da avaliação
         */
        const submitStarRate = async (feedbackStar: IUserFeedBackStar) => {
            feedbackStar.name = userData.value.name
            feedbackStar.email = userData.value.email
            try {
                await c4bApi.feedbackStar().post(feedbackStar)
                newRequestClicked()
            } catch (err: any) {
                console.log(err)
            }
        }

        /**
         * Função utilizada para submiter uma solicação de crédito.
         * Verificação do Recaptcha incluida.
         * @param {IUserData} user - Objeto com todos os dados do usuário.
         * @param {Function} resetFormData - Função utilizada para resetar
         * o Formulário de dados.
         */
        const submitUser = async (
            user: IUserData,
            resetFormData: () => void
        ) => {
            // Parsed as string to avoid being rejected by the backend
            user.limit = limit.value.toString() as any
            user.installment = installment.value.toString() as any
            user.reason = userReason.value
            user.timestamp = new Date().toJSON()
            user.ipAddress = userIP.value
            user.operatingSystem = userOS.value
            userData.value = user
            try {
                // ReCaptcha 3 handling
                await recaptchaLoaded()
                const token = await executeRecaptcha('login')
                user.recaptchaToken = token

                // Submit user handling
                await c4bApi.user().post(user)
                requestSucceeded.value = true
                enableMessage.value = true
                messageResponse.value = {
                    title: 'Solicitação recebida com sucesso!',
                }
                resetFormData()
                resetInputReason()
            } catch (err: any) {
                requestSucceeded.value = false
                enableMessage.value = true
                if (err.response && err.response.data.status == 429) {
                    messageResponse.value = { title: errorMsgs.tooManyRequests }
                    resetFormData()
                } else {
                    messageResponse.value = err.response.data.errors
                }
            }
        }

        /**
         * @param {KeyboardEvent} e - Evento do click
         * Se a tecla esc é pressionada quando o modal de sucesso está aberto
         * o modal será fechado
         */
        const keyEscDown = (e: KeyboardEvent) => {
            if (requestSucceeded.value == true && e.key == 'Escape')
                newRequestClicked()
        }
        document.addEventListener('keyup', keyEscDown)
        return {
            submitUser,
            statusStepOne,
            goNextStep,
            backStepClicked,
            creditDataChanged,
            newRequestClicked,
            submitStarRate,
            nextStep,
            titleForm,
            enableMessage,
            messageResponse,
            requestSucceeded,
            installment,
            limit,
            userData,
            theme
        }
    },
})

export default TwoColumnSection
</script>

<style scoped>
.show-user-data-enter-from {
    transform: translateX(100%);
}
.show-user-data-enter-to {
    transform: translateX(0);
}
.show-user-data-enter-active {
    transition: transform 0.5s ease;
}

.show-user-credit-enter-from {
    transform: translateX(-100%);
}
.show-user-credit-enter-to {
    transform: translateX(0);
}
.show-user-credit-enter-active {
    transition: transform 0.5s ease;
}

.circles-wizard {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
}
.two-column-section {
    display: flex;
    width: 100%;
    background-color: v-bind("theme.colors.primary.lightest");
    flex-direction: column;
}
.column {
    width: calc(100% - 40px);
}
.column-one {
    overflow: hidden;
    width: 100%;
}
.column-two {
    padding: 0 20px;
    align-self: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    position: relative;
}
.column-two h2 {
    margin-top: 30px;
    margin-bottom: 20px;
}
.side-img {
    height: 100vh;
}
.form-data {
    margin-bottom: 50px;
}
@media (min-width: 540px) {
    .side-img {
        width: 100%;
        height: auto;
    }
}
@media (min-width: 992px) {
    .side-img {
        width: 100%;
        position: relative;
        z-index: 9;
    }
}
@media (min-width: 1200px) {
    .two-column-section {
        flex-direction: row;
    }
    .column {
        width: 50%;
    }
    .column-two {
        padding: 0 20px;
    }
    .column-two h2 {
        font-size: 25px;
    }
}
@media (min-width: 1460px) {
    .side-img {
        width: 100%;
        height: unset;
        object-fit: cover;
    }
    .two-column-section {
        height: 800px;
    }
}
</style>
