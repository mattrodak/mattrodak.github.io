type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T] &
  string

export function suppressConsoleLogs(
  cb: () => void,
  type: FunctionPropertyNames<typeof globalThis.console> = 'error',
) {
  const spy = vi
    .spyOn(globalThis.console, type)
    .mockImplementation(() => vi.fn())

  try {
    cb()
  } finally {
    spy.mockRestore()
  }
}
