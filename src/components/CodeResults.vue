<script setup lang="ts">
import { type BlobSchema, type ProjectSchema } from '@gitbeaker/rest'

const props = defineProps<{
  results: { project: ProjectSchema; results: BlobSchema[] | null; error: any }[]
}>()

import { computed } from 'vue'
import CodeHolder from './CodeHolder.vue'

const results = computed(() =>
  props.results.reduce(
    (arr, curr) => {
      if (curr.results == null) {
        return arr
      }
      for (const element of curr.results) {
        arr = arr.concat({ result: element, project: curr.project })
      }
      return arr
    },
    [] as { project: ProjectSchema; result: BlobSchema }[]
  )
)
</script>

<template>
  <div
    v-for="result in results"
    :key="`line-${result.project.id}-${result.result.id}`"
    class="result-element"
  >
    <CodeHolder :result="result.result" :project="result.project" />
  </div>
</template>

<style scoped>
.result-element {
  margin: 10px;
}
</style>
