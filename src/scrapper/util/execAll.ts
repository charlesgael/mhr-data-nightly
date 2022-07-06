interface ExecAllRegexResult<T extends string> extends RegExpExecArray {
  groups: {
    [Key in T]: string;
  }
}

export function* execAll<M extends string = never>(str: string, regex: RegExp): Generator<ExecAllRegexResult<M>> {
  if (!regex.global)
    console.error('RegExp must have the global flag to retrieve multiple results.')

  let match
  // eslint-disable-next-line no-cond-assign
  while (match = regex.exec(str))
    yield match as ExecAllRegexResult<M>
}
