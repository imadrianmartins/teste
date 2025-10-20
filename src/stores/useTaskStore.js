import { defineStore } from 'pinia'
import { api } from '../api'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    projects: [],
    tasks: [],
    selectedProjectId: null,
    loading: false,
  }),

  getters: {
    selectedProject(state) {
      return state.projects.find(p => p.id === state.selectedProjectId)
    },
    projectTasks(state) {
      return state.tasks.filter(t => t.project_id === state.selectedProjectId)
    },
  },

  actions: {
    async fetchProjects() {
      this.loading = true
      const { data } = await api.get('/projects')
      this.projects = data
      this.loading = false
      if (!this.selectedProjectId && data.length > 0)
        this.selectedProjectId = data[0].id
      await this.fetchTasks(this.selectedProjectId)
    },

    async selectProject(id) {
      this.selectedProjectId = id
      await this.fetchTasks(id)
    },

    async fetchTasks(projectId) {
      const { data } = await api.get(`/projects/${projectId}/tasks`)
      this.tasks = data
    },

    async addTask(title) {
      const { data } = await api.post('/tasks', {
        title,
        project_id: this.selectedProjectId,
      })
      this.tasks.push(data)
    },

    async updateStatus(taskId, newStatus) {
      console.log(newStatus)
      await api.put(`/tasks/${taskId}`, { status: newStatus })
      const task = this.tasks.find(t => t.id === taskId)
      if (task) task.status = newStatus
    },

    async deleteTask(taskId) {
      await api.delete(`/tasks/${taskId}`)
      this.tasks = this.tasks.filter(t => t.id !== taskId)
    },
  },
})
