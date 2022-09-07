<template>
<div class="loading-wrapper">
  <div class="loading-content">
    <div class="loading-header flex-column align-start">
      <p class="header-text">プログレス</p>
      <p class="percent-text"><span class="percent">{{cutoffPercent.toFixed(1)}}%</span><span class="complete-text">完成</span></p>
      <span class="remaining-text">残り約 <span class="seconds">{{timeLeft}}秒</span></span>
    </div>
    <div class="loading-progress">
      <div class="loading-fill" :style="'width: '+cutoffPercent+'%;'"></div>
    </div>
    <div class="loading-text">
      {{text}}
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
  import {ref, watch, onMounted, computed} from "vue";

  interface Props {
    text: string
    percent:number
  }

  const props = defineProps<Props>();
  const startTime = ref<number>(0)
  const startPer = ref<number>(0)
  const timeLeft = ref<number>(0)

  const cutoffPercent = computed(() => {
    return Math.min(100.0,Math.max(props.percent,0.0))
  })

  watch(() => props.percent, (val) => {
    const secs = (Date.now()-startTime.value)/1000 //sec since start
    const per = (cutoffPercent.value - startPer.value)/secs
    timeLeft.value = parseFloat(((100 - cutoffPercent.value)/ per).toFixed(0))
  })

  onMounted(() => {
    startTime.value = Date.now()
    startPer.value = props.percent
  })

</script>
<style scoped>
.loading-wrapper {
  min-width: 200px;
  max-width: 500px;
  width: 100%;
}
.loading-content {
  background-color: #fff;
  padding: 10px 30px;
}

.loading-header {
  font-size: 0.7rem;
  margin-bottom: 20px;
}
.loading-header .header-text {
  margin-bottom: 5px;
  font-weight: 600;
  color: rgb(127,127,127);
}
.loading-header .percent-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
}

.loading-header .percent-text span.percent {
  font-size: 1.5rem;
  font-weight: 600;
}
.loading-header .percent-text span.complete-text {
  display: inline-block;
  margin-left: 5px;
}

.loading-header .remaining-text {
  align-self: flex-end;
  font-size: 0.65rem;
  /* font-weight: 500; */
  color: rgb(127,127,127);
}

/* .loading-header .remaining-text .seconds {
  color: #000;
} */

.loading-progress {
  width: 100%;
  height: 15px;
  background-color: rgb(246,250,255);
  border: solid 1px rgb(243,247,250);
  border-radius: 20px;
}

.loading-progress .loading-fill {
  height: 100%;
  border-radius: 20px;
  /* background: linear-gradient(#1c32e2); */
  background: linear-gradient(90deg, #1c32e2, rgb(230, 159, 245));
}

.loading-text {
  margin-top: 10px;
  font-size: 0.7rem;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: start;
  color: rgb(127,127,127);
}
</style>
