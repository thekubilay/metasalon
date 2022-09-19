<template>
  <div class="form-wrapper flex-column align-center justify-center overflow-y-hidden">
    <h2 class="h2">メタバースへようこそ</h2>
    <p class="lead">
      すでにアカウントをお持ちの方はユーザーログインして下さい。
      <br>
      アカウントを作成せずにゲストとして参加する事もできます。
    </p>
    <!-- select user -->
    <div class="user-container">
      <ul class="users flex justify-center">
        <li id="guest" class="user" :class="{active:currentUser==='guest'}" @click="changeUser('guest')">
          ゲストとして入場する
        </li>
        <li id="user" class="user noselect" :class="{active:currentUser==='user'}" @click="changeUser('user')">
          ユーザーログイン
        </li>
      </ul>
    </div>

    <!-- form -->
    <div class="form-container flex justify-center">
      <FormGuestSignIn v-if="currentUser==='guest'"/>
      <FormUserSignIn v-else-if="currentUser==='user'"/>
    </div>

    <!-- sns menu -->
<!--    <div class="sns-container">-->
<!--      <p class="lead">またはSNSアカウントでログイン <span class="belt"></span></p>-->
<!--      <ul class="providers flex-column justify-center">-->
<!--        <li class="provider-item flex align-center justify-center">-->
<!--          <img src="/images/sns/google.png" alt="google"><span class="text">Googleアカウント</span>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import FormGuestSignIn from '@/components/forms/FormGuestSignIn.vue';
import FormUserSignIn from '@/components/forms/FormUserSignIn.vue';

const currentUser = ref<string>("guest")
const changeUser = (user: string) => {
  currentUser.value = user
}
</script>

<style scoped>
.form-wrapper {
  width: 60vw;
  height: 100%;
  /* padding: 1%; */
  overflow-y: auto;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6489189425770308) 0%, rgba(247, 241, 227, 0.48365283613445376) 83%);
}

.form-wrapper .h2 {
  width: 450px;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.form-wrapper .lead {
  width: 450px;
  color: #afafaf;
  font-size: 0.9rem;
  margin: 0px auto 40px;
}

.form-wrapper .user-container {
  position: relative;
  width: 100%;
  max-width: 450px;
  padding: 0;
  margin: 0 0 10px;
}

.form-wrapper .user-container .users {
  width: 100%;
  padding: 0;
  margin: 0;
}

.form-wrapper .user-container .users .user {
  color: #808080;
  font-size: 0.9rem;
  text-align: center;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
}

.form-wrapper .user-container .users .user.active {
  color: #1C32E2;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 10px 10px;
}

.form-wrapper .form-container {
  position: relative;
  width: 100%;
  max-width: 450px;
}

.form-wrapper .sns-container {
  width: 100%;
  max-width: 450px;
}

.form-wrapper .sns-container .lead {
  position: relative;
  text-align: center;
  margin: 20px 0 10px;
  font-size: .7rem;
}

.form-wrapper .sns-container .lead::after {
  position: absolute;
  z-index: 2;
  content: "";
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #dfe4ea;
}

/*.form-wrapper .sns-container .lead span.belt {*/
/*  position: absolute;*/
/*  content: "";*/
/*  z-index: 2;*/
/*  top: 50%;*/
/*  left: 50%;*/
/*  transform: translate(-50%, -50%);*/
/*  width: 200px;*/
/*  height: 10px;*/
/*  background-color: #FFFFFF;*/
/*}*/

.form-wrapper .sns-container .providers {
  width: 100%;
  margin: 0;
  padding: 0;
}

.form-wrapper .sns-container .providers .provider-item {
  width: 100%;
  height: 44px;
  border: 1px solid #cacaca;
  cursor: pointer;
}

.form-wrapper .sns-container .providers .provider-item .text {
  font-size: .8rem;
  color: #afafaf;
  padding-left: 1rem;
}

.form-wrapper .sns-container img {
  width: 100%;
  max-width: 16px;
  height: auto;
}

</style>
