export function wildcardMatch(wildcardKey: string, testString: string) {
  if (wildcardKey == null || wildcardKey === '') return true
  return new RegExp(`^${wildcardKey.replace(/\*/g, '.*').replace(/\?/g, '.')}$`).test(testString)
}
