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
      <h2>{{ titleForm }}</h2>
      <form id="form-request" class="wrapper-form" @submit.prevent="submit">
        <TheFormCreditData
          v-if="!nextStep"
          @nextStepClicked="goNextStep"
          @valueChanged="creditDataChanged"
          :limit="limit"
          :installment="installment"
        />
        <TheFormUserData
          v-if="nextStep && messageResponse.title == undefined"
          @submitForm="submitUser"
          @backStep="backStepClicked"
          :enableMessage="enableMessage"
          :messageResponse="messageResponse"
          :status="status"
        />
        <TheSuccessForm 
          v-if="messageResponse.title != undefined"
          message="Solicitação recebida com sucesso!"
          @newRequestClicked="newRequestClicked" />
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
import { TitleForm } from "@/config/variables";

@Options({
  props: {
    imageFileName: String,
    altText: String,
  },
  components: {
    TheFormUserData,
    TheFormCreditData,
    TheSuccessForm
  },
})
export default class TwoColumnSection extends Vue {
  titleForm = TitleForm;
  enableMessage = false;
  messageResponse = {};
  status = false;
  nextStep = false;
  installment = "6x";
  limit = "10k";

  submitUser(user: IUserData, reset: () => void): void {
    user.limit = this.limit;
    user.installment = this.installment;
    new ApiController()
      .postUser(user)
      .then(() => {
        this.status = true;
        this.enableMessage = true;
        reset();
        this.messageResponse = { title: "Solicitação recebida com sucesso!" };
      })
      .catch((err) => {
        this.enableMessage = true;
        this.messageResponse = err.response.data.errors;
        this.status = false;
      });
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
    this.status = false
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
