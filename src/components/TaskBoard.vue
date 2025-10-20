<template>
  <div v-if="store.selectedProject">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>{{ store.selectedProject.name }}</h4>
      <TaskForm />
    </div>

    <div class="row">
      <TaskColumn title="Pendente" :tasks="tasksByStatus('pendente')" />
      <TaskColumn title="Em Andamento" :tasks="tasksByStatus('em andamento')" />
      <TaskColumn title="Concluído" :tasks="tasksByStatus('concluída')" />
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../stores/useTaskStore'
import TaskColumn from './TaskColumn.vue'
import TaskForm from './TaskForm.vue'
import { watchEffect } from 'vue'

const store = useTaskStore()
const tasksByStatus = (status) => store.projectTasks.filter((t) => t.status === status)

watchEffect(() => {
  console.log('Projeto selecionado:', store.selectedProjectId)
  console.log('Tarefas carregadas:', store.tasks)
})
</script>
