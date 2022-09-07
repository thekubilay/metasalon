<script setup lang="ts">
import { ref } from 'vue'
// import {Dialog} from "../types/Dialog"
interface Dialog {
    width?: string,
    height?: string 
}

const props = defineProps<Dialog>();
</script>

<template>
    <div class="dialog-container flex align-center justify-center overflow-y-hidden">
        <div class="dialog" :style="{width:width,height:height}">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.dialog-container {
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
.dialog {
  position: relative;
  background-color: white;
  width: 540px;
  min-height: 200px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 0;
  box-shadow: rgba(149, 157, 165, 1) 0 8px 24px;
  border: 1px solid #f1f1f1;
}
</style>