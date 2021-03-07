// eslint-disable-next-line
import http from 'http'

declare module 'http' {
  interface ServerResponse {
    timing: {
      start: (name: string, description?: string) => void
      end: (name: string) => void
    }
  }
}
