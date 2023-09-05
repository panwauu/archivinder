<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Password from 'primevue/password'
import { options } from '@/helpers/options'
</script>

<template>
  <div class="input-container">
    <label for="host">Host for Giltab instance</label>
    <InputText id="host" v-model="options.host" />
  </div>

  <div class="input-container">
    <label for="token">PAT for Gitlab</label>
    <Password id="token" v-model="options.token" :feedback="false" toggleMask />
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

<style global>
#token input {
  width: 100%;
}
</style>
