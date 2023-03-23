<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, onUpdated } from 'vue'

type name = string | null

interface Message {
  name: string
  message: string
}
const router = useRouter()
const socket = ref<WebSocket>()
const messages = ref<Message[]>([])
const field = ref('')
const username = ref<name>('')

const sendMessage = (): void => {
  const message = {
    name: localStorage.getItem('username')!,
    message: field.value
  }
  socket.value?.send(JSON.stringify(message))
  field.value = ''
}
onUpdated(() => {
  if (localStorage.getItem('username')) {
    username.value = localStorage.getItem('username')
  } else {
    router.push('/login')
  }
})
onMounted(() => {
  socket.value = new WebSocket('ws://localhost:8000')

  socket.value.onopen = () => {
    console.log('connect')
  }

  socket.value.onmessage = (event) => {
    const response = JSON.parse(event.data)

    const obj: Message = {
      name: response.name,
      message: response.message
    }
    messages.value.push(obj)
  }
})
</script>

<template>
  <main>
    <div class="chat-wrapper">
      <div
        class="message"
        :class="{ message_my: item.name === username }"
        v-for="item in messages"
        :key="item.message + Date.now()"
      >
        <span class="message__name">{{ item.name }}</span>
        <div class="message__text">
          {{ item.message }}
        </div>
      </div>
    </div>
    <div class="text-field-wrapper">
      <input v-model="field" class="text-field" />
      <button @click="sendMessage()" class="send-button">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.0001 31.0653C28.1165 31.0653 31.4897 27.6922 31.4897 17.5757C31.4897 7.45928 28.1165 4.08615 18.0001 4.08615C7.88362 4.08615 4.5105 7.45928 4.5105 17.5757C4.5105 27.6922 7.88362 31.0653 18.0001 31.0653Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.8973 22.6386C15.8973 22.6386 20.9811 19.1503 20.9811 17.5753C20.9811 16.0003 15.8973 12.5149 15.8973 12.5149"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </main>
</template>

<style lang="scss">
.chat-wrapper {
  height: calc(100vh - 119px);
  overflow: auto;
  padding: 5px 16px;
}

.message {
  width: 80%;
  margin-bottom: 15px;

  &__text {
    border-radius: 16px;
    padding: 10px;
    color: #fff;
    background: #58aeed;
  }

  &__name {
    display: block;
    margin-bottom: 4px;
  }

  &_my {
    margin: 0 0 0 auto;
  }
}
.text-field-wrapper {
  background: #58aeed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 24px;
}

.text-field {
  width: calc(100% - 50px);
  border: #fff;
  outline: none;
  height: 30px;
}
.send-button {
  cursor: pointer;
  background: transparent;
  border: 0;
}
</style>
