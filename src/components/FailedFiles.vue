<script setup lang="ts">
const props = defineProps<{ results: { project: any; results: any; error: any }[] }>()

import { computed } from 'vue'
import Panel from 'primevue/panel'

const failedFiles = computed(() => props.results.filter((r) => r.error != null))
</script>

<template>
  <Panel :header="`Failed: ${failedFiles.length}`" toggleable collapsed>
    <div class="files">
      <small v-for="result in failedFiles" :key="`project-${result.project.id}`">{{
        result.project.name_with_namespace
      }}</small>
    </div>
  </Panel>
</template>

<style scoped>
.files {
  display: flex;
  flex-direction: column;
}
</style>
