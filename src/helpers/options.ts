import { useLocalStorage } from '@vueuse/core'

export type OptionsType = {
  host?: string
  token?: string
  timeout: number
}

export const options = useLocalStorage<OptionsType>(
  'options',
  {
    host: undefined,
    token: undefined,
    timeout: 6000
  },
  { mergeDefaults: true }
)
