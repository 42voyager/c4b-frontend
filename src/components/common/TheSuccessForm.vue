<template>
    <Modal @buttonXModal="handleOkButtonClicked()">
        <div class="wrapper-success">
            <div id="message-panel" v-if="!useRateStar">
                <Sucess height="60" width="60" color="#b29475" />
                <p v-for="(message, index) of messages" :key="index">
                    {{ message }}
                </p>
            </div>
            <div id="message-panel" v-if="useRateStar">
                <Sucess height="60" width="60" color="#b29475" />
                <p>
                    <b>{{ userData.name }}</b> recebemos sua solicitação de
                    <b>{{ currencyFormatBR(userData.limit) }}</b> para pagar em
                    <b>{{ userData.installment }}</b> meses. Obrigado pelo seu
                    interesse!
                </p>
                <p>
                    Fique atento ao seu email <b>{{ userData.email }}</b
                    >!
                </p>
                <p>Em breve entraremos em contato!</p>
            </div>
            <div class="wrapper-star" v-if="useRateStar">
                <p>Avaliação</p>
                <StarRating
                    v-model:rating="feedbackStar.rateStar"
                    :show-rating="false"
                />
                <FormTextInput v-model="feedbackStar.message" />
            </div>
            <ButtonDefault
                :msg="buttonLabel"
                @buttonClicked="
                    useRateStar ? handleRateStar() : handleOkButtonClicked()
                "
            />
        </div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import Sucess from '@/components/icons/Sucess.vue'
import Modal from '@/components/ui/Modal.vue'
import FormTextInput from '@/components/ui/FormTextInput.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import StarRating from 'vue-star-rating'
import IUserData from '@/types/user'
import { currencyFormatBR } from '@/use/numberFormatBR'

/**
 * Component de finalização dos formulário.
 * @prop {String[]} messages - Array de string com as mensagens de finalização.
 * @prop {String} buttonLabel - Label para o botão
 * @prop {Boolean} useRateStar - Boolean para saber se vai usar avaliação
 * com estrela ou sem.
 * @event newRequestClicked - Evento Acionado quando o modal é fechado.
 * @event rateClicked - Evento acionado quando o botão é clicado.
 */
export default defineComponent({
    props: {
        messages: {
            type: Array as PropType<string[]>,
            default: () => {
                return ['Recebemos sua solicitação!']
            },
        },
        buttonLabel: {
            type: String,
            default: 'Fechar',
        },
        useRateStar: {
            type: Boolean,
            default: false,
        },
        userData: {
            type: Object as PropType<IUserData>,
        },
    },
    emits: ['newRequestClicked', 'rateClicked'],
    components: {
        ButtonDefault,
        Sucess,
        Modal,
        StarRating,
        FormTextInput,
    },
    setup(props, context) {
        const feedbackStar = ref({
            name: '',
            email: '',
            message: '',
            rateStar: 0,
        })
        /**
         * Função invoca o emit para fechar o modal.
         */
        const handleOkButtonClicked = () => {
            context.emit('newRequestClicked')
        }
        /**
         * Função invoca o emit para submeter uma avaliação com estrela.
         * E fechar o modal.
         */
        const handleRateStar = () => {
            if (feedbackStar.value.rateStar > 0)
                context.emit('rateClicked', feedbackStar.value)
        }
        return {
            handleOkButtonClicked,
            feedbackStar,
            handleRateStar,
            currencyFormatBR,
        }
    },
})
</script>

<style scoped>
:deep .modal-wrapper {
    height: auto;
    width: 280px;
}
p {
    margin-bottom: 5px;
}
.wrapper-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
}
#message-panel {
    margin-bottom: 30px;
    width: 100%;
    text-align: center;
}
.wrapper-success button {
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 14px;
}
.wrapper-star {
    text-align: center;
}
@media (min-width: 768px) {
    #message-panel {
        font-size: 23px;
        margin-bottom: 30px;
    }
    :deep .modal-wrapper {
        width: 500px;
    }
}
</style>