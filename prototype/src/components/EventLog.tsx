import { useEffect, useState } from 'react'
import type { TrackedEvent } from '../lib/track'

// 프로토타입 전용: 계측이 실제로 찍히는지 평가자가 화면에서 바로 보게 한다.
export function EventLog() {
  const [events, setEvents] = useState<TrackedEvent[]>([])
  useEffect(() => {
    // 이 패널보다 먼저 마운트된 화면이 보낸 이벤트(배너 노출 등)를 놓치지 않게, 구독 전에 쌓인 것부터 읽는다
    setEvents(window.__events ?? [])
    const onTracked = () => setEvents(window.__events ?? [])
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
