<template>
  <div>
    <h5 class="mb-3">Projetos</h5>

    <ul v-if="!store.loading" class="list-group">
      <li
        v-for="project in store.projects"
        :key="project.id"
        class="list-group-item list-group-item-action"
        :class="{ active: project.id === store.selectedProjectId }"
        @click="store.selectProject(project.id)"
      >
        {{ project.name }}
      </li>
    </ul>

    <div v-else>Carregando projetos...</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from '../stores/useTaskStore'
const store = useTaskStore()

onMounted(() => store.fetchProjects())
</script>
