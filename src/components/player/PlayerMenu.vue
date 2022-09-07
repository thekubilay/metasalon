<template>
  <div class="player-menu flex">
<!--    <div class="outer view flex">-->
<!--      <div class="belt" :class="{active:myself.view === 'tpv'}"></div>-->
<!--      <div @click="view('fpv')" class="inner flex align-center justify-center pointer" :class="{active:myself.view === 'fpv'}">-->
<!--        <i class="fa-solid fa-eye"></i>-->
<!--      </div>-->
<!--      <div @click="view('tpv')" class="inner flex align-center justify-center pointer" :class="{active:myself.view === 'tpv'}">-->
<!--        <i class="fa-solid fa-street-view"></i>-->
<!--      </div>-->
<!--    </div>-->

    <div class="outer audio flex">
      <div class="belt" :class="{active:!myself.audio}"></div>
      <div @click="audio()" class="inner flex align-center justify-center pointer" :class="{active:myself.audio}">
        <i class="fa-solid fa-phone"></i>
      </div>
      <div @click="audio()" class="inner flex align-center justify-center pointer" :class="{active:!myself.audio}">
        <i class="fa-solid fa-phone-slash"></i>
      </div>
    </div>

<!--    <div @click="exit()" class="outer exit">-->
<!--      <div class="inner flex align-center justify-center pointer">-->
<!--        <Icon icon="IconLogout" color="#FFFFFF" height="16px" width="16px" />-->
<!--      </div>-->
<!--    </div>-->

    <teleport to="body">
      <component v-model="dialog" :is="component"></component>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import {ref, shallowRef} from "vue";
import Icon from "@/components/icons/Icon.vue";
import useStore from "@/store/useStore";
import {SOCKET} from "@/plugins/socket";

const {myself} = useStore()
const component = shallowRef()
const dialog = ref<boolean>(true)


const view = (view:string) => {
  myself.value.view = view
}


const audio = () => {
  myself.value.audio = !myself.value.audio
  SOCKET.emit("closeOrOpenAudio", {audio: myself.value.audio})
  document.getElementById("canvas")!.focus()
}

const exit = () => {
  import("@/components/dialog/DialogExit.vue").then(val => {
    component.value = val.default;
  })
  dialog.value = true
}

</script>

<style>
.player-menu {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.player-menu .outer {
  height: 44px;
  width: 44px;
  padding: 4px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
  backdrop-filter: blur(5px);
  transition: .3s ease-in-out;
  -webkit-backdrop-filter: blur(5px);
}

.player-menu .outer .belt {
  position: absolute;
  z-index: 1;
  left: 4px;
  top: 50%;
  transform: translate(0, -50%);
  width: 36px;
  height: 38px;
  font-size: .75rem;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.player-menu .outer .inner {
  position: relative;
  z-index: 2;
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  height: 100%;
  font-size: .75rem;
  border-radius: 8px;
  /*background-color: #FFFFFF;*/
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}


.player-menu .outer .inner i {
  font-size: 1rem;
}


.player-menu .outer.exit .inner {
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  height: 100%;
  font-size: .75rem;
  border-radius: 8px;
  background-color: #e74c3c;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.player-menu .outer.audio,
.player-menu .outer.view {
  width: 80px;
  margin-right: 10px;
  color: #FFFFFF;
}
.player-menu .outer.audio .inner,
.player-menu .outer.view .inner {
  text-transform: uppercase;
  font-weight: 600;
  width: 50%;
  height: 100%;
  font-size: .75rem;
  border-radius: 0;
  box-shadow: none;
  color: rgba(0, 0, 0, 0.4);
  transition: .3s ease-in-out;
}

.player-menu .outer.audio .inner.active,
.player-menu .outer.view .inner.active {
  color: #FFFFFF;
}

.player-menu .outer .belt {
  background-color: #3742fa;
}
.player-menu .outer .belt.active {
  transform: translate(36px, -50%);
}

</style>
