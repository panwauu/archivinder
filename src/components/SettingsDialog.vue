<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { ref } from 'vue'
import SettingsForm from './SettingsForm.vue'

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
    <SettingsForm />
  </Dialog>
</template>

<style scoped>
.settings-button {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
