<template>
  <div class="onlines">
    <table v-if="display">
      <caption>メタサロン オンライン一覧</caption>
      <thead>
      <tr>
        <th scope="col">ニックネーム</th>
        <th scope="col">場所</th>
        <th scope="col">営業マンとより取り中</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="player in players" :key="player.socketID">
        <td data-label="ニックネーム">{{ player.charNickname }}</td>
        <td @click="teleportToRoom(player.room)" data-label="ルーム" class="link"> {{ getRoomName(player.room) }}</td>
        <td data-label="営業マンとより取り中">
          <i v-if="player.withStaff" style="color: #0bab64" class="fa-solid fa-user-check"></i>
          <i v-else style="color: red" class="fa-solid fa-xmark"></i>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import {SOCKET} from "@/plugins/socket";
import {onBeforeMount, onMounted, ref} from "vue";
import CharacterInfo, {Player} from "@/types/Player";
import useStore from "@/store/useStore";
import {getCookie} from "@/utils/useCookie";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const {myself} = useStore()
const players = ref<Player[]>([])
const storage = JSON.parse(sessionStorage.getItem("nzrsto") as string) as CharacterInfo
const sessionId = getCookie("sessionId")
const display = ref<boolean>(false)

const teleportToRoom = (room:string): void => {
  if (room === "entry"){
    router.push({name: "Entry"})
  } else {
    router.push({name: "Office", params: {id: room as string}})
  }
}

function getRoomName(name: string): string {
  const project = name.split("$")[1]
  if (project) {
    if (project === "527218328") {
      return "天王寺勝山"
    }
    if (project === "902154407") {
      return "北千里"
    }
    if (project === "303512941") {
      return "大阪松屋町"
    }
    if (project === "430972345") {
      return "タワー谷町四丁目"
    }
    if (project === "371140418") {
      return "大阪福島"
    }
  } else {
    if (name === "entry")
    return "エントリー世界"
  }

  return name
}


onBeforeMount(() => {
  const storage = JSON.parse(sessionStorage.getItem("nzrsto") as string) as CharacterInfo
  if (storage && storage.key){
    return;
  } else {
    router.push({name:"SignIn"})
  }
})

onMounted(() => {
  const storage = JSON.parse(sessionStorage.getItem("nzrsto") as string) as CharacterInfo
  if (storage && storage.key){
    display.value = true
    SOCKET.connect()
    SOCKET.on("updatePositions", (data: Player[]) => {
      console.log(data[0].withStaff)
      players.value = data.filter(player => {
        return !player.key
      })
    })
  }
})
</script>

<style scoped>
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

table td.link {
  text-decoration: underline;
  color: #007aff;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>