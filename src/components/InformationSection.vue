<template>
  <div class="information-section" id="information-section">
    <h2>{{ titleInfo }}</h2>
    <div class="wrapper-item">
      <div class="column wrapper-img">
        <img
          :src="require('@/assets/info/' + imageFileName1)"
          alt=""
          class="image-information"
        />
      </div>
      <div class="column wrapper-text-information">
        <p>
          {{ info1 }}
        </p>
      </div>
    </div>

    <div class="wrapper-item">
      <div class="column wrapper-img">
        <img
          :src="require('@/assets/info/' + imageFileName2)"
          alt=""
          class="image-information"
        />
      </div>
      <div class="column wrapper-text-information">
        <p>
          {{ info2 }}
        </p>
      </div>
    </div>

    <div class="wrapper-item">
      <div class="column wrapper-img">
        <img
          :src="require('@/assets/info/' + imageFileName3)"
          alt=""
          class="image-information"
        />
      </div>
      <div class="column wrapper-text-information">
        <p>
          {{ info3 }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import { TitleInfo, Info1, Info2, Info3 } from "../text/variables";

@Options({
  props: {
    imageFileName1: String,
    imageFileName2: String,
    imageFileName3: String,
  },
})
export default class InformationSection extends Vue {
  titleInfo = TitleInfo;
  info1 = Info1;
  info2 = Info2;
  info3 = Info3;
}
</script>

<style scoped>
.information-section {
  padding-left: 10px;
  padding-top: 50px;
}
.information-section h2 {
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 400;
  text-align: center;
}
.wrapper-item {
  display: flex;
  justify-content: space-evenly;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}
.wrapper-item:nth-child(even) {
  flex-direction: row-reverse;
}
.image-information {
  width: 100%;
}
.wrapper-text-information p {
  padding: 0 40px;
}
.column {
  width: calc(50% - 60px);
}
</style>
