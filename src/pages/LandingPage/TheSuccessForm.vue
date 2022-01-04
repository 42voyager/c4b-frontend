<template>
  <Modal @buttonXModal="handleOkButtonClicked()" >
    <div class="wrapper-success">
      <div id="message-panel">
        <Sucess height="60" width="60" color="#b29475"/>
        <p v-for="(message, index) of messages" :key="index"> 
          {{ message }}
        </p>
      </div>
      <ButtonDefault msg="Fazer nova solicitação" @buttonClicked="handleOkButtonClicked()"/>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ButtonDefault from "@/components/ui/ButtonDefault.vue";
import Sucess from "@/components/icons/Sucess.vue";
import Modal from "@/components/ui/Modal.vue";

export default defineComponent({
  props: {
    messages: {
      type: Array as PropType<string[]>,
      required: true
    },
  },
  emits: ["newRequestClicked"],
  components: {
    ButtonDefault,
    Sucess,
    Modal
  },
  setup(props, context) {
    const handleOkButtonClicked = () => {
      context.emit("newRequestClicked")
    }
    return {
      handleOkButtonClicked
    }
  },
});

</script>

<style scoped>
p {
  margin-bottom: 5px;
}
.wrapper-success {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#message-panel {
  margin-bottom: 30px;
  width: 80%;
  max-width: 300px;
  text-align: center;
}
.wrapper-success button {
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 14px;
}
@media (min-width: 768px)
{
  #message-panel {
    font-size: 26px;
    margin-bottom: 30px;
  }
}
</style>