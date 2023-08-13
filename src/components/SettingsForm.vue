<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { options } from '@/helpers/options'
</script>

<template>
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
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  margin: 5px 0;
}
</style>
