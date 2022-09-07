import storage from '@/store'
import {storeToRefs} from 'pinia'
import {computed} from "vue";
export default function () {
  const store = storage()
  const isStaff = computed(() => {
    return store.user.user.role !== "user"
  })
  return {
    ...storeToRefs(store),
    isStaff,
  }
}
