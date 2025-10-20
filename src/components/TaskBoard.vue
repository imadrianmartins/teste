<template>
  <div v-if="store.selectedProject">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>{{ store.selectedProject.name }}</h4>
      <TaskForm />
    </div>

    <div class="row">
      <!-- <TaskColumn title="Pendente" :tasks="pendingTasks" />
      <TaskColumn title="Em Andamento" :tasks="inProgressTasks" />
      <TaskColumn title="Concluído" :tasks="completedTasks" /> -->
      <TaskColumn title="Pendente" :tasks="pendingTasks" @change-status="updateTaskStatus" />
      <TaskColumn title="Em Andamento" :tasks="inProgressTasks" @change-status="updateTaskStatus" />
      <TaskColumn title="Concluído" :tasks="completedTasks" @change-status="updateTaskStatus" />
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../stores/useTaskStore'
import TaskColumn from './TaskColumn.vue'
import TaskForm from './TaskForm.vue'
import { computed, watchEffect } from 'vue'

const store = useTaskStore()
window.store = store

const projectTasks = computed(() =>
  store.tasks.filter(task => task.project_id === store.selectedProjectId)
)

async function updateTaskStatus({ taskId, newStatus }) {
  console.log('updateTaskStatus chamado com:', taskId, newStatus)
  await store.updateStatus(taskId, newStatus)
}

// ✅ Computeds reativos separados
const pendingTasks = computed(() => {
  console.log('--- pendingTasks computed ---')
  console.log('selectedProjectId:', store.selectedProjectId)
  console.log('tasks atuais:', store.tasks)

  const filtered = store.tasks.filter(task => {
    const isProjectMatch = task.project_id === store.selectedProjectId
    const isStatusMatch = task.status === 'pendente'
    console.log(`task id: ${task.id} | project_id: ${task.project_id} (match? ${isProjectMatch}) | status: ${task.status} (match? ${isStatusMatch})`)
    return isProjectMatch && isStatusMatch
  })
  
  console.log('filtered tasks:', filtered)
  return filtered
})

const inProgressTasks = computed(() => {
  console.log('selectedProjectId:', store.selectedProjectId)
  const filtered = store.tasks.filter(task => {
    const match = task.project_id === store.selectedProjectId && task.status === 'em andamento'
    if (match) console.log('Task em andamento:', task)
    return match
  })
  return filtered
})

const completedTasks = computed(() => {
  console.log('selectedProjectId:', store.selectedProjectId)
  const filtered = store.tasks.filter(task => {
    const match = task.project_id === store.selectedProjectId && task.status === 'concluída'
    if (match) console.log('Task concluída:', task)
    return match
  })
  return filtered
})
</script>
