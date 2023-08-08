<script setup lang="ts">
import { type BlobSchema, type ProjectSchema } from '@gitbeaker/rest'
import Panel from 'primevue/panel'

const props = defineProps<{
  result: BlobSchema
  project: ProjectSchema
}>()
</script>

<template>
  <Panel
    :header="result.path"
    :pt="{
      header: { class: 'panel-code-header' },
      content: { class: 'panel-code-content' }
    }"
    toggleable
  >
    <div class="code-block">
      <div class="code-line-number code-block-padding"></div>
      <div></div>
      <template v-for="(line, index) in result.data.split('\n')" :key="`line-${index}`">
        <a
          class="code-line-number"
          :href="`${props.project.web_url}/-/blob/main/${result.path}#L${result.startline + index}`"
          target="_blank"
        >
          <code>
            <small>{{ result.startline + index }}</small>
          </code>
        </a>
        <pre class="code-content"><code>{{ line }}</code></pre>
      </template>
      <div class="code-line-number code-block-padding"></div>
      <div></div>
    </div>
  </Panel>
</template>

<style global>
.panel-code-content {
  padding: 0 !important;
}
.panel-code-header {
  padding: 0.3rem 1rem !important;
}
</style>

<style scoped>
code {
  color: var(--text-color-secondary);
  font-family: var(--default-mono-font, 'GitLab Mono'), 'JetBrains Mono', 'Menlo',
    'DejaVu Sans Mono', 'Liberation Mono', 'Consolas', 'Ubuntu Mono', 'Courier New', 'andale mono',
    'lucida console', monospace;
}
.code-block {
  display: grid;
  grid-template-columns: 4rem 1fr;
  overflow: auto;
}
.code-block-padding {
  height: 10px;
}
.code-line-number {
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 5px;
  background: var(--surface-b);
  cursor: pointer;
  font-weight: bold;
  border-right: 2px solid var(--surface-d);
  text-decoration-color: var(--text-color-secondary);
}
.code-line-number:hover {
  text-decoration: underline;
}
.line-number-outer {
  height: 10px;
}
.code-content {
  tab-size: 4;
  padding: 0 10px;
  margin: 0;
}
.code-with-keyword {
  background: var(--yellow-100) !important;
}
a {
  text-decoration: none;
  color: unset;
}
</style>
