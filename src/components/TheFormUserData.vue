<template>
  <div id="div-form-request" class="wrapper-form" @submit.prevent="submit">
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="Nome Completo"
        v-model="user.name"
        v-bind:class="{ invalid: !validInput(messageResponse.Name) }"
      />
      <div v-if="!validInput(messageResponse.Name)">
        <InputError :msg="messageResponse.Name" />
      </div>
    </div>
    <div class="wrapper-input">
      <input
        type="email"
        class="input-control"
        placeholder="E-mail"
        v-model="user.email"
        v-bind:class="{ invalid: !validInput(messageResponse.Email) }"
      />
      <div v-if="!validInput(messageResponse.Email)">
        <InputError :msg="messageResponse.Email" />
      </div>
    </div>
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="Celular"
        v-model="user.cellphone"
        v-bind:class="{ invalid: !validInput(messageResponse.Cellphone) }"
      />
      <div v-if="!validInput(messageResponse.Cellphone)">
        <InputError :msg="messageResponse.Cellphone" />
      </div>
    </div>
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="CNPJ"
        v-model="user.cnpj"
        v-bind:class="{ invalid: !validInput(messageResponse.Cnpj) }"
      />
      <div v-if="!validInput(messageResponse.Cnpj)">
        <InputError :msg="messageResponse.Cnpj" />
      </div>
    </div>
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="Nome da Empresa"
        v-model="user.company"
        v-bind:class="{ invalid: !validInput(messageResponse.Company) }"
      />
      <div v-if="!validInput(messageResponse.Company)">
        <InputError :msg="messageResponse.Company" />
      </div>
    </div>
    <div class="wrapper-optin">
      <label for="optin" class="label-optin">
        Li e estou de acordo com os
        <input
          id="optin"
          type="checkbox"
          class="checkbox-optin"
          v-model="user.optin"
          v-bind:class="{ invalid: !validInput(messageResponse.Optin) }"
          @change="$emit('change', $event.target.checked)"
        />
        <span class="checkmark"></span>
      </label>
      <a v-on:click.prevent="openModal()" href="#"> termos e condições </a>
      <div v-if="!validInput(messageResponse.Optin)">
        <InputError :msg="messageResponse.Optin" />
      </div>
    </div>
    <div class="wrapper-button">
      <ButtonDefault msg="Voltar" @buttonClicked="backStep()" />
      <ButtonDefault msg="Solicitar" @buttonClicked="submitForm()" />
    </div>
    <div id="message-panel" v-bind:class="{ disable: !status }">
      <p v-if="!validInput(messageResponse.title)">
        {{ messageResponse.title }}
      </p>
    </div>
    <Modal v-show="!openedModal" @buttonClicked="openModal()">
      <div class="modal-header">
        <h3>Termos e condições</h3>
      </div>
      <div class="modal-body">
        <div class="header">
          <p>Informação de uso publico</p>
          <img src="img/logo-abc.png" alt="Logo ABC" />
          <p><a href="index.html#two-column-section">Voltar</a></p>
          <h1>Autorização</h1>
        </div>
        <div class="content">
          <p>
            Atendendo ao disposto na Resolução CMN nº 4571/2017 (“Resolução
            SCR”), e, no artigo 1º da Resolução CMN nº 3920/2010, conforme
            alteradas, as empresas abaixo elencadas e representadas (“Empresas”)
            autorizam, em caráter irrevogável e irretratável o Banco ABC Brasil
            S.A, bem como às demais empresas do Grupo ABC e seus eventuais
            sucessores, a consultar as informações relativas a estas ou às
            operações de crédito e operações no mercado de câmbio que estas
            realizem ou venham a realizar, conforme disponibilizadas pelo SCR –
            Sistema de Informações de Créditos do Banco Central do Brasil e pelo
            SISBACEN – Sistema de Informações do Banco Central do Brasil, ou por
            qualquer outro sistema que venha a sucedê-los.
          </p>

          <p>
            As Empresas autorizam ainda, em caráter irrevogável e irretratável,
            que referidas informações, no que tange a operações por estas
            realizadas junto ao Banco ABC Brasil S.A., sejam por este, bem como
            por demais empresas do Grupo ABC e seus eventuais sucessores,
            registradas junto a referidos sistemas.
          </p>
          <p>
            A finalidade e o uso de tais informações estão relacionados à
            operações de crédito, nos termos do art.3º da Resolução SCR, tendo
            como finalidades específicas: (i) o fornecimento de informações ao
            Banco Central do Brasil para fins de monitoramento do crédito no
            sistema financeiro e para o exercício de suas atividades de
            fiscalização; e (ii) propiciar o intercâmbio, entre as instituições
            financeiras sujeitas ao dever de conservar o sigilo bancário de que
            trata a Lei Complementar nº 105/2001, das informações referentes a
            débitos e responsabilidades de seus clientes em quaisquer operações
            de crédito, com o objetivo de subsidiar decisões negociais e de
            crédito.
          </p>

          <p>
            As Empresas declaram-se cientes de que poderão consultar as
            informações do SCR por meio do site do Registrato – Extrato do
            Registro de Informações no BACEN ou na Central de Atendimento ao
            Público do BACEN.
          </p>
          <p>
            As eventuais manifestações de discordância quanto às informações
            constantes do SCR e os pedidos de correções, exclusões e registros
            de medidas judiciais no SCR deverão ser dirigidos ao Banco ABC
            Brasil S.A, por meio de requerimento escrito e devidamente assinado
            pelo(s) representante(s) das Empresas, conforme o caso, acompanhado
            da respectiva decisão judicial, quando aplicável, observado o
            disposto nos artigos 11 e 12 da Circular BACEN nº 3.870, de 19 de
            dezembro de 2017.
          </p>

          <p>
            Ainda, as Empresas desde já concordam expressamente em estender a
            presente autorização de consulta ao SCR às demais instituições
            autorizadas a consulta-lo, nos termos da Resolução SCR, que venham a
            adquirir ou receber em garantia, ou que manifestem interesse em
            adquirir ou receber em garantia, total ou parcialmente, a presente
            operação de crédito.
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ButtonDefault from "./ButtonDefault.vue";
import InputError from "./InputError.vue";
import Modal from "./Modal.vue";

@Options({
  props: {
    enableMessage: Boolean,
    messageResponse: Object,
    status: Boolean,
  },
  emit: ["submitForm", "backStep"],
  components: {
    ButtonDefault,
    InputError,
    Modal,
  },
})
export default class TheFormUserData extends Vue {
  openedModal = true;

  user = {
    name: "",
    email: "",
    cellphone: "",
    cnpj: "",
    company: "",
    optin: false,
    limit: "10k",
    installment: "6x",
  };
  submitForm(): void {
    this.$emit("submitForm", this.user, this.resetForm);
  }
  backStep(): void {
    this.$emit("backStep");
  }
  resetForm(): void {
    const emptyUser = {
      name: "",
      email: "",
      cellphone: "",
      cnpj: "",
      company: "",
      optin: false,
      limit: "10k",
      installment: "6x",
    };
    this.user = emptyUser;
  }
  validInput(data: Array<string>) {
    if (data != undefined && data.length != 0) return false;
    else return true;
  }
  openModal(): void {
    this.openedModal = !this.openedModal;
    console.log("Clicou no link:", this.openedModal);
  }
}
</script>

<style scoped>
.wrapper-form {
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.input-control {
  width: 100%;
  margin: 10px 0;
  padding: 5px;
  font-size: 18px;
}
.wrapper-optin {
  margin: 10px 0;
  width: 100%;
}
.label-optin {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 15px;
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
  content: "";
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
}
</style>
