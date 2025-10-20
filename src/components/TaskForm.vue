<template>
  <form @submit.prevent="addNewTask" class="d-flex gap-2">
    <input v-model="title" type="text" class="form-control" placeholder="Nova tarefa..." required />
    <button class="btn btn-success">Adicionar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/useTaskStore'

const store = useTaskStore()
const title = ref('')

async function addNewTask() {
  await store.addTask(title.value)
  title.value = ''
}
</script>
