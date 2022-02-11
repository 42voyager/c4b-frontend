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
            <!-- <div class="wrapper-input">
                <input
                    type="text"
                    class="input-control"
                    placeholder="Nome Completo"
                    v-model="user.name"
                    v-bind:class="{
                        invalid: !checkErrorsReturn(messageResponse.Name),
                    }"
                />
                <div v-if="!checkErrorsReturn(messageResponse.Name)">
                    <InputError :msg="messageResponse.Name" />
                </div>
            </div>
            <div class="wrapper-input">
                <input
                    type="email"
                    class="input-control"
                    placeholder="E-mail"
                    v-model="user.email"
                    v-bind:class="{
                        invalid: !checkErrorsReturn(messageResponse.Email),
                    }"
                />
                <div v-if="!checkErrorsReturn(messageResponse.Email)">
                    <InputError :msg="messageResponse.Email" />
                </div>
            </div>
            <div class="wrapper-input">
                <input
                    type="text"
                    class="input-control"
                    placeholder="Celular"
                    v-maska="'(##) #####-####'"
                    v-model="user.cellphone"
                    v-bind:class="{
                        invalid: !checkErrorsReturn(messageResponse.Cellphone),
                    }"
                />
                <div v-if="!checkErrorsReturn(messageResponse.Cellphone)">
                    <InputError :msg="messageResponse.Cellphone" />
                </div>
            </div>
            <div class="wrapper-input">
                <input
                    type="text"
                    class="input-control"
                    placeholder="CNPJ"
                    v-maska="'##.###.###/####-##'"
                    v-model="user.cnpj"
                    v-bind:class="{
                        invalid: !checkErrorsReturn(messageResponse.Cnpj),
                    }"
                />
                <div v-if="!checkErrorsReturn(messageResponse.Cnpj)">
                    <InputError :msg="messageResponse.Cnpj" />
                </div>
            </div>
            <div class="wrapper-input">
                <input
                    type="text"
                    class="input-control"
                    placeholder="Nome da Empresa"
                    v-model="user.company"
                    v-bind:class="{
                        invalid: !checkErrorsReturn(messageResponse.Company),
                    }"
                />
                <div v-if="!checkErrorsReturn(messageResponse.Company)">
                    <InputError :msg="messageResponse.Company" />
                </div>
            </div> -->
            <div class="wrapper-optin">
                <label for="optin" class="label-optin">
                    Li e aceito os
                    <a v-on:click.prevent="openModal()" href="#">
                        termos e condições
                    </a>
                    de relacionamento com o Banco ABC. Autorizo a consulta de
                    SRC e da Agenda de recebíveis da empresa.
                    <input
                        id="optin"
                        type="checkbox"
                        class="checkbox-optin"
                        v-model="user.optin"
                        v-bind:class="{
                            invalid: !checkErrorsReturn(messageResponse.Optin),
                        }"
                        @change="$emit('change', $event.target.checked)"
                    />
                    <span class="checkmark"></span>
                </label>
                <div v-if="!checkErrorsReturn(messageResponse.Optin)">
                    <InputError :msg="messageResponse.Optin" />
                </div>
            </div>
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
            <div
                id="message-panel"
                v-if="!checkErrorsReturn(messageResponse.title)"
            >
                <p>
                    {{ messageResponse.title }}
                </p>
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
import { defineComponent, ref } from 'vue'
import { checkErrorsReturn, EValidity } from '@/use/validInput'

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
            inputValidationStatus.value = newStatus
            if (
                inputValidationStatus.value.name == EValidity.Valid &&
                inputValidationStatus.value.email == EValidity.Valid &&
                inputValidationStatus.value.cellphone == EValidity.Valid &&
                inputValidationStatus.value.cnpj == EValidity.Valid &&
                inputValidationStatus.value.company == EValidity.Valid
            )
                return true
            else return false
        }
        const submitForm = (): void => {
            if (!validFrontForm(user.value)) return
            context.emit('submitForm', user.value, resetForm)
        }
        const backStep = (): void => {
            context.emit('backStep')
        }
        const openModal = (): void => {
            openedModal.value = !openedModal.value
        }
        const capitalize = (name: string): string => {
            return name[0].toUpperCase() + name.substr(1).toLowerCase()
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
.input-control {
    width: calc(100% - 30px);
    margin: 10px 0;
    padding: 15px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
}
.wrapper-optin {
    margin: 10px 0;
    width: 100%;
}
.wrapper-optin a {
    color: #977f66;
    text-decoration: underline;
}
.wrapper-optin a:hover {
    text-decoration: none;
}
.label-optin {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 13px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.checkbox-optin {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: white;
    border: solid 1px #b29475;
}
.label-optin:hover input ~ .checkmark {
    border-color: #977f66;
}
.label-optin:hover input:checked ~ .checkmark {
    border-color: #b29475;
}
.label-optin input:checked ~ .checkmark {
    background-color: #b29475;
}
.checkmark::after {
    content: '';
    position: absolute;
    display: none;
}
.label-optin input:checked ~ .checkmark::after {
    display: block;
}
.label-optin .checkmark::after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
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
.disable {
    display: none;
}
.invalid {
    border: solid 1px red;
    margin-bottom: 0;
}
.modal-body {
    overflow-y: auto;
    height: 100%;
}
</style>
