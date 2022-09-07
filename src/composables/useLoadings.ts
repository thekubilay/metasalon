import {ref, watch} from "vue";

export default function () {
  const isControls = ref<boolean>(true)
  const isLoading = ref<boolean>(true)
  const percentage = ref<number>(0.0);
  const currentProgressText = ref<number>(0.0);
  const progressTexts = [
    '環境デザイン 読み込み中...',
    'キャラクター 読み込み中...',
    'エレメント 読み込み中...'
  ]

  const onLoading = (): void => {
    // ---- Fixed speed ----
    // if(percent.value >= 0 && percent.value <= 30.0){
    //   percent.value += 1.5
    // }else if(percent.value > 30.0 && percent.value <= 70.0){
    //   percent.value += 2.0
    // }else if(percent.value > 70.0 && percent.value <= 100.0){
    //   percent.value += 3
    // }
    // ---- Random speed ----
    if (percentage.value >= 0.0 && percentage.value <= 100.0) {
      percentage.value += parseFloat((Math.random() * 3.0).toFixed(2))
    }
  }

  const interval = setInterval(onLoading, 100)

  watch(percentage, (val) => {
    if (val > 30.0 && val <= 70.0) currentProgressText.value = 1
    if (val > 70.0 && val <= 100.0) currentProgressText.value = 2
    if (percentage.value >= 100.0) {
      clearInterval(interval)
      setTimeout(() => {
        isLoading.value = false
      }, 100)
    }
  })

  return {
    isControls, isLoading, percentage, currentProgressText, progressTexts,
    onLoading,
  }

}
