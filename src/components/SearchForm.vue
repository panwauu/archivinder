<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { searchOptions, status, start, stop, resume, retryFailed } from '@/helpers/search'
</script>

<template>
  <div style="max-width: 600px; width: 100%; margin: 0 auto">
    <div class="input-container">
      <label for="host">Search keyword</label>
      <div class="p-inputgroup">
        <InputText
          id="host"
          v-model="searchOptions.searchKeyword"
          :disabled="status.status != 'idle'"
        />
        <span class="p-inputgroup-addon" v-if="status.status != 'idle'">
          <i class="pi pi-spin pi-cog" style="font-size: 1rem"></i>
        </span>
        <Button
          icon="pi pi-step-forward"
          severity="success"
          @click="start"
          :disabled="status.status != 'idle'"
        />
        <Button
          icon="pi pi-play"
          severity="success"
          @click="resume"
          :disabled="
            status.status === 'running' ||
            (status.status === 'idle' &&
              !status.results.some((r) => r.error == null && r.results == null))
          "
        />
        <Button
          icon="pi pi-replay"
          severity="warning"
          @click="retryFailed"
          :disabled="!status.results.some((r) => r.error != null)"
        />
        <Button
          icon="pi pi-times"
          severity="danger"
          @click="stop"
          :disabled="status.status != 'running'"
        />
      </div>
    </div>

    <div class="filter-container">
      <div class="input-container">
        <label for="host">Group filter</label>
        <InputText
          id="host"
          v-model="searchOptions.groupKeyword"
          style="width: 100%"
          placeholder="*"
          :disabled="status.status != 'idle'"
        />
      </div>

      <div class="input-container">
        <label for="host">Project filter</label>
        <InputText
          id="host"
          v-model="searchOptions.projectKeyword"
          style="width: 100%"
          placeholder="*"
          :disabled="status.status != 'idle'"
        />
      </div>

      <div class="input-container">
        <label for="host">File filter</label>
        <InputText
          id="host"
          v-model="searchOptions.fileKeyword"
          style="width: 100%"
          placeholder="*"
          :disabled="status.status != 'idle'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  width: 100%;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin: 5px;
}
</style>
