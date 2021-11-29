<template>
  <div class="information-section" id="information-section">
    <h2>{{ titleInfo }}</h2>
    <div class="wrapper-item" v-for="(info, index) of infos" :key="index">
      <div class="column-info wrapper-img">
        <img
          :src="require('@/assets/info/' + info.img)"
          alt=""
          class="image-information"
        />
      </div>
      <div class="column-info wrapper-text-information">
        <p>
          {{ info.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";

const InformationSection = defineComponent({
  props: {
    infos: {
      type: Array,
      required: true
    },
    titleInfo: {
      type: String,
      required: true
    }
  }
});
export default InformationSection;
</script>

<style scoped>
.information-section h2 {
  margin-bottom: 40px;
}
.wrapper-item {
  display: flex;
  justify-content: space-evenly;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  flex-direction: column;
}
.image-information {
  width: 100%;
}
.wrapper-text-information p {
  padding: 0 40px;
}
.column-info {
  width: calc(100%);
  margin-bottom: 30px;
}
@media (min-width: 768px) {
  .information-section {
    padding-left: 10px;
    padding-top: 50px;
  }
  .wrapper-item {
    flex-direction: row;
  }
  .wrapper-item:nth-child(even) {
    flex-direction: row-reverse;
  }
  .column-info {
    width: calc(50% - 60px);
	margin-bottom: 30px;
  }
}
</style>
