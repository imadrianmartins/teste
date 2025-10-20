<template>
  <div class="col-md-4">
    <div class="card shadow-sm mb-3">
      <div class="card-header bg-primary text-white">
        {{ title }}
      </div>
      <div 
      class="card-body"
      @dragover.prevent
      @drop="onDrop"
      style="min-height: 100px;"
      >
        <div v-if="tasks.length === 0" class="text-muted small">Nenhuma tarefa.</div>
        <TaskCard 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task"
        draggable="true"
        @dragstart="onDragStart(task)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

const props = defineProps({
  title: String,
  tasks: Array,
})

const emit = defineEmits(['change-status'])

let draggedTask = null

function onDragStart(task) {
  draggedTask = task
}

function onDrop() {
  if (!draggedTask) return
  // Envia evento para o pai, com id da task e o novo status (que é o título da coluna, em minúsculo)
  emit('change-status', {
    taskId: draggedTask.id,
    newStatus: props.title.toLowerCase(),
  })
  draggedTask = null}
</script>
