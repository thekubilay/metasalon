<template>
  <div id="dt" style="display: none"
       class="dc flex align-center justify-center overflow-y-hidden">
    <div ref="window" class="dialog outer">
      <div class="inner flex-column">
        <p id="mapText" class="context text-center">
          <span class="block text-center"></span>
          <span class="block text-center">テレポートしますか</span>
        </p>
        <div class="actions flex justify-space-between">
          <button @click="close()" class="close column-2-space">閉じる</button>
          <button @click="enter()" class="enter column-2-space">テレポート</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, PropType, ref, watch} from "vue";
import {useRouter} from "vue-router";
import useStore from "@/store/useStore";
import Game from "@/nazare/Game";

interface Emit {
  (e: "update:modelValue", modelValue: boolean): void;
}

const emits = defineEmits<Emit>()
const props = defineProps({
  modelValue: Boolean as PropType<boolean>
})
const {focusToCanvas, teleportMap, myself} = useStore()
const router = useRouter()
const window = ref<HTMLDivElement>({} as HTMLDivElement)
const game = new Game()

onMounted((): void => {
  focusToCanvas.value = false
})

const close = (): void => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const dialog = document.getElementById("dt") as HTMLDivElement
  canvas.focus()
  dialog.style.display = "none"
  emits("update:modelValue", false)
}

const enter = () => {
  const teleport = document.getElementById("mapText")?.dataset.teleport as string
  router.push({name: "Office", params: {id: myself.value.socketID + "$" + teleport}})
}

// onClickOutside(window, (e: any): void => {
//   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
//   const dialog = document.getElementById("dt") as HTMLDivElement;
//   canvas.focus()
//   dialog.style.display = "none"
// })


</script>

<style>
.dc {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: rgba(61, 61, 61, 0.3);
  cursor: initial;
}

.dc .dialog.outer {
  width: 300px;
  height: auto;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.dc .dialog.outer .inner {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: rgba(149, 157, 165, 1) 0px 8px 24px;
  padding: 10px;
}

.dc .dialog.outer .inner p.context {
  font-size: .8rem;
  padding: 5px;
  color: #556080;
}


.dc .dialog.outer .inner .actions {
  margin-top: 14px;
}

.dc .dialog.outer .inner .actions button {
  height: 44px;
  font-size: .9rem;
  font-weight: 500;
  color: #FFFFFF;
  outline: none;
  border: 0;
  width: 45%;
  border-radius: 10px;
}

.dc .dialog.outer .inner .actions button.close {
  background-color: #f5f6fa;
  color: #556080;
}

.dc .dialog.outer .inner .actions button.enter {
  background-color: #3742fa;
  color: #ffffff;
}


/* fade enter and leave transition*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
