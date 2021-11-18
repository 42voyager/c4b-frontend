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
        :status="status"
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
  status = false;
  submitUser(user: IUserData, reset: () => void): void {
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