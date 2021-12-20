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
      <form id="form-request" class="wrapper-form" @submit.prevent ref="div-1">
        <TheFormCreditData2/>
        <TheFormUserData
          v-show="nextStep && requestSucceeded == false"
          @submitForm="submitUser"
          @backStep="backStepClicked"
          :enableMessage="enableMessage"
          :messageResponse="messageResponse"
        />
        <TheSuccessForm
          v-if="requestSucceeded === true"
          :messages="sucessMessage"
          @newRequestClicked="newRequestClicked"
        />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useReCaptcha } from "vue-recaptcha-v3";
import TheFormUserData from "./TheFormUserData.vue";
import ApiController from "@/api/C4bApi";
import IUserData from "@/types/user";
import TheFormCreditData from "./TheFormCreditData.vue";
import TheFormCreditData2 from "./TheFormCreditData2.vue";
import TheSuccessForm from "./TheSuccessForm.vue";
import { TitleForm, SucessMessage, errorMsgs } from "@/config/variables";
import GetIPApi from "@/api/getIpApi";

const TwoColumnSection = defineComponent({
  props: {
    imageFileName: String,
    altText: String,
  },
  components: {
    TheFormUserData,
    // TheFormCreditData,
    TheSuccessForm,
    TheFormCreditData2
  },
  setup() {
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!;
    const titleForm = TitleForm;
    const sucessMessage = SucessMessage;
    const enableMessage = ref(false);
    const messageResponse = ref({ title: "" });
    const requestSucceeded = ref(false);
    const nextStep = ref(false);
    const installment = ref("6x");
    const limit = ref("10k");
    const userIP = ref("");
    const userOS = ref("Unknown OS");

    const goNextStep = () => {
      nextStep.value = true;
    };
    const backStepClicked = () => {
      nextStep.value = false;
    };
    const creditDataChanged = (
      newLimit: string | null,
      newInstallment: string | null
    ) => {
      if (newLimit != null) limit.value = newLimit;
      if (newInstallment != null) installment.value = newInstallment;
    };
    const newRequestClicked = () => {
      nextStep.value = false;
      messageResponse.value = { title: "" };
      requestSucceeded.value = false;
    };
    const getOS = () => {
      if (navigator.userAgent.indexOf("Win") != -1) userOS.value = "Windows";
      if (navigator.userAgent.indexOf("Mac") != -1) userOS.value = "MacOS";
      if (navigator.userAgent.indexOf("Linux") != -1) userOS.value = "Linux";
    };
    onMounted(() => {
      new GetIPApi().getIP().then((res) => {
        userIP.value = res.data.ip;
      });
      getOS();
    });
    const submitUser = async (user: IUserData, reset: () => void) => {
      user.limit = limit.value;
      user.installment = installment.value;
      user.timestamp = new Date().toJSON();
      user.ip = userIP.value;
      user.os = userOS.value;
      try {
        // ReCaptcha 3 handling
        await recaptchaLoaded();
        const token = await executeRecaptcha("login");
        user.recaptchaToken = token;

        // Submit user handling
        await new ApiController().postUser(user);
        requestSucceeded.value = true;
        enableMessage.value = true;
        messageResponse.value = { title: "Solicitação recebida com sucesso!" };
        reset();
      } catch (err: any) {
        requestSucceeded.value = false;
        enableMessage.value = true;
        if (err.response && err.response.data.status == 429) {
          messageResponse.value = { title: errorMsgs.tooManyRequests };
          reset();
        } else {
          messageResponse.value = err.response.data.errors;
        }
      }
    };

    return {
      submitUser,
      goNextStep,
      backStepClicked,
      creditDataChanged,
      newRequestClicked,
      nextStep,
      titleForm,
      sucessMessage,
      enableMessage,
      messageResponse,
      requestSucceeded,
      installment,
      limit,
      userOS,
      userIP,
    };
  },
});

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
