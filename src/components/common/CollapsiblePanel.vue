<template>
  <div class="wrapper-panel">
    <div
      class="header-panel"
      :class="{ 'rounded-border': isCollapsed }"
      v-on:click="onHeaderClicked()"
    >
      <h3 class="title">
        {{ title }}
      </h3>
      <Caret
        color="#b29475"
        width="30"
        height="30"
        :isCollapsed="isCollapsed"
      />
    </div>
    <div class="content" v-bind:class="{ hidden: isCollapsed }">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Caret from "@/components/icons/Caret.vue";

@Options({
  props: {
    title: String,
    content: String,
  },
  components: {
    Caret,
  },
})
export default class CollapsiblePanel extends Vue {
  isCollapsed = true;

  onHeaderClicked(): void {
    this.isCollapsed = this.isCollapsed ? false : true;
  }
}
</script>

<style scoped>
.wrapper-panel {
  display: flex;
  flex-direction: column;
}
.rounded-border {
  border-radius: 15px;
}
.header-panel {
  display: flex;
  justify-content: space-between;
  border: 1px solid #070708;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: #b29475;
  padding: 15px 30px;
  cursor: pointer;
  background-color: #070708;
}
.content {
  border-bottom: 1px solid #b29475;
  border-left: 1px solid #b29475;
  border-right: 1px solid #b29475;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 15px 30px;
}
.title {
  padding: 5px;
}
.hidden {
  display: none;
}
</style> 