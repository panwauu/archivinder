<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { ref } from 'vue'
import { options } from '@/helpers/options'

const visible = ref(false)
</script>

<template>
  <!-- todo: blinking if not fully configured -->
  <Button
    icon="pi pi-cog"
    severity="secondary"
    rounded
    outlined
    @click="visible = true"
    class="settings-button"
  />

  <Dialog
    v-model:visible="visible"
    modal
    header="Settings"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <div class="input-container">
      <label for="host">Host for Giltab instance</label>
      <InputText id="host" v-model="options.host" />
    </div>

    <div class="input-container">
      <label for="token">PAT for Gitlab</label>
      <InputText id="token" v-model="options.token" />
    </div>

    <div class="input-container">
      <label for="timeout">Timeout between requests</label>
      <InputNumber id="timeout" v-model="options.timeout" />
    </div>
  </Dialog>
</template>

<style scoped>
.settings-button {
  position: absolute;
  right: 5px;
  top: 5px;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
}
</style>
