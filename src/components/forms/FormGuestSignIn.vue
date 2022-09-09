<template>
  <form class="form" @submit.prevent @submit="sendSignIn($event)">
    <!-- name -->
    <InputText v-model="guestFormData"
                type="text"
                name="name"
                label="ニックネーム"
                placeholder="shiva"/>
    <!-- character -->
    <InputCharacter v-model="guestFormData"
                    :characters="characters"/>
    <!-- other error -->
    <div v-if="errors && errors.length>0" class="row errors">
      <span v-for="(error, idx) in errors" :key="idx" class="">{{ error }}</span>
    </div>
    <!-- button-submit -->
    <div class="row button-container">
      <button type='submit' class="button-submit">ログインする</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue'
import {useRouter} from "vue-router";
import InputText from "@/components/inputs/InputText.vue";
import InputCharacter from "@/components/inputs/InputCharacter.vue";

const characters = ["models/soldier.glb", "models/robot.glb", "models/female.glb", "chara02", "chara03", "chara04", "chara05", "chara06", "chara07", "chara08"]

/*
*to display error
*/
const router = useRouter()
const errors = ref<[string, string[]][]>();
const guestFormData = reactive<any>({
  name: {
    required: true,
    error: null,
    value: ""
  },
  character: {
    required: true,
    error: null,
    value: "models/female.glb",
  }
})

/*
*to request to api
*/
const sendSignIn = (event: any) => {
  if (guestFormData.name.value.length && guestFormData.character.value.length) {
    sessionStorage.setItem('nzrsto', JSON.stringify({
      charNickname: guestFormData.name.value,
      charFilePath: guestFormData.character.value,
      roomUrlPath: "entry",
    }))

    router.push({name: "Entry"})

    errors.value = []

  } else {
    if (!guestFormData.name.value.length) {
      guestFormData.name.error = "ご入力ください"
    } else if (!guestFormData.character.value.length) {
      guestFormData.character.error = "ご選択ください"
    }
  }


}

</script>

<style scoped>
.form {
  width: 100%;
  max-width: 450px;
}

.form .errors {
  color: red;
  font-size: 0.7rem;
}

.form .button-submit {
  color: #fff;
  width: 100%;
  padding: 15px 0;
  margin-top: 20px;
  background-color: #1c32e2;
}
</style>
