import {defineStore} from 'pinia';
import {state} from '@/store/state';

export default defineStore({
  id: "main",
  state: state,
});
