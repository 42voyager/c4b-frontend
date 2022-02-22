<template>
    <Modal @buttonXModal="handleOkButtonClicked()">
        <div class="wrapper-success">
            <div id="message-panel" v-if="!useRateStar">
                <Sucess
                    height="60"
                    width="60"
                    color="#b29475"
                    :isCollapsed="true"
                />
                <p v-for="(message, index) of messages" :key="index">
                    {{ message }}
                </p>
            </div>
            <div
                id="message-panel"
                v-if="useRateStar && userData && useRatingChips !== undefined"
            >
                <Sucess
                    height="60"
                    width="60"
                    color="#b29475"
                    :isCollapsed="true"
                />
                <p>
                    <b>{{ userData.name }}</b> recebemos sua solicitação de<br />
                    <b>R$ {{ currencyFormatBR(userData.limit) }}</b> para pagar
                    em <b>{{ userData.installment }}</b> meses.<br />
                    Obrigado pelo seu interesse!
                </p>
                <p>
                    Fique atento ao seu email <b>{{ userData.email }}</b
                    >!
                </p>
            </div>
            <div class="wrapper-chips" v-if="useRatingChips">
                <p class="label-chip">
                    {{ ratingChips.text.titleChips }}
                </p>
                <div class="wrapper-star" v-if="useRateStar">
                    <StarRating
                        v-model:rating="feedbackStar.rateStar"
                        :show-rating="false"
                        :star-size="20"
                    />
                </div>
                <div class="chip-group">
                    <ChipInput
                        v-for="(ratingChip, id) of ratingChips.text.ratingChips"
                        :key="id"
                        :id="ratingChip.id.toString()"
                        :name="ratingChip.name"
                        :label="ratingChip.label"
                        :value="ratingChip.label"
                        :isChecked="chipsText.indexOf(ratingChip.label) != -1"
                        @chipClicked="chipClicked(ratingChip.label)"
                    />
                </div>
                <div class="input-reason">
                    <FormTextInput :label="'Feedback'" v-model="inputRating"/>
                </div>
            </div>
            <ButtonDefault
                :msg="buttonLabel"
                @buttonClicked="
                    useRateStar || useRatingChips
                        ? handleRateStar()
                        : handleOkButtonClicked()
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import StarRating from 'vue-star-rating'
import { RatingChips } from '@/config/variables'
import ChipInput from '@/components/ui/ChipInput.vue'
import IUserData from '@/types/user'
import FormTextInput from '@/components/ui/FormTextInput.vue'
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
        useRatingChips: {
            type: Boolean,
            default: false,
        },
        userData: {
            type: Object as PropType<IUserData>,
            required: false,
        },
    },
    emits: ['newRequestClicked', 'rateClicked'],
    components: {
        ButtonDefault,
        Sucess,
        Modal,
        StarRating,
        ChipInput,
        FormTextInput,
    },
    setup(props, context) {
        const feedbackStar = ref({
            name: '',
            email: '',
            message: '',
            rateStar: 0,
        })
        const ratingChips = RatingChips
        const chipsText = ref([] as string[])
        const inputRating = ref('')
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
            let chipText
            let tempMessage = ''
            let newFeedbackStar = { ...feedbackStar.value }
            for (chipText of chipsText.value) {
                tempMessage += chipText + ', '
            }
            if (inputRating.value.length > 0)
            {
                tempMessage += ' inputRating: { '
                tempMessage += inputRating.value + ' }'
            }
            newFeedbackStar.message = tempMessage
            if (newFeedbackStar.rateStar >= 0)
                context.emit('rateClicked', newFeedbackStar)
        }
        const chipClicked = (label: string) => {
            const newChipsText = [...chipsText.value]
            const pos = newChipsText.indexOf(label)
            if (pos == -1) newChipsText.push(label)
            else newChipsText.splice(pos, 1)
            chipsText.value = newChipsText
        }
        return {
            handleOkButtonClicked,
            feedbackStar,
            handleRateStar,
            currencyFormatBR,
            ratingChips,
            chipClicked,
            chipsText,
            inputRating
        }
    },
})
</script>

<style scoped>
/* :deep .input-base {
    background-color: rgb(245 245 245 / 80%);
}
:deep .input-base:hover {
    background-color: rgb(228 228 228 / 80%);
} */
:deep .modal-wrapper {
    height: auto;
    width: 280px;
    background-color: #e9e0d8;
}
p {
    margin-bottom: 5px;
}
.input-reason {
    width: 300px;
    margin-left: auto;
    margin-right: auto;
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
    padding: 13px 65px;
    border-radius: 4px;
    font-size: 14px;
    background-color: #b29475;
    color: #fff;
    border-color: #b29475;
    font-size: 16px;
    letter-spacing: 1px;
}
.wrapper-success .input-base {
    padding: 5px 15px;
    font-size: 14px;
}
.wrapper-success button:hover {
    background-color: #685747;
}
.wrapper-star {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
:deep .vue-star-rating-pointer {
    background-color: #64380c;
    padding: 3px 3px 1px 5px;
    border-radius: 13px;
    margin-left: 2px;
    margin-right: 2px !important;
}
.wrapper-chips {
    margin-top: 0;
    margin-bottom: 30px;
}
.label-chip {
    text-align: center;
}
.chip-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.chip-input {
    display: flex;
}
@media (min-width: 768px) {
    #message-panel {
        font-size: 18px;
        margin-bottom: 30px;
    }
    :deep .modal-wrapper {
        width: 650px;
        padding-top: 40px;
        padding-bottom: 70px;
    }
    .vue-star-rating {
        justify-content: center;
    }
    p {
        width: 400px;
        margin: 0 auto;
    }
    .wrapper-chips {
        width: 450px;
    }
}
</style>

function label(arg0: string, label: any): any {
  throw new Error('Function not implemented.')
}
