<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const name = ref<string>('')
const saveName = (): void => {
  localStorage.setItem('username', name.value)
  router.push('/')
}
onMounted(() => {
  if (localStorage.getItem('username')) {
    router.push('/')
  }
})
</script>

<template>
  <main class="login">
    <input v-model="name" type="text" placeholder="Введіть Імʼя" />
    <button @click="saveName" :disabled="!name">Go</button>
  </main>
</template>

<style lang="scss">
.login {
  max-width: 768px;
  height: 100vh;
  padding: 24px;
  background: #58aeed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    border: 0;
    outline: none;
    padding: 10px;
    margin-bottom: 5px;
  }

  button {
    padding: 7px;
    width: 159px;
    font-size: 18px;
    background: #fff;
    border: 0;
    text-transform: uppercase;
  }
}
</style>
