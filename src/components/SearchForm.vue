<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import SettingsForm from './SettingsForm.vue'

import { searchOptions, status, start, stop, resume, retryFailed } from '@/helpers/search'

defineProps<{ sidebar: boolean }>()
</script>

<template>
  <div style="max-width: 600px; width: 100%; margin: 0 auto">
    <div class="input-container">
      <div class="logo">
        <img src="@/assets/icon.png" />
        Archivinder
      </div>
      <Divider v-if="sidebar" />
      <label for="host">Search keyword</label>
      <InputText
        v-if="sidebar"
        id="host"
        v-model="searchOptions.searchKeyword"
        :disabled="status.status != 'idle'"
      />
      <div class="p-inputgroup input-container-inputgroup">
        <InputText
          v-if="!sidebar"
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
              !status.results.some((r) => r.error == null && r.results == null)) ||
            status.searchOptions != searchOptions
          "
        />
        <Button
          icon="pi pi-replay"
          severity="warning"
          @click="retryFailed"
          :disabled="
            !status.results.some((r) => r.error != null) || status.searchOptions != searchOptions
          "
        />
        <Button
          icon="pi pi-times"
          severity="danger"
          @click="stop"
          :disabled="status.status != 'running'"
        />
      </div>
    </div>

    <Divider v-if="sidebar" />

    <div class="inputs-container">
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

    <template v-if="sidebar">
      <Divider />
      <div class="inputs-container">
        <SettingsForm />
      </div>
    </template>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bolder;
}
.logo img {
  margin-right: 5px;
  height: 1.5rem;
}
.inputs-container {
  display: flex;
  width: 100%;
  padding: 5px;
}
.sidebar .inputs-container {
  flex-direction: column;
  padding: 5px;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin: 5px 0;
}
.sidebar .input-container-inputgroup {
  width: unset;
  margin: 0 auto;
}
</style>
