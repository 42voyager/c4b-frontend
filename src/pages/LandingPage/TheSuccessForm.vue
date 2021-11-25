<template>
  <div class="wrapper-success">
    <div id="message-panel">
      <p> 
        {{ message }}
      </p>
    </div>
    <ButtonDefault msg="Voltar" @buttonClicked="handleOkButtonClicked()"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonDefault from "@/components/ui/ButtonDefault.vue";

const TheSuccessForm = defineComponent({
  props: {
    message: {
      type: String,
      default: "Succeso!",
      required: true
    },
  },
  emits: ["newRequestClicked"],
  components: {
    ButtonDefault
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

export default TheSuccessForm;

</script>

<style scoped>
.wrapper-success {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#message-panel {
  margin-bottom: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 50%;
  height: 100%;
  background-color: #fff;
  text-align: center;
  border: solid 1px green;
}
</style>