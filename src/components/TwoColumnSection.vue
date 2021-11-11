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
      <TheForm
        @submitForm="submitUser"
        :enableMessage="enableMessage"
        :messageResponse="messageResponse"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TheForm from "./TheForm.vue";
import ApiController from "../api/controller";
import IUserData from "../types/user";
import { TitleForm } from "../text/variables";

@Options({
  props: {
    imageFileName: String,
    altText: String,
  },
  components: {
    TheForm,
  },
})
export default class TwoColumnSection extends Vue {
  titleForm = TitleForm;
  enableMessage = false;
  messageResponse = {};
  submitUser(user: IUserData, reset: () => void): void {
    new ApiController()
      .postUser(user)
      .then((res) => {
        this.enableMessage = true;
        reset();
        this.messageResponse = { title: res.statusText };
      })
      .catch((err) => {
        this.enableMessage = true;
        this.messageResponse = err.response.data.errors;
      });
  }
}
</script>

<style scoped>
.two-column-section {
  display: flex;
  width: 100%;
  background-color: #b2937548;
}
.column {
  width: 50%;
}
.column-one {
  overflow: hidden;
  height: 700px;
}
.column-two {
  padding: 0 20px;
  align-self: center;
}
.column-two h2 {
  font-size: 28px;
  font-weight: 400;
  text-align: center;
}
.side-img {
  width: 100%;
}
</style>