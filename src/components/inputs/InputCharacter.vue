<template>
  <div class="chara-container">
    <!-- label -->
    <p class="label">キャラクター選択</p>
    <!-- select area -->
    <swiper
        :slidesPerView="slidesPerView"
        :spaceBetween="0"
        :grabCursor="true"
        @slideChange="swiperSlideChange"
        @swiper="onSwiper($event)"
        class="mySwiper">
      <swiper-slide v-for="(char, idx) in characters" :key="idx">
        <p class="char"
           :class="{active:modelValue['character'].value===char}"
           @click="selectChara(char)">
          <img :src="char.split('.')[0] + '.png'" alt="">
        </p>
      </swiper-slide>
      <div class="nav flex justify-center">
        <i class="fas fa-chevron-left" :class="{disabled:slideActiveIndex===0}" @click="slideToPrev"></i>
        <span>　　</span>
        <i class="fas fa-chevron-right" :class="{disabled:slideActiveIndex===characters.length-slidesPerView}"
           @click="slideToNext"></i>
      </div>
    </swiper>
  </div>
  <!-- error message -->
  <p v-if="modelValue['character'].error" class="errors">
    <span v-for="(error, idx) in  modelValue['character'].error" :key="idx">{{ error }}</span>
  </p>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {FormData} from '@/types/Form'
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  modelValue: FormData;
  characters: string[];
}

const props = defineProps<Props>();
const _characters = ref<string[]>([])
const slideActiveIndex = ref<number>(0)
const swiperFunc = ref<typeof Swiper>();
const slidesPerView = ref<number>(4)
const onSwiper = (e: any) => {
  swiperFunc.value = e
}


/*
*to move slide
*/
const slideToPrev = () => {
  if (swiperFunc.value) {
    swiperFunc.value.slidePrev()
    slideActiveIndex.value = swiperFunc.value.activeIndex
  }
}
const slideToNext = () => {
  if (swiperFunc.value) {
    swiperFunc.value.slideNext()
    slideActiveIndex.value = swiperFunc.value.activeIndex
  }
}


/*
*to select character
*/
const selectChara = (char: string) => {
  props.modelValue['character'].value = char
}


/*
*to set character box shadow
*/
const swiperSlideChange = () => {
  if (swiperFunc.value) {
    slideActiveIndex.value = swiperFunc.value.activeIndex
    const swiperEl = document.querySelector('.swiper')
    switch (swiperFunc.value.activeIndex) {
      case 0:
        swiperEl?.classList.remove('left')
        break;
      case props.characters.length - slidesPerView:
        swiperEl?.classList.remove('right')
        break;
      default:
        swiperEl?.classList.add('right')
        swiperEl?.classList.add('left')
        break;
    }
  }

}

onMounted(() => {
  _characters.value = props.characters.map(char => {
    return char.split('.')[0].split('/')[1]
  })
  setTimeout(() => {
    const swiperEl = document.querySelector('.swiper')
    swiperEl?.classList.add('right')
  }, 250);
})

</script>


<style scoped>
.chara-container {
  position: relative;
  width: 100%;
  margin-top: 25px;
}

.chara-container .label {
  color: #808080;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0px 0 10px 0;
}

.chara-container input.error {
  background-color: rgba(255, 75, 75, 0.1);
}

.chara-container .swiper {
  box-sizing: border-box;
  position: relative;
}

.chara-container .swiper.left::before {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 30px;
  height: 100%;
  content: "";
  background: rgb(255, 255, 255);
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7091430322128851) 70%, rgba(255, 255, 255, 1) 100%);
  pointer-events: none;
}

.chara-container .swiper.right::after {
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  width: 30px;
  height: 100%;
  content: "";
  background: rgb(255, 255, 255);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7091430322128851) 70%, rgba(255, 255, 255, 1) 100%);
  pointer-events: none;
}

.chara-container .swiper .char {
  position: relative;
  height: 213px;
}

.chara-container .swiper .char::after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  border: 2.5px solid #fff;
  background-color: rgba(0, 0, 0, 0.3);
}

.chara-container .swiper .char.active::after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  border: 5px solid #ffa829;
  background-color: transparent;
}

.chara-container .swiper .char.disabled {
  pointer-events: none;
}

.chara-container .swiper .char.disabled::after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* pointer-events: none; */
}

.chara-container .swiper .nav .fas {
  font-size: 1.1rem;
  color: #afafaf;
  padding: 5px 20px;
  margin-top: 5px;
  /* border: 1px solid #afafaf; */
  cursor: pointer;
}

.chara-container .swiper .nav .fas.disabled {
  color: #e7e7e7;
  cursor: initial;
}

.errors {
  color: red;
  font-size: 0.7rem;
}
</style>
