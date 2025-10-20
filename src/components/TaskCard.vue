<template>
  <div class="card mb-2 border-secondary">
    <div class="card-body p-2 d-flex justify-content-between align-items-center">
      <span>{{ task.title }}</span>
      <div>
        <select
          class="form-select form-select-sm d-inline w-auto me-2"
          :value="task.status"
          @change="store.updateStatus(task.id, $event.target.value)"
        >
          <option>pendente</option>
          <option>em andamento</option>
          <option>concluída</option>
        </select>
        <button class="btn btn-sm btn-danger" @click="store.deleteTask(task.id)">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../stores/useTaskStore'
const store = useTaskStore()
defineProps({ task: Object })
</script>
