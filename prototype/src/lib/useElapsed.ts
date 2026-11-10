import { useEffect, useState } from 'react'

const TICK_MS = 100

// 렌더 시작부터 지난 시간(초). 실제 서버 진행 대신 정해 둔 시나리오를 재생하는 데 쓴다.
export function useElapsed() {
  const [startedAt] = useState(() => Date.now())
  const [now, setNow] = useState(startedAt)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), TICK_MS)
    return () => clearInterval(id)
  }, [])
  return (now - startedAt) / 1000
}
