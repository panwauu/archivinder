<script setup lang="ts">
import CodeResults from '@/components/CodeResults.vue'
import SearchForm from '@/components/SearchForm.vue'

import SettingsDialog from '@/components/SettingsDialog.vue'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const useSidebar = computed(() => useWindowSize().width.value > 800)
</script>

<template>
  <main class="p-component" :class="{ sidebar: useSidebar }">
    <div id="search">
      <SettingsDialog v-if="!useSidebar" />
      <SearchForm :sidebar="useSidebar" />
    </div>
    <div id="results">
      <CodeResults />
    </div>
  </main>
</template>

<style global>
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
main {
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  --sidebar: v-bind(useSidebar);
}
main:not(.sidebar) {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
main.sidebar {
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
}

.sidebar #search {
  background: var(--surface-b);
  border-right: 1px solid var(--surface-c);
  overflow-x: none;
  overflow-y: auto;
}

#results {
  width: 100%;
  height: 100%;
}
.sidebar #results {
  overflow: auto;
  padding: 0 10px;
}
</style>
