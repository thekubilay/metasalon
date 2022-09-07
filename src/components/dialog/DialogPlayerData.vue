<template>
  <transition name="fade" mode="out-in">
    <div ref="dialog-exit" v-if="modelValue" class="dc flex align-center justify-center overflow-y-hidden">
      <transition name="fade-scale">
        <div v-if="modelValue" ref="window" class="dialog outer">
          <div class="inner flex-column">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {onMounted, PropType, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {onClickOutside} from '@vueuse/core'
import useStore from "@/store/useStore";
import {SOCKET} from "@/plugins/socket";

interface Emit {
  (e: "update:modelValue", modelValue: boolean): void;
}

const emits = defineEmits<Emit>()
const props = defineProps({
  modelValue: Boolean as PropType<boolean>
})
const {focusToCanvas} = useStore()
const router = useRouter()
const window = ref<HTMLDivElement>({} as HTMLDivElement)

onMounted((): void => {
  focusToCanvas.value = false
})

function close(): void {
  emits("update:modelValue", false)
}

const exit = (): void => {
  emits("update:modelValue", false)
  router.push("login")
}

onClickOutside(window, (e: any): void => {
  emits("update:modelValue", false)
})

watch(() =>props.modelValue, val => {
  focusToCanvas.value = !val
})


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
  height: 150px;
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
  font-size: .9rem;
  padding-top: 20px;
  color: #556080;
}


.dc .dialog.outer .inner .actions {
  margin-top: auto;
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

.dc .dialog.outer .inner .actions button.exit {
  background-color: #e74c3c;
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
