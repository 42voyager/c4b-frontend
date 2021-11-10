<template>
  <form class="wrapper-form" @submit.prevent="submit">
    <h3>Dados para contato</h3>
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
    <h3>Dados da empresa</h3>
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
      class="message-panel"
      id="message-panel"
      v-bind:class="{ disable: !enableMessage }"
    >
      <ul>
        <li>
          {{
            messageResponse.Name != undefined
              ? messageResponse.Name.join("")
              : null
          }}
        </li>
        <li>
          {{
            messageResponse.Email != undefined
              ? messageResponse.Email.join("")
              : null
          }}
        </li>
        <li>
          {{
            messageResponse.Cnpj != undefined
              ? messageResponse.Cnpj.join("")
              : null
          }}
        </li>
        <li>
          {{
            messageResponse.Cellphone != undefined
              ? messageResponse.Cellphone.join("")
              : null
          }}
        </li>
        <li>
          {{
            messageResponse.Company != undefined
              ? messageResponse.Company.join("")
              : null
          }}
        </li>
        <li>
          {{
            messageResponse.Optin != undefined
              ? messageResponse.Optin.join("")
              : null
          }}
        </li>
      </ul>
    </div>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ButtonDefault from "./ButtonDefault.vue";

@Options({
  props: {
    enableMessage: Boolean,
    messageResponse: Object,
  },
  emit: ["submitForm"],
  components: {
    ButtonDefault,
  },
})
export default class TheForm extends Vue {
  user = {
    name: "",
    email: "",
    cellphone: "",
    cnpj: "",
    company: "",
    optin: false,
  };
  submitForm(): void {
    this.$emit("submitForm", this.user);
    this.resetForm();
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
#message-panel {
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
  background-color:#fff;
  border: solid 1px red;
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
</style>
