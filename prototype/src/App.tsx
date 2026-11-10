import { LEGACY_DONE_AT, LegacyProgress } from './components/LegacyProgress'
import { Shell } from './components/Shell'
import { useElapsed } from './lib/useElapsed'

// 캡처 11번: 무료 플랜 워터마크가 개발자용 영어 문구로 노출된다.
function WatermarkNotice() {
  return (
    <div className="rounded-xl border border-[#e3e5e9] bg-white px-4 py-3 text-sm">
      <p>이번 렌더에서 빠진 것</p>
      <p className="mt-2">• free plan: a watermark was applied by the server (upgrade your plan to remove it - plan_required)</p>
    </div>
  )
}

export default function App() {
  const elapsed = useElapsed()
  return (
    <Shell>
      <WatermarkNotice />
      {elapsed >= LEGACY_DONE_AT ? (
        <section className="rounded-2xl border border-[#e3e5e9] bg-white p-6 font-semibold">영상이 완성됐어요</section>
      ) : (
        <LegacyProgress elapsed={elapsed} />
      )}
    </Shell>
  )
}
