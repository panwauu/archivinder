<script setup lang="ts">
import CodeResults from '@/components/CodeResults.vue'
import SearchForm from '@/components/SearchForm.vue'
import Divider from 'primevue/divider'

import SettingsDialog from '@/components/SettingsDialog.vue'
</script>

<template>
  <main
    class="p-component"
    style="
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    "
  >
    <SettingsDialog />
    <SearchForm />
    <Divider />
    <CodeResults />
  </main>
</template>
