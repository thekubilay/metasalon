<template>
  <form class="form" @submit.prevent @submit="sendSignIn($event)">

    <InputText v-model="userFormData"
               type="text"
               name="email"
               label="メールアドレス"
               placeholder="メールアドレスを入力してください"/>

    <InputText v-model="userFormData"
               :type="dynamicInputType"
               name="password"
               label="パスワード"
               placeholder="パスワードを入力してください"
               :iconClass="dynamicIconClass"
               @showPassword="showPassword"/>

    <InputCharacter v-model="userFormData"
                    :characters="characters"/>

    <div v-if="errors && errors.length>0" class="row errors">
      <span v-for="(error, idx) in errors" :key="idx" class="">{{ error }}</span>
    </div>

    <div class="row button-container">
      <button type='submit' class="button-submit">ログインする</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import InputText from '@/components/inputs/InputText.vue'
import InputCharacter from "@/components/inputs/InputCharacter.vue";
import RequestService from '@/services/RequestService';

import {ref, reactive} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {FormData} from '@/types/Form';
import useStore from "@/store/useStore";

const {user} = useStore()
const route = useRoute()
const router = useRouter()
const characters = ["characters/man2.glb", "characters/man3.glb", "characters/woman2.glb", "characters/woman3.glb", "characters/bear.glb", "characters/fox.glb", "characters/raccon.glb"]
const errors = ref<[string, string[]][]>();
const userFormData = reactive<FormData>({
  email: {
    required: true,
    error: null,
    value: ""
  },
  password: {
    required: true,
    error: null,
    value: "",
  },
  character: {
    required: true,
    error: null,
    value: "characters/soldier.glb",
  }
})

const service = new RequestService();
const sendSignIn = (event: any) => {
  errors.value = []
  userFormData.email.error = null
  userFormData.password.error = null
  userFormData.character.error = null
  const data = {email: userFormData.email.value, password: userFormData.password.value}
  service.signIn(data).then((response: any) => {
        if (response.data.hasOwnProperty("key")) {
          user.value = response.data
          sessionStorage.setItem('nzrsto', JSON.stringify({
            key: response.data.key,
            charNickname: response.data.user.username || 'NULL',
            charFilePath: userFormData.character.value,
            roomUrlPath: "entry",
          }))

          if (route.query.hasOwnProperty("office")) {
            router.push({name: "Office", params: {id: route.query.office as string}})
          } else {
            router.push({name: "Onlines"})
            // router.push({name: "Entry"})
          }
        }
      },
      (error) => {
        Object.keys(error.response.data).forEach(errorKey => {
          let flag = false
          Object.keys(userFormData).forEach(formKey => {
            if (errorKey === formKey) {
              flag = true
              userFormData[formKey].error = error.response.data[errorKey]
            }
          })

          //other error
          if (!flag) {
            flag = true
            errors.value?.push(error.response.data[errorKey])
          }
        })
      })
}

const dynamicInputType = ref<"text" | "password">("password")
const dynamicIconClass = ref<string>("fas fa-eye-slash")
const showPassword = () => {
  if (dynamicInputType.value === "password") {
    dynamicInputType.value = "text"
    dynamicIconClass.value = "fas fa-eye";
  } else {
    dynamicInputType.value = "password";
    dynamicIconClass.value = "fas fa-eye-slash";
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
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 0.65rem;
}

.form .button-submit {
  color: #fff;
  width: 100%;
  padding: 15px 0;
  margin-top: 30px;
  background-color: #1c32e2;
}
</style>
