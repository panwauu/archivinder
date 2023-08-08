<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import WaitingFiles from '@/components/WaitingFiles.vue'
import FailedFiles from '@/components/FailedFiles.vue'

import { searchOptions, status, start, stop } from '@/helpers/search'
</script>

<template>
  <div>
    <InputText type="text" v-model="searchOptions.searchKeyword" />
    <Button label="Search" @click="start" />
    <Button label="Clear" @click="stop" />
  </div>
  <WaitingFiles :results="status.results" />
  <FailedFiles :results="status.results" />
</template>
