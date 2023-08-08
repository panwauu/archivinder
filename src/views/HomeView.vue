<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref } from 'vue'

import CodeResults from '@/components/CodeResults.vue'
import WaitingFiles from '@/components/WaitingFiles.vue'
import FailedFiles from '@/components/FailedFiles.vue'

import { Gitlab, type BlobSchema, type ProjectSchema } from '@gitbeaker/rest'

const api = new Gitlab({
  host: '',
  token: ''
})

const searchString = ref('')
let results = ref([
  {
    project: {
      id: 6,
      description: 'Nobis sed ipsam vero quod cupiditate veritatis hic.',
      name: 'Flight',
      name_with_namespace: 'Twitter / Flight',
      path: 'flight',
      path_with_namespace: 'twitter/flight',
      created_at: '2017-09-05T07:58:01.621Z',
      default_branch: 'master',
      tag_list: [], //deprecated, use `topics` instead
      topics: [],
      ssh_url_to_repo: 'ssh://jarka@localhost:2222/twitter/flight.git',
      http_url_to_repo: 'http://localhost:3000/twitter/flight.git',
      web_url: 'http://localhost:3000/twitter/flight',
      readme_url: 'http://localhost:3000/twitter/flight/-/blob/master/README.md',
      avatar_url: null,
      star_count: 0,
      forks_count: 0,
      last_activity_at: '2018-01-31T09:56:30.902Z'
    } as unknown as ProjectSchema,
    results: [
      {
        basename: 'README',
        data: '```\n\n## Installation\n\n\tQuick start using the [pre-builtQu',
        path: 'README.md',
        filename: 'README.md',
        id: null,
        ref: 'master',
        startline: 46,
        project_id: 6
      }
    ] as unknown as BlobSchema[],
    error: null
  }
] as Array<{ project: ProjectSchema; results: BlobSchema[] | null; error: unknown | null }>)

async function search() {
  clear()

  const groups = await api.Groups.all()
  console.log(groups)

  let projects: Awaited<ReturnType<typeof api.Groups.allProjects>> = []
  for (const group of groups) {
    const projectsInGroup = await api.Groups.allProjects(group.id, { includeSubgroups: false })
    projects = projects.concat(projectsInGroup)
  }
  console.log(projects)

  for (const project of projects) {
    results.value.push({ project: project, results: null, error: null })
  }

  for (const entry of [results.value[0]]) {
    try {
      const searchResult = await api.Search.all('blobs', searchString.value, {
        projectId: entry.project.id,
        perPage: 100
      })
      console.log(searchResult)
      entry.results = searchResult
    } catch (e) {
      console.log(e)
      entry.error = e
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  console.log(results.value)
}

function clear() {
  results.value = []
}
</script>

<template>
  <main>
    <div>
      <InputText type="text" v-model="searchString" />
      <Button label="Search" @click="search" />
      <Button label="Clear" @click="clear" />
    </div>
    <WaitingFiles :results="results" />
    <FailedFiles :results="results" />
    <CodeResults :results="results" />
  </main>
</template>
