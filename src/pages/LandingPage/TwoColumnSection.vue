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
      <form id="form-request" class="wrapper-form" @submit.prevent="submit" ref="div-1">
        <TheFormCreditData
          v-if="!nextStep"
          @nextStepClicked="goNextStep"
          @valueChanged="creditDataChanged"
          :limit="limit"
          :installment="installment"
        />
        <TheFormUserData
          v-if="nextStep && requestSucceeded == false"
          @submitForm="reca"
          @backStep="backStepClicked"
          :enableMessage="enableMessage"
          :messageResponse="messageResponse"
          :status="requestSucceeded"
        />
        <TheSuccessForm
          v-if="messageResponse.title != undefined"
          :messages="sucessMessage"
          @newRequestClicked="newRequestClicked" />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useReCaptcha } from 'vue-recaptcha-v3'
import TheFormUserData from "./TheFormUserData.vue";
import ApiController from "@/api/controller";
import CaptchaApi from "@/api/captchaApi";
import IUserData from "@/types/user";
import TheFormCreditData from "./TheFormCreditData.vue";
import TheSuccessForm from "./TheSuccessForm.vue";
import { TitleForm, SucessMessage } from "@/config/variables";

const TwoColumnSection = defineComponent({
  props: {
    imageFileName: String,
    altText: String,
  },
  components: {
    TheFormUserData,
    TheFormCreditData,
    TheSuccessForm
  },
  setup() {
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!
    const titleForm = TitleForm;
    const sucessMessage = SucessMessage
    const enableMessage = false;
    const messageResponse = {};
    const requestSucceeded = false;
    const nextStep = ref(false);
    const installment = "6x";
    const limit = "10k";

    const reca = async () => {
      console.log('aaa')
      await recaptchaLoaded()
      const token = await executeRecaptcha('login');
      console.log('Recaptcha token', token);
      const res = await new CaptchaApi().postToken(token)
      console.log(res)
    }
    const fun = () => {
      console.log('fun')
    }
    const goNextStep = () => {
      nextStep.value = true;
    }
    
    return {
      reca,
      fun,
      goNextStep,
      nextStep,
      titleForm,
      sucessMessage,
      enableMessage,
      messageResponse,
      requestSucceeded,
      installment,
      limit
    }
  },
  // async submitUser(user: IUserData, reset: () => void): Promise<void> {

  //   user.limit = this.limit;
  //   user.installment = this.installment;
  //   new ApiController()
  //     .postUser(user)
  //     .then(() => {
  //       this.requestSucceeded = true;
  //       this.enableMessage = true;
  //       reset();
  //       this.messageResponse = { title: "Solicitação recebida com sucesso!" };
  //     })
  //     .catch((err) => {
  //       this.enableMessage = true;
  //       this.messageResponse = err.response.data.errors;
  //       this.requestSucceeded = false;
  //     });
  // },
  // goNextStep(): void {
  //   this.nextStep = true;
  // },
  // backStepClicked(): void {
  //   this.nextStep = false;
  // },
  // creditDataChanged(limit: string | null, installment: string | null): void {
  //   // console.log("Credit data", limit, installment)
  //   if (limit != null) this.limit = limit;
  //   if (installment != null) this.installment = installment;
  // },
  // newRequestClicked(): void {
  //   this.nextStep = false;
  //   this.messageResponse = {};
  //   this.requestSucceeded = false
  // }
})

export default TwoColumnSection;

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
