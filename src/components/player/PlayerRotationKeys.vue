<template>
  <div class="player-rotation-keys">
    <div class="top flex justify-center">
      <div class="w key"><span :class="{active:keys['w']}"  class="inner flex align-center justify-center">w</span></div>
    </div>
    <div class="bottom flex">
      <div class="a key"><span :class="{active:keys['a']}" class="inner flex align-center justify-center">a</span></div>
      <div class="s key"><span :class="{active:keys['s']}"  class="inner flex align-center justify-center">s</span></div>
      <div class="d key"><span :class="{active:keys['d']}"  class="inner flex align-center justify-center">d</span></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {Caster} from "@/types/Caster";
import useStore from "@/store/useStore";

const {other} = useStore()
const keys = ref<{ [key: string]: boolean }>({})
const caster = ref<Caster>()

onMounted((): void => {
  window.addEventListener("keydown", down)
  window.addEventListener("keyup", up)
})

function setCaster(cast: Caster): void {
  caster.value = cast
}

function isPressed(key: string): boolean {
  return keys.value[key] ? keys.value[key] : false
}

function down(e: KeyboardEvent): void {
  if (["w", "a", "s", "d"].includes(e.key) && !Object.keys(other.value).length) {
    if (keys.value[e.key]) return;
    keys.value[e.key] = true
    setCaster([e.key, true, keys.value])
  }
}

function up(e: KeyboardEvent): void {
  if (["w", "a", "s", "d"].includes(e.key) && !Object.keys(other.value).length) {
    keys.value[e.key] = false
    setCaster([e.key, false, keys.value])
  }
}

onBeforeUnmount((): void => {
  window.removeEventListener("keydown", down)
  window.removeEventListener("keyup", up)
})

</script>

<style>
.player-rotation-keys {
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 2;
}

.player-rotation-keys .key {
  display: block;
  height: 44px;
  width: 44px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.player-rotation-keys .key.w {
  position: relative;
  top: -5px;
}

.player-rotation-keys .key.s {
  margin: 0 5px 0 5px;
}


.player-rotation-keys .key .inner {
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  height: 100%;
  font-size: .75rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, .4);
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
}

.player-rotation-keys .key .inner.active {
  color: #E7ECED;
  background-color: #045de9;
  background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
}
</style>
