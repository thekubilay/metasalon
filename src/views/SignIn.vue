<template>
  <div class="sign-in flex">

    <DynamicForm v-if="!isSmartphone()"/>

    <div ref="heroContainer" class="hero-container flex align-center justify-center"
         :class="{smartphone:isSmartphone()}">
      <div class="main">
        <p v-if="isSmartphone()" class="note">※このサイトはパソコン専用となっております。<br>　パソコンのブラウザでご利用下さい。</p>
        <h2 class="h2">メタサロンを<br>楽しもう！</h2>
        <p class="lead">最新のニュースやイベントなどの様々な情報を得ることができます。ぜひ、このワールドでバーチャルサロンを楽しんでください！</p>
      </div>
      <div class="iframe-container">
<!--        <iframe src='https://my.spline.design/hands3duicopy-7f2dfa5ad9392f8c9c5304158aa1b635/' frameborder='0'-->
<!--                width='100%' height='100%'></iframe>-->
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUtils from '@/common/useUtils';
import DynamicForm from "@/components/forms/DynamicForm.vue";
import {onMounted, ref} from "vue";

const {isSmartphone} = useUtils()
const heroContainer = ref<HTMLDivElement>()
onMounted(() => {
  if (heroContainer.value) {
    heroContainer.value.classList.add('onload')
  }
})
</script>


<style scoped>
.sign-in {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.hero-container {
  position: relative;
  width: 40vw;
  height: 100%;
  padding: 5%;
  background-color: #1c32e2;
}

.hero-container.smartphone {
  width: 100vw;
}

.hero-container .main {
  position: relative;
  z-index: 1;
  padding-bottom: 380px;
}

.hero-container .h2 {
  color: #fff;
  font-size: 3rem;
  transition: all .6s .3s;
  transform: translateY(10px);
  opacity: 0;
}

.hero-container.onload .h2 {
  transform: translateY(0);
  opacity: 1;
}

.hero-container .lead {
  font-size: 0.9rem;
  margin-top: 40px;
  padding-left: 40px;
  color: rgb(220, 220, 220);
  transition: all .6s 1.2s;
  transform: translateY(10px);
  opacity: 0;
}

.hero-container.onload .lead {
  transform: translateY(0);
  opacity: 1;
}

.hero-container .note {
  font-size: 0.9rem;
  margin: 10px 0 20px;
  color: rgb(220, 220, 220);
}

.hero-container .iframe-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all .3s 2s;
  transform: translateY(10px);
  opacity: 0;
}

.hero-container.onload .iframe-container {
  transform: translateY(0);
  opacity: 1;
}

.hero-container .footer {
  position: fixed;
  z-index: 1;
  bottom: 0;
  right: 0;
  width: 158px;
  height: 58px;
  background-color: #1c32e2;
}
</style>
