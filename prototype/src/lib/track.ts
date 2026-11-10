export type TrackedEvent = { name: string; props: Record<string, string | number>; at: number }

declare global {
  interface Window {
    __events?: TrackedEvent[]
  }
}

// ponytail: 이벤트를 window.__events 에만 쌓는다. 실제 실험에서는 같은 자리에서 PostHog capture 로 보낸다.
export function track(name: string, props: Record<string, string | number> = {}) {
  const event = { name, props, at: Date.now() }
  window.__events = [...(window.__events ?? []), event]
  window.dispatchEvent(new CustomEvent('tracked', { detail: event }))
}
