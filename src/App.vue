<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-3 bg-light border-end p-3">
        <ProjectList />
      </div>
      <div class="col-9 p-3">
        <TaskBoard />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProjectList from './components/ProjectList.vue'
import TaskBoard from './components/TaskBoard.vue'
</script>
