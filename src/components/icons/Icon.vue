<template>
  <component :style="styles" :is="iconTemplate"/>
</template>

<script lang="ts">
import {shallowRef, watch, reactive, defineComponent} from "vue"
export default defineComponent({
  name: "Icon",
  props:{
    color:{
      type:String,
      default: "#a4b0be"
    },
    width: {
      type:String,
      default: "20px"
    },
    height: {
      type:String,
      default: "auto"
    },
    icon: String,
    transform: {
      type: String,
      default: "scale(1.0)"
    }
  },
  setup(props) {
    const styles = reactive({
      fill: props.color,
      stroke: props.color,
      width: props.width,
      height: props.height,
      translate: props.transform,
    })
    const iconTemplate = shallowRef<object | null>(null)
    import("../../components/icons/" + props.icon + ".vue").then(val => {
      iconTemplate.value = val.default;
    })

    watch(() => props.color, (val) => {
      styles.fill = val
    })
    watch(() => props.width, (val) => {
      styles.width = val
    })
    watch(() => props.height, (val) => {
      styles.height = val
    })

    return { iconTemplate, styles }
  },
})
</script>
