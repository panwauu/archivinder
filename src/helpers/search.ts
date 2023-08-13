import { useLocalStorage } from '@vueuse/core'
import { Gitlab, type BlobSchema, type ProjectSchema } from '@gitbeaker/rest'
import { options } from '@/helpers/options'
import { ref } from 'vue'
import { wildcardMatch } from './wildcard'

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
  if (status.value.status === 'running' || status.value.status === 'stopping') return

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
  ) {
    console.error('Some credentials are empty')
    return
  }

  status.value.status = 'running' as StatusType['status']

  const api = new Gitlab({
    host: options.value.host,
    token: options.value.token
  })

  if (status.value.results.length === 0) {
    try {
      const groups = (await api.Groups.all()).filter((g) =>
        wildcardMatch(status.value.searchOptions.groupKeyword, g.full_path)
      )

      if (status.value.status === ('stopping' as StatusType['status'])) {
        status.value.status = 'idle'
        return
      }

      let projects: ProjectSchema[] = []
      for (const group of groups) {
        const projectsInGroup = await api.Groups.allProjects(group.id, { includeSubgroups: false })
        projects = projects.concat(
          projectsInGroup.filter((p) =>
            wildcardMatch(status.value.searchOptions.projectKeyword, p.name)
          )
        )

        if (status.value.status === ('stopping' as StatusType['status'])) {
          status.value.status = 'idle'
          return
        }
      }

      for (const project of projects) {
        if (project.archived || project.empty_repo) continue
        status.value.results.push({ project: project, results: null, error: null })
      }
    } catch (err) {
      status.value.status = 'idle'
      console.error(err)
      console.error('This error is likely because of wrong Credentials')
      return
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
      entry.results = searchResult.filter((b) =>
        wildcardMatch('*' + status.value.searchOptions.fileKeyword, b.path)
      )
    } catch (e) {
      console.error(e)
      entry.error = e
    }
    await new Promise((resolve) => setTimeout(resolve, options.value.timeout))
  }

  status.value.status = 'idle'
}
