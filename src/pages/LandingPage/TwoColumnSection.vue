<template>
  <div class="two-column-section" id="two-column-section">
    <div class="column column-one">
      <img
        class="side-img"
        :src="require('@/assets/' + imageFileName)"
        :alt="altText"
      />
    </div>
    <div class="column column-two">
      <h2 v-if="requestSucceeded == false">{{ titleForm }}</h2>
      <form
        id="form-request"
        class="wrapper-form"
        @submit.prevent="submit"
        ref="div-1"
      >
        <TheFormCreditData
          v-if="!nextStep"
          @nextStepClicked="goNextStep"
          @valueChanged="creditDataChanged"
          :limit="limit"
          :installment="installment"
        />
        <TheFormUserData
          v-if="nextStep && requestSucceeded == false"
          @submitForm="submitUser"
          @backStep="backStepClicked"
          :enableMessage="enableMessage"
          :messageResponse="messageResponse"
          :status="requestSucceeded"
        />
        <TheSuccessForm
          v-if="messageResponse.title != undefined"
          :messages="sucessMessage"
          @newRequestClicked="newRequestClicked"
        />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TheFormUserData from "./TheFormUserData.vue";
import ApiController from "@/api/controller";
import IUserData from "@/types/user";
import TheFormCreditData from "./TheFormCreditData.vue";
import TheSuccessForm from "./TheSuccessForm.vue";
import { TitleForm, SucessMessage } from "@/config/variables";
import GetIPApi from "@/api/getIpApi";

@Options({
  props: {
    imageFileName: String,
    altText: String,
  },
  components: {
    TheFormUserData,
    TheFormCreditData,
    TheSuccessForm,
  },
})
export default class TwoColumnSection extends Vue {
  titleForm = TitleForm;
  sucessMessage = SucessMessage;
  enableMessage = false;
  messageResponse = {};
  requestSucceeded = false;
  nextStep = false;
  installment = "6x";
  limit = "10k";
  ip = "";
  os = "Unknown OS";

  submitUser(user: IUserData, reset: () => void): void {
    user.limit = this.limit;
    user.installment = this.installment;
    user.ip = this.ip;
	user.os = this.os;
    user.timestamp = Date.now();
    new ApiController()
      .postUser(user)
      .then(() => {
        this.requestSucceeded = true;
        this.enableMessage = true;
        reset();
        this.messageResponse = { title: "Solicitação recebida com sucesso!" };
      })
      .catch((err) => {
        this.enableMessage = true;
        this.messageResponse = err.response.data.errors;
        this.requestSucceeded = false;
      });
    console.log(user);
  }
  goNextStep(): void {
    this.nextStep = true;
  }
  backStepClicked(): void {
    this.nextStep = false;
  }
  creditDataChanged(limit: string | null, installment: string | null): void {
    // console.log("Credit data", limit, installment)
    if (limit != null) this.limit = limit;
    if (installment != null) this.installment = installment;
  }
  newRequestClicked(): void {
    this.nextStep = false;
    this.messageResponse = {};
    this.requestSucceeded = false;
  }
  getOS(): void {
    if (navigator.userAgent.indexOf("Win") != -1) this.os = "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) this.os = "MacOS";
    if (navigator.userAgent.indexOf("Linux") != -1) this.os = "Linux";
  }
  mounted(): void {
    new GetIPApi().getIP().then((res) => {
      this.ip = res.data.ip;
    });
	this.getOS();
  }
}
</script>

<style scoped>
.two-column-section {
  display: flex;
  width: 100%;
  background-color: #b2937548;
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
  height: 100vh;
}
.column-two h2 {
  margin-top: 10px;
}
.side-img {
  height: 100%;
}
@media (min-width: 768px) {
  .two-column-section {
    flex-direction: row;
  }
  .column {
    width: 50%;
  }
  .column-one {
    height: 700px;
  }
  .column-two {
    padding: 0 20px;
    height: auto;
  }
}
@media (min-width: 992px) {
  .side-img {
    width: 100%;
    height: auto;
  }
}
@media (min-width: 1200px) {
  .side-img {
    transform: translateY(-50%);
    margin-top: 50%;
  }
}
</style>
