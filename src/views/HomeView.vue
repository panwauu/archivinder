<script setup lang="ts">
import CodeResults from '@/components/CodeResults.vue'
import SearchForm from '@/components/SearchForm.vue'

import { status } from '@/helpers/search'
import SettingsDialog from '@/components/SettingsDialog.vue'
</script>

<template>
  <main>
    <SettingsDialog />
    <SearchForm />
    <CodeResults :results="status.results" />
  </main>
</template>
