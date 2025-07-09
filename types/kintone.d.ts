// kintone global type definitions
declare global {
  interface KintoneEvent {
    appId: number
    viewId?: number
    record?: Record<string, { value: unknown }>
    records?: Array<Record<string, { value: unknown }>>
    error?: string
    url?: string
    type: string
  }

  interface Window {
    kintone: {
      events: {
        on: (
          events: string | string[],
          callback: (event: KintoneEvent) => KintoneEvent | undefined
        ) => void
        off: (
          events: string | string[],
          callback?: (event: KintoneEvent) => KintoneEvent | undefined
        ) => void
      }
      app: {
        getId: () => number | null
        getViewId: () => number | null
        record: {
          getId: () => number | null
          get: () => Record<string, unknown>
          set: (record: Record<string, unknown>) => void
        }
      }
      getLoginUser: () => {
        id: string
        code: string
        name: string
        email: string
        url: string
        employeeNumber: string
        phone: string
        mobilePhone: string
        extensionNumber: string
        timezone: string
        isGuest: boolean
        language: string
      }
    }
  }

  const kintone: Window['kintone']
}

export {}
