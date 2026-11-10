import { useEffect, useState } from 'react'
import type { TrackedEvent } from '../lib/track'

// 프로토타입 전용: 계측이 실제로 찍히는지 평가자가 화면에서 바로 보게 한다.
export function EventLog() {
  const [events, setEvents] = useState<TrackedEvent[]>([])
  useEffect(() => {
    const onTracked = (e: Event) => setEvents((prev) => [...prev, (e as CustomEvent<TrackedEvent>).detail])
    window.addEventListener('tracked', onTracked)
    return () => window.removeEventListener('tracked', onTracked)
  }, [])

  return (
    <aside aria-label="이벤트 로그" className="fixed right-4 bottom-4 w-72 rounded-xl bg-[#17181a] p-3 font-mono text-[11px] text-[#c9ccd3] shadow-lg">
      <p className="mb-1 font-sans font-semibold text-white">이벤트 로그 (프로토타입 전용)</p>
      {events.length === 0 ? (
        <p>아직 없음</p>
      ) : (
        <ol>
          {events.map((e) => (
            <li key={`${e.name}-${e.at}`}>{e.name}</li>
          ))}
        </ol>
      )}
    </aside>
  )
}
