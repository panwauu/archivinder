<script setup lang="ts">
import Button from 'primevue/button'

import { status } from '@/helpers/search'

function exportResultsToMDList() {
  let text = ''

  text += '# With result\n'
  status.value.results
    .filter((r) => r.error == null && r.results != null && r.results.length > 0)
    .forEach((r) => {
      text += `- [${r.project.name_with_namespace}](${r.project.web_url})\n`
    })
  text += '# Without result\n'
  status.value.results
    .filter((r) => r.error == null && r.results != null && r.results.length === 0)
    .forEach((r) => {
      text += `- [${r.project.name_with_namespace}](${r.project.web_url})\n`
    })
  text += '# With error\n'
  status.value.results
    .filter((r) => r.error != null)
    .forEach((r) => {
      text += `- [${r.project.name_with_namespace}](${r.project.web_url})\n`
    })
  text += '# Waiting\n'
  status.value.results
    .filter((r) => r.error == null && r.results == null)
    .forEach((r) => {
      text += `- [${r.project.name_with_namespace}](${r.project.web_url})\n`
    })

  status.value.results

  navigator.clipboard.writeText(text)

  // Alert the copied text
  alert(`Copied the text: \n${text}`)
}
</script>

<template>
  <Button
    v-if="status.results.length > 0"
    icon="pi pi-cloud-download"
    severity="secondary"
    rounded
    outlined
    aria-label="Download"
    :disabled="status.status != 'idle'"
    @click="exportResultsToMDList"
  />
</template>

<style scoped></style>
