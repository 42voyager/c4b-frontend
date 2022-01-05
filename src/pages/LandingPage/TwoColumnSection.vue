<template>
  <div class="two-column-section" id="two-column-section">
    <div class="column column-one">
      <img class="side-img" :src="require('@/assets/' + imageFileName)" :alt="altText" />
    </div>
    <div class="column column-two">
      <h2 v-if="requestSucceeded == false">{{ titleForm }}</h2>
      <form id="form-request" class="wrapper-form" @submit.prevent ref="div-1">
        <TheFormCreditDataSlider
          v-show="!nextStep"
          @formButtonClicked="goNextStep"
          @valuesChanged="creditDataChanged"
          :limit="limit"
          :installment="installment"
        />
        <!-- <TheFormCreditData
          v-show="!nextStep"
          @nextStepClicked="goNextStep"
          @valueChanged="creditDataChanged"
          :limit="limit"
          :installment="installment"
        /> -->
        <TheFormUserData
          v-show="nextStep && requestSucceeded == false"
          @submitForm="submitUser"
          @backStep="backStepClicked"
          :enableMessage="enableMessage"
          :messageResponse="messageResponse"
        />
        <TheSuccessForm
          v-if="requestSucceeded === true"
          buttonLabel="Fazer nova solicitação"
          :messages="sucessMessage"
          @newRequestClicked="newRequestClicked"
        />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import TheFormUserData from './TheFormUserData.vue'
import ApiController from '@/api/C4bApi'
import IUserData from '@/types/user'
// import TheFormCreditData from './TheFormCreditData.vue'
import TheFormCreditDataSlider from './TheFormCreditDataSlider.vue'
import TheSuccessForm from '@/components/common/TheSuccessForm.vue'
import { TitleForm, SucessMessage, errorMsgs } from '@/config/variables'
import GetIPApi from '@/api/getIpApi'

const TwoColumnSection = defineComponent({
  props: {
    imageFileName: String,
    altText: String,
  },
  components: {
    TheFormUserData,
    // TheFormCreditData,
    TheSuccessForm,
    TheFormCreditDataSlider,
  },
  setup() {
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!
    const titleForm = TitleForm
    const sucessMessage = SucessMessage
    const enableMessage = ref(false)
    const messageResponse = ref({ title: '' })
    const requestSucceeded = ref(false)
    const nextStep = ref(false)
    const installment = ref(6)
    const limit = ref(10000)
    const userIP = ref('')
    const userOS = ref('Unknown OS')
    const userReason = ref('')
    let resetInputReason = () => {
      return
    }

    const goNextStep = (reason: string, reset: () => void) => {
      nextStep.value = true
      userReason.value = reason
      resetInputReason = reset
    }
    const backStepClicked = () => {
      nextStep.value = false
    }
    const creditDataChanged = (newLimit: number | null, newInstallment: number | null) => {
      if (newLimit != null && Number(newLimit) != 0) limit.value = newLimit
      if (newInstallment != null && Number(newInstallment) != 0) installment.value = newInstallment
    }
    const newRequestClicked = () => {
      nextStep.value = false
      messageResponse.value = { title: '' }
      requestSucceeded.value = false
    }
    const getOS = () => {
      if (navigator.userAgent.indexOf('Win') != -1) userOS.value = 'Windows'
      if (navigator.userAgent.indexOf('Mac') != -1) userOS.value = 'MacOS'
      if (navigator.userAgent.indexOf('Linux') != -1) userOS.value = 'Linux'
    }
    onMounted(() => {
      new GetIPApi().getIP().then((res) => {
        userIP.value = res.data.ip
      })
      getOS()
    })
    const submitUser = async (user: IUserData, resetFormData: () => void) => {
      user.limit = limit.value.toString() as any // Parsed as string to avoid being rejected by the backend
      user.installment = installment.value.toString() as any
      user.reason = userReason.value
      user.timestamp = new Date().toJSON()
      user.ipAddress = userIP.value
      user.operatingSystem = userOS.value
      try {
        // ReCaptcha 3 handling
        await recaptchaLoaded()
        const token = await executeRecaptcha('login')
        user.recaptchaToken = token

        // Submit user handling
        await new ApiController().postUser(user)
        requestSucceeded.value = true
        enableMessage.value = true
        messageResponse.value = { title: 'Solicitação recebida com sucesso!' }
        resetFormData()
        resetInputReason()
      } catch (err: any) {
        requestSucceeded.value = false
        enableMessage.value = true
        if (err.response && err.response.data.status == 429) {
          messageResponse.value = { title: errorMsgs.tooManyRequests }
          resetFormData()
        } else {
          messageResponse.value = err.response.data.errors
        }
      }
    }

    /**
     * @param {KeyboardEvent} e - Evento do click
     * Se a tecla esc é pressionada quando o modal de sucesso está aberto o modal será fechado
     */
    const keyEscDown = (e: KeyboardEvent) => {
      if (requestSucceeded.value == true && e.key == 'Escape') newRequestClicked()
    }
    document.addEventListener('keyup', keyEscDown)
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
    }
  },
})

export default TwoColumnSection
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
}
.column-two h2 {
  margin-top: 30px;
  margin-bottom: 20px;
}
.side-img {
  height: 100vh;
}
@media (min-width: 635px) {
  .side-img {
    width: 100%;
    height: 900px;
  }
}
@media (min-width: 768px) {
  .two-column-section {
    flex-direction: row;
  }
  .column {
    width: 50%;
  }
  .column-one {
    height: 900px;
  }
  .column-two {
    padding: 0 20px;
    height: auto;
  }
}
@media (min-width: 992px) {
  .side-img {
    width: 100%;
    height: 900px;
  }
}
@media (min-width: 1200px) {
  .side-img {
    transform: translateY(-36%);
    margin-top: 50%;
    height: 950px;
  }
}
@media (min-width: 1460px) {
  .side-img {
    width: 100%;
    height: auto;
  }
}
</style>
