<template>
  <form class="wrapper-form" @submit.prevent="submit">
    <h3>{{ subTitle1Form }}</h3>
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="Nome Completo"
        v-model="user.name"
      />
    </div>
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="E-mail"
        v-model="user.email"
      />
    </div>
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="Celular"
        v-model="user.cellphone"
      />
    </div>
    <h3>{{ subTitle2Form }}</h3>
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="CNPJ"
        v-model="user.cnpj"
      />
    </div>
    <div class="wrapper-input">
      <input
        type="text"
        class="input-control"
        placeholder="Nome da Empresa"
        v-model="user.company"
      />
    </div>
    <div class="wrapper-optin">
      <label for="optin" class="label-optin">
        Li e estou de acordo com os
        <a href="termos.html"> termos e condições </a>
      </label>
      <input type="checkbox" class="checkbox-optin" v-model="user.optin" />
    </div>
    <div class="wrapper-button">
      <ButtonDefault msg="Solicitar" @buttonClicked="submitForm()" />
    </div>
    <div
      class="message-panel design-panel"
      v-bind:class="{ disable: !enableMessage, colorRed: !status, colorGreen: status }"
    >
      <ul>
        <li
          v-if="
            messageResponse.Name != undefined &&
            messageResponse.Name.lenght != 0
          "
        >
          {{ messageResponse.Name.join(" ") }}
        </li>
        <li
          v-if="
            messageResponse.Email != undefined &&
            messageResponse.Email.lenght != 0
          "
        >
          {{ messageResponse.Email.join(" ") }}
        </li>
        <li
          v-if="
            messageResponse.Cellphone != undefined &&
            messageResponse.Cellphone.lenght != 0
          "
        >
          {{ messageResponse.Cellphone.join(" ") }}
        </li>
        <li
          v-if="
            messageResponse.Cnpj != undefined &&
            messageResponse.Cnpj.lenght != 0
          "
        >
          {{ messageResponse.Cnpj.join(" ") }}
        </li>
        <li
          v-if="
            messageResponse.Company != undefined &&
            messageResponse.Company.lenght != 0
          "
        >
          {{ messageResponse.Company.join(" ") }}
        </li>
        <li
          v-if="
            messageResponse.Optin != undefined &&
            messageResponse.Optin.lenght != 0
          "
        >
          {{ messageResponse.Optin.join(" ") }}
        </li>
        <li
          v-if="
            messageResponse.title != undefined &&
            messageResponse.title.lenght != 0
          "
        >
          {{ messageResponse.title }}
        </li>
      </ul>
    </div>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ButtonDefault from "./ButtonDefault.vue";
import { SubTitle1Form, SubTitle2Form } from "../text/variables";

@Options({
  props: {
    enableMessage: Boolean,
    messageResponse: Object,
    status: Boolean
  },
  emit: ["submitForm"],
  components: {
    ButtonDefault,
  },
})

export default class TheForm extends Vue {
  subTitle1Form = SubTitle1Form;
  subTitle2Form = SubTitle2Form;
  user = {
    name: "",
    email: "",
    cellphone: "",
    cnpj: "",
    company: "",
    optin: false,
  };
  submitForm(): void {
    this.$emit("submitForm", this.user, this.resetForm);
  }
  resetForm(): void {
    const emptyUser = {
      name: "",
      email: "",
      cellphone: "",
      cnpj: "",
      company: "",
      optin: false,
    };
    this.user = emptyUser;
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
  text-align: center;
  margin: 10px 0;
  position: relative;
  width: 100%;
}
.checkbox-optin {
  position: absolute;
  right: 15px;
  bottom: 10px;
}
.label-optin {
  display: block;
  margin: 0px 50px;
}
.wrapper-button {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
}
.design-panel {
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.message-panel ul {
  font-size: 12px;
  margin-bottom: 0;
}
.message-panel li {
  margin-bottom: 10px;
}
.disable {
  display: none;
}
.colorRed {
  border: solid 1px red;
}
.colorGreen {
  border: solid 1px green;
}
</style>
