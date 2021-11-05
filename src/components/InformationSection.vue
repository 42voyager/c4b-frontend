<template>
  <div class="information-section" id="information-section">
    <h2>Informações sobre o produto</h2>
    <div class="wrapper-item">
    <div class="column wrapper-img">
      <img 
        :src="require('@/assets/' + imageFileName1)" 
        alt="" 
        class="image-information" />
    </div>
      <div class="column wrapper-text-information">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus
          tempor massa eu sodales. Aenean scelerisque justo lorem, ut semper
          velit commodo convallis. Quisque auctor arcu augue, facilisis luctus
          diam gravida sit amet. Quisque pharetra luctus dui non varius.
          Phasellus tempus mauris turpis, et mattis orci gravida eget. Sed
          vestibulum massa et ante sollicitudin pellentesque.
        </p>
      </div>
    </div>

    <div class="wrapper-item">
    <div class="column wrapper-img">
      <img 
        :src="require('@/assets/' + imageFileName2)" 
        alt="" 
        class="image-information" />
    </div>
      <div class="column wrapper-text-information">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus
          tempor massa eu sodales. Aenean scelerisque justo lorem, ut semper
          velit commodo convallis. Quisque auctor arcu augue, facilisis luctus
          diam gravida sit amet. Quisque pharetra luctus dui non varius.
          Phasellus tempus mauris turpis, et mattis orci gravida eget. Sed
          vestibulum massa et ante sollicitudin pellentesque.
        </p>
      </div>
    </div>

    <div class="wrapper-item">
    <div class="column wrapper-img">
      <img 
        :src="require('@/assets/' + imageFileName3)" 
        alt="" 
        class="image-information" />
    </div>
      <div class="column wrapper-text-information">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus
          tempor massa eu sodales. Aenean scelerisque justo lorem, ut semper
          velit commodo convallis. Quisque auctor arcu augue, facilisis luctus
          diam gravida sit amet. Quisque pharetra luctus dui non varius.
          Phasellus tempus mauris turpis, et mattis orci gravida eget. Sed
          vestibulum massa et ante sollicitudin pellentesque.
        </p>
      </div>
    </div>
  </div>

  
</template>

<script>
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        imageFileName1: String,
        imageFileName2: String,
        imageFileName3: String
    }
})
export default class InformationSection extends Vue {

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
.wrapper-text-information p{
    padding: 0 40px;
}
.column {
    width: calc(50% - 60px);
}
</style>
