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
      
      <TheFormCreditData v-if="!nextStep" @nextStepClicked="goNextStep"/>
      <TheFormUserData v-else
        @submitForm="submitUser"
        @backStep="backStepClicked"
        :enableMessage="enableMessage"
        :messageResponse="messageResponse"
        :status="status"
      />
  </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TheFormUserData from "./TheFormUserData.vue";
import ApiController from "../api/controller";
import IUserData from "../types/user";
import TheFormCreditData from "./TheFormCreditData.vue";
import { TitleForm } from "../text/variables";

@Options({
  props: {
    imageFileName: String,
    altText: String,
  },
  components: {
    TheFormUserData,
    TheFormCreditData
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
      .then((res) => {
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
  goNextStep(limit: string, installment: string): void {
    console.log("FINAL", limit, installment);
    this.nextStep = true;
    this.limit = limit;
    this.installment = installment;
  }
  backStepClicked(): void {
    this.nextStep = false;
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
.side-img {
  width: 100%;
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
</style>