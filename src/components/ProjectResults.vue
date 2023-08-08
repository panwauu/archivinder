<script setup lang="ts">
import { status } from '@/helpers/search'
import Panel from 'primevue/panel'

defineProps<{ projectResult: (typeof status.value.results)[0] }>()
import CodeHolder from './CodeHolder.vue'
</script>

<template>
  <Panel
    :toggleable="
      projectResult.error != null ||
      (projectResult.results != null && projectResult.results.length > 0)
    "
    :pt="{
      header: { style: 'padding: 0.5rem 1rem;' }
    }"
    :collapsed="true"
  >
    <template #header>
      <div>
        <i
          v-if="
            projectResult.results == null && projectResult.error == null && status.status != 'idle'
          "
          class="pi pi-spin pi-spinner"
          style="font-size: 1rem; margin-right: 10px"
        ></i>
        <i
          v-if="
            projectResult.results == null && projectResult.error == null && status.status === 'idle'
          "
          class="pi pi-spinner"
          style="font-size: 1rem; margin-right: 10px"
        ></i>
        <i
          v-if="projectResult.results != null && projectResult.results.length > 0"
          class="pi pi-check"
          style="font-size: 1rem; margin-right: 10px; color: var(--green-500)"
        ></i>
        <i
          v-if="projectResult.results?.length === 0"
          class="pi pi-stop"
          style="font-size: 1rem; margin-right: 10px; color: var(--green-500)"
        ></i>
        <i
          v-if="projectResult.error != null"
          class="pi pi-times"
          style="font-size: 1rem; margin-right: 10px; color: var(--red-500)"
        ></i>
        <span class="p-panel-title"> {{ projectResult.project.name_with_namespace }}</span>
      </div>
    </template>
    <div v-if="projectResult.error != null">{{ projectResult.error }}</div>
    <div v-for="searchResult in projectResult.results" :key="`result-${searchResult.id}`">
      <CodeHolder :result="searchResult" :project="projectResult.project" />
    </div>
  </Panel>
</template>

<style scoped></style>
