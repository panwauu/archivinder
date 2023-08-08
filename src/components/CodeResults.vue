<script setup lang="ts">
import ProjectResults from './ProjectResults.vue'
import { status } from '@/helpers/search'
</script>

<template>
  <div v-for="projectResult in status.results" :key="`project-${projectResult.project.id}`">
    <ProjectResults :projectResult="projectResult" class="project-results" />
  </div>
</template>

<style scoped>
.project-results {
  margin: 5px 0;
}
</style>
