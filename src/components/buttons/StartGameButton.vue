<template>
  <button class="start-btn">
    <span class="play-icon"></span>
    ブランズメタサロンに入る
  </button>
</template>

<style scoped>
button.start-btn {
  /* margin-top: 30px; */
  margin-top: 42px;
  /* background-color: #ffffff;
  color: #1C32E2; */
  /* box-shadow: 0 0 10px #fff; */

  background-color: #1C32E2;
  color: white;
  /* box-shadow: 0 0 13px 5px #fff; */
  width: 300px;
  padding-bottom: 1px;
  height: 60px;
  transition: transform 0.2s;
}

button.start-btn:active {
  transform: translateY(-2px);
}

button.start-btn span.play-icon {
  display: inline-block;
  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  /* background-color: #000; */
  background-color: white;
  top: 5px;
  right: 7px;
}

button.start-btn span.play-icon::after {
  content: "";
  position: absolute;
  top: 7px;
  left: 8px;
  /* border-left: solid 5px #fff; */
  border-left: solid 5px #000;
  border-top: solid 3px transparent;
  border-bottom: solid 3px transparent;
}
</style>