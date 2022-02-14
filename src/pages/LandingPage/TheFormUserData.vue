<template>
    <transition name="show-user-data">
        <div id="div-form-request" class="wrapper-form">
            <FormTextInput
                v-for="(item, index) of UserConfiguration.text.formInputsInfo"
                :key="index"
                :type="item.type"
                :name="item.name"
                :placeholder="item.placeholder"
                :errors="
                    !checkErrorsReturn(messageResponse[capitalize(item.name)])
                        ? messageResponse[capitalize(item.name)]
                        : item.error
                "
                :isInvalid="
                    !checkErrorsReturn(messageResponse[capitalize(item.name)])
                        ? true
                        : inputValidationStatus[item.name] == EValidity.Invalid
                "
                v-model="user[item.name]"
                v-maska="item.mask"
            />

            <CheckboxInput
                v-model="user.optin"
                :nameID="'optin'"
                :errors="
                    !checkErrorsReturn(messageResponse.Optin)
                        ? messageResponse.Optin
                        : UserConfiguration.text.optin.error
                "
                :isInvalid="
                    !checkErrorsReturn(messageResponse.Optin)
                        ? true
                        : inputValidationStatus.optin == EValidity.Invalid
                "
            >
                Li e aceito os
                <a v-on:click.prevent="openModal()" href="#">
                    termos e condições
                </a>
                de relacionamento com o Banco ABC. Autorizo a consulta de SRC e
                da Agenda de recebíveis da empresa.
            </CheckboxInput>
            <div class="wrapper-button">
                <ButtonDefault
                    id="btn-step-back"
                    msg="Voltar"
                    @buttonClicked="backStep()"
                />
                <ButtonDefault
                    id="btn-submit-request-credit"
                    msg="Solicitar"
                    @buttonClicked="submitForm()"
                />
            </div>
            <Modal v-show="!openedModal" @buttonXModal="openModal()">
                <div class="modal-header">
                    <h3>Termos e condições</h3>
                </div>
                <div class="modal-body">
                    <div class="header">
                        <p>Informação de uso publico</p>
                        <h1>Autorização</h1>
                    </div>
                    <div class="content">
                        <p v-for="(term, index) of Terms" :key="index">
                            {{ term.text }}
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    </transition>
</template>

<script lang="ts">
import ButtonDefault from '@/components/ui/ButtonDefault.vue'
import InputError from '@/components/ui/InputError.vue'
import Modal from '@/components/ui/Modal.vue'
import { Terms, UserConfiguration } from '@/config/variables'
import FormTextInput from '@/components/ui/FormTextInput.vue'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import { defineComponent, ref } from 'vue'
import { checkErrorsReturn, EValidity, capitalize } from '@/use/validInput'

interface IUserBasicData {
    name: string
    email: string
    cellphone: string
    cnpj: string
    company: string
    optin: boolean
    limit: string
    installment: string
}

export default defineComponent({
    props: {
        enableMessage: Boolean,
        messageResponse: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    components: {
        ButtonDefault,
        InputError,
        Modal,
        FormTextInput,
        CheckboxInput,
    },
    emits: ['submitForm', 'backStep'],
    setup(props, context) {
        const openedModal = ref(true)
        const user = ref({
            name: '',
            email: '',
            cellphone: '',
            cnpj: '',
            company: '',
            optin: false,
            limit: '10k',
            installment: '6x',
        })
        const inputValidationStatus = ref({
            name: EValidity.Undefined,
            email: EValidity.Undefined,
            cellphone: EValidity.Undefined,
            cnpj: EValidity.Undefined,
            company: EValidity.Undefined,
            optin: EValidity.Undefined,
        })

        const resetForm = (): void => {
            const emptyUser = {
                name: '',
                email: '',
                cellphone: '',
                cnpj: '',
                company: '',
                optin: false,
                limit: '10k',
                installment: '6x',
            }
            user.value = emptyUser
        }
        const validFrontForm = (user: IUserBasicData): boolean => {
            const newStatus = { ...inputValidationStatus.value }
            if (user.name.length < 2) newStatus.name = EValidity.Invalid
            else newStatus.name = EValidity.Valid
            if (user.email.length < 11) newStatus.email = EValidity.Invalid
            else newStatus.email = EValidity.Valid
            if (user.cellphone.length < 15)
                newStatus.cellphone = EValidity.Invalid
            else newStatus.cellphone = EValidity.Valid
            if (user.cnpj.length < 18) newStatus.cnpj = EValidity.Invalid
            else newStatus.cnpj = EValidity.Valid
            if (user.company.length < 2) newStatus.company = EValidity.Invalid
            else newStatus.company = EValidity.Valid
            if (user.optin == false) newStatus.optin = EValidity.Invalid
            else newStatus.optin = EValidity.Valid
            inputValidationStatus.value = newStatus
            if (
                inputValidationStatus.value.name == EValidity.Valid &&
                inputValidationStatus.value.email == EValidity.Valid &&
                inputValidationStatus.value.cellphone == EValidity.Valid &&
                inputValidationStatus.value.cnpj == EValidity.Valid &&
                inputValidationStatus.value.company == EValidity.Valid &&
                inputValidationStatus.value.optin == EValidity.Valid
            )
                return true
            else return false
        }
        const submitForm = (): void => {
            console.log(user.value)
            if (!validFrontForm(user.value)) return
            context.emit('submitForm', user.value, resetForm)
        }
        const backStep = (): void => {
            context.emit('backStep')
        }
        const openModal = (): void => {
            openedModal.value = !openedModal.value
        }

        return {
            Terms,
            UserConfiguration,
            openedModal,
            user,
            submitForm,
            backStep,
            checkErrorsReturn,
            openModal,
            inputValidationStatus,
            EValidity,
            capitalize,
        }
    },
})
</script>

<style scoped>
.wrapper-form {
    max-width: 330px;
    margin-left: auto;
    margin-right: auto;
}
.wrapper-button {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    width: 100%;
}
#message-panel {
    margin-bottom: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center;
    border: solid 1px green;
}
.modal-body {
    overflow-y: auto;
    height: 100%;
}
a {
    color: #977f66;
    text-decoration: underline;
}
a:hover {
    text-decoration: none;
}
</style>
