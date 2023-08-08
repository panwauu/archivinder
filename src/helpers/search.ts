import { useLocalStorage } from '@vueuse/core'
import { Gitlab, type BlobSchema, type ProjectSchema } from '@gitbeaker/rest'
import { options } from '@/helpers/options'
import { ref, type PropType } from 'vue'

export type SearchOptions = {
  searchKeyword: string
  groupKeyword: string
  projectKeyword: string
  fileKeyword: string
}

export const searchOptions = useLocalStorage<SearchOptions>(
  'search-options',
  {
    searchKeyword: '',
    groupKeyword: '',
    projectKeyword: '',
    fileKeyword: ''
  },
  { mergeDefaults: true }
)

type StatusType = {
  status: 'idle' | 'running' | 'stopping'
  searchOptions: SearchOptions
  results: Array<{ project: ProjectSchema; results: BlobSchema[] | null; error: unknown | null }>
}
export const status = ref<StatusType>({
  status: 'idle',
  searchOptions: searchOptions.value,
  results: []
})

export function start() {
  if (status.value.status === 'running') return

  status.value.searchOptions = searchOptions.value
  status.value.results = []
  search()
}

export function stop() {
  if (status.value.status === 'stopping' || status.value.status === 'idle') return
  status.value.status = 'stopping'
}

export function resume() {
  if (status.value.status === 'running') return

  if (status.value.status === 'stopping') {
    status.value.status = 'running'
  } else if (status.value.status === 'idle') {
    search()
  }
}

export function retryFailed() {
  status.value.results.map((e) => {
    if (e.error != null) {
      e.error = null
    }
    return e
  })

  if (status.value.status === 'running') return

  if (status.value.status === 'stopping') {
    status.value.status = 'running'
  } else if (status.value.status === 'idle') {
    search()
  }
}

async function search() {
  if (
    options.value.host == null ||
    options.value.host === '' ||
    options.value.token == null ||
    options.value.token === ''
  )
    return

  status.value.status = 'running' as StatusType['status']

  const api = new Gitlab({
    host: options.value.host,
    token: options.value.token
  })

  if (status.value.results.length === 0) {
    const groups = await api.Groups.all()
    console.log(groups)
    // todo: filter groups

    if (status.value.status === ('stopping' as StatusType['status'])) {
      status.value.status = 'idle'
      return
    }

    let projects: ProjectSchema[] = []
    for (const group of groups) {
      const projectsInGroup = await api.Groups.allProjects(group.id, { includeSubgroups: false })
      projects = projects.concat(projectsInGroup)

      if (status.value.status === ('stopping' as StatusType['status'])) {
        status.value.status = 'idle'
        return
      }
    }
    console.log(projects)
    // todo: filter projects

    // todo: Problem with existing values
    for (const project of projects) {
      status.value.results.push({ project: project, results: null, error: null })
    }
  }

  for (const entry of status.value.results) {
    if (entry.error != null || entry.results != null) continue

    try {
      if (status.value.status === ('stopping' as StatusType['status'])) {
        status.value.status = 'idle'
        return
      }

      const searchResult = await api.Search.all('blobs', status.value.searchOptions.searchKeyword, {
        projectId: entry.project.id,
        perPage: 100
      })
      console.log(searchResult)
      entry.results = searchResult
    } catch (e) {
      console.error(e)
      entry.error = e
    }
    await new Promise((resolve) => setTimeout(resolve, options.value.timeout))
  }
}
