<template>
  <TransitionGroup tag="ul" name="fade" class="notifications">
    <div v-for="(item, idx) in notifications" class="notify outer" :key="idx">
      <div class="inner flex">
        <button class="remove flex align-center justify-center pointer" @click="remove(idx)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
            <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
            <path
              d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
          </svg>
        </button>
        <div class="bell flex align-center justify-center">
          <svg x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;"
               xml:space="preserve">
          <path style="fill:#F2B844;"
                d="M403.065,81.145c-5.657,0-11.398-1.187-16.866-3.699c-9.846-4.523-17.342-12.608-21.107-22.767  c-3.764-10.159-3.346-21.177,1.175-31.023c4.52-9.845,12.606-17.342,22.766-21.107c10.159-3.765,21.176-3.348,31.023,1.174  c20.325,9.334,29.268,33.464,19.933,53.79l0,0C433.165,72.37,418.435,81.145,403.065,81.145z M403.138,18.106  c-2.635,0-5.274,0.469-7.819,1.411c-5.627,2.086-10.105,6.237-12.609,11.69c-2.504,5.454-2.736,11.557-0.65,17.184  S388.297,58.495,393.75,61c11.256,5.171,24.624,0.217,29.794-11.041l0,0c5.169-11.259,0.217-24.624-11.041-29.793  C409.515,18.796,406.331,18.106,403.138,18.106z M431.767,53.737h0.012H431.767z"/>
            <path style="fill:#FCC447;"
                  d="M284.133,456.309c-3.517,7.657-8.342,14.319-14.08,19.817c-18.71,17.91-47.17,23.604-72.143,12.135  c-24.973-11.469-39.202-36.766-37.808-62.628c0.432-7.936,2.339-15.936,5.856-23.595L284.133,456.309z"/>
            <path style="fill:#F2B844;"
                  d="M284.133,456.309c-3.517,7.657-8.342,14.319-14.08,19.817l-109.951-50.494   c0.432-7.936,2.339-15.936,5.856-23.595L284.133,456.309z"/>
            <path style="fill:#F2B844;"
                  d="M198.517,416.99l-32.558-14.952c-14.986,32.63-0.679,71.237,31.952,86.223   c5.648,2.594,11.478,4.291,17.331,5.186C193.777,475.027,186.126,443.972,198.517,416.99z"/>
            <path style="fill:#FCC447;"
                  d="M389.974,69.224c-78.145-35.888-169.326-4.377-218.533,102.771l-20.455,44.542  c-15.164,33.021-57.887,58.939-96.618,76.548c-25.741,11.703-25.906,48.172-0.21,59.973l169.682,77.925l169.682,77.924  c25.696,11.801,53.25-12.092,45.353-39.241c-11.883-40.852-20.065-90.148-4.899-123.17l20.455-44.542  C503.637,194.807,468.119,105.111,389.974,69.224z"/>
            <path style="fill:#F2B844;"
                  d="M108.632,318.006c38.731-17.608,81.454-43.528,96.618-76.548l20.455-44.542  c43.362-94.423,119.32-130.095,190.229-112.68c-8.008-5.719-16.679-10.749-25.96-15.011  c-78.145-35.889-169.326-4.378-218.532,102.77l-20.455,44.542c-15.164,33.02-57.887,58.939-96.618,76.548  c-25.741,11.703-25.906,48.172-0.21,59.973c0,0,24.171,11.1,54.264,24.92C82.726,366.178,82.892,329.708,108.632,318.006z"/>
        </svg>
        </div>

        <div @click="open(item.message)" class="context">
          <p class="name">{{ item.message.name }}</p>
          <p class="text">{{ item.message.body }}</p>
          <p class="text-left time">{{ new Date(item.message?.date).toLocaleTimeString("ja-JP").substring(0, 5) }}</p>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import {PropType, ref, watch} from "vue";
import {Message} from "@/types/Message";
import useStore from "@/store/useStore";

const props = defineProps({
  message: Object as PropType<Message>,
})

const {openWithNewMessage} = useStore()
const notifications = ref<{ timeout: any, message: Message }[]>([] as { timeout: any, message: Message }[])
const length = ref<number>(0)

function remove(idx: number) {
  if (idx > -1) {
    notifications.value.splice(idx, 1)
  }
}

function open(message: Message) {
  openWithNewMessage.value = message
}

watch(() => props.message, val => {
  const object: { timeout: any, message: Message } = {
    timeout: setTimeout(() => {
      notifications.value.shift()
    }, 3000),
    message: val as Message
  }

  notifications.value.unshift(object)
})

</script>

<style scoped>
.notifications {
  position: fixed;
  right: 0;
  top: 54px;
  z-index: 3;
  max-height: 550px;
  overflow: hidden;
  padding: 10px;
}

.notifications .notify.outer {
  width: 200px;
  height: 75px;
  margin-bottom: 10px;
  padding: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

}

.notifications .notify.outer .inner {
  position: relative;
  overflow: hidden;
  background-color: #3742fa;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  color: #FFFFFF;
  height: 100%;
}

.notifications .notify .bell {
  width: 40px;
  height: 100%;
}

.notifications .notify .bell svg {
  width: 40px;
  height: 40px;
  position: relative;
  right: 10px;
  /*filter: drop-shadow(0 0 0.1rem #f6e58d);*/
}

.notifications .notify .context {
  height: 100%;
  width: calc(100% - 40px);
  padding: 1px 0 0 0;
}

.notifications .notify .context p {
  padding-right: 10px;
  color: #FFFFFF;

}

.notifications .notify .context p.name {
  font-weight: 400;
  font-size: .65rem;
  border-radius: 35px;
  padding: 2px 6px 3px 0;
  display: inline-block;
  color: #f1c40f;
}

.notifications .notify .context p.text {
  font-size: .65rem;
  text-align: left;
  max-width: 146px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notifications .notify .context p.time {
  font-size: .6rem;
  text-align: left;
}

.notifications .notify .context button.to-box {
  outline: 0;
  background-color: rgba(255, 255, 255, 0.35);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
  height: 20px;
  padding: 0 10px;
  border: 0;
  border-radius: 35px;
  font-size: .55rem;
  margin: auto 10px 5px auto;
}

.notifications .notify button.remove {
  outline: 0;
  border-radius: 5px;
  background-color: #3742fa;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  height: 20px;
  width: 20px;
  position: absolute;
  right: 5px;
  top: 5px;
  border: 0;
}

.notifications .notify button.remove svg {
  min-height: 16px;
  min-width: 16px;
  fill: #cdcdce;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: fixed;
}
</style>
