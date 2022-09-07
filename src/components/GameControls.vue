<template>
  <div id="controls-modal" class="flex align-center justify-center">
    <div class="flex-column align-center">
      <button class="close-btn" @click="close()" v-if="showClose">
        <div class="hexagon">
<!--          <CloseIcon/>-->
        </div>
      </button>
      <div class="controls-input flex-column align-center">
        <div class="trapezoid t1"></div>
        <div class="trapezoid t2"></div>
        <div class="trapezoid t3"></div>
        <div class="trapezoid t4"></div>

        <div class="controls-columns flex">
          <div class="column-2 flex-column align-center">
            <p class="text">キャラクター移動</p>
            <div class="flex-column">
              <div class="flex">
                <div class="hexagon">W</div>
                <div class="hexagon">A</div>
                <div class="hexagon">S</div>
                <div class="hexagon">D</div>
              </div>
              <div class="flex">
                <div class="hexagon">
                  <ArrowUpIcon/>
                </div>
                <div class="hexagon">
                  <ArrowLeftIcon/>
                </div>
                <div class="hexagon">
                  <ArrowDownIcon/>
                </div>
                <div class="hexagon">
                  <ArrowRightIcon/>
                </div>
              </div>
            </div>

          </div>
          <div class="column-2 flex-column align-center">
            <p class="text">カメラを移動する</p>
            <div class="flex align-center mouse-controls">
              <div class="hexagon">
                <MouseIcon/>
              </div>
              <p class="mouse-text">クリック＆ドロップ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import CloseIcon from '@/components/icons/CloseIcon.vue';
import ArrowUpIcon from '@/components/icons/ArrowUpIcon.vue';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
import MouseIcon from '@/components/icons/MouseIcon.vue';

interface Props {
  showClose?: boolean
  active?: boolean
}

// Emit for using 'active' as v-model
interface Emits {
  (e: "update:active", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const close = () => {
  emit('update:active', false)
}
</script>
<style scoped>
/* #controls-modal {
  position: absolute;
  z-index: 10;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #1c32e2;
  backdrop-filter: blur(3px);
} */

#controls-modal .close-btn {
  align-self: flex-end;
  margin-bottom: 10px;
}

#controls-modal .controls-input {
  position: relative;
  width: 500px;
  background: rgb(30, 25, 37);
  background: linear-gradient(315deg, rgba(40, 35, 47, 1) 0%, rgba(70, 70, 90, 0.95) 100%);
  border-radius: 0;
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
}

#controls-modal .controls-input .text {
  color: #fff;
  margin: 10px 0;
}

#controls-modal .controls-columns {
  width: 100%;
  padding: 30px 0;
  color: rgb(130, 120, 140);
}

#controls-modal .trapezoid {
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
}

#controls-modal .t1 {
  top: 0;
  left: 50px;
  border-top: 8px solid rgb(90, 90, 115);
  width: 150px;
}

#controls-modal .t2 {
  bottom: 0;
  right: 50px;
  border-bottom: 8px solid rgb(90, 90, 115);
  width: 120px;
}

#controls-modal .t3 {
  bottom: 0;
  left: 200px;
  border-bottom: 8px solid rgb(90, 90, 115);
  width: 60px;
}

#controls-modal .t4 {
  top: 0;
  right: 15px;
  border-top: 8px solid rgb(90, 90, 115);
  width: 30px;
}

#controls-modal .hexagon {
  --hex: 40px;
  --hexhalf: 20px;
  --hexheight: calc(var(--hex) / 1.732);
  --hexheight2: calc(var(--hex) / 3.464);
  --hexheight2m: calc(var(--hex) / -3.464);
  margin: 16px 4px;
  width: var(--hex);
  /* height: 28.8675px; */
  height: var(--hexheight);
  background-color: rgb(90, 90, 115);
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

#controls-modal .hexagon::before {
  content: "";
  position: absolute;
  top: var(--hexheight2m);
  left: 0;
  width: 0;
  height: 0;
  border-left: var(--hexhalf) solid transparent;
  border-right: var(--hexhalf) solid transparent;
  border-bottom: var(--hexheight2) solid rgb(90, 90, 115);
}

#controls-modal .hexagon::after {
  content: "";
  position: absolute;
  bottom: var(--hexheight2m);
  left: 0;
  width: 0;
  height: 0;
  border-left: var(--hexhalf) solid transparent;
  border-right: var(--hexhalf) solid transparent;
  border-top: var(--hexheight2) solid rgb(90, 90, 115);
}

#controls-modal .hexagon svg {
  width: 23px;
  fill: white;
}

#controls-modal button.start-btn {
  margin-top: 30px;
  background-color: #1C32E2;
  color: white;
  width: 220px;
  height: 60px;
}

#controls-modal button.start-btn span.play-icon {
  display: inline-block;
  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: white;
  top: 5px;
  right: 7px;
}

#controls-modal button.start-btn span.play-icon::after {
  content: "";
  position: absolute;
  top: 7px;
  left: 8px;
  border-left: solid 5px #000;
  border-top: solid 3px transparent;
  border-bottom: solid 3px transparent;
}

#controls-modal .mouse-controls {
  height: 100%;
}

#controls-modal .mouse-text {
  margin-left: 10px;
  color: #fff;
}

#controls-modal svg :deep(.mouse-icon) {
  stroke: #1c32e2;
  fill: #1c32e2;
}

.column-2 {
  width: 50%;
}
</style>
