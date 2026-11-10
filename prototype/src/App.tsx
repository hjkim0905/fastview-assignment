import { EventLog } from './components/EventLog'
import { LEGACY_DONE_AT, LEGACY_STALL_AT, LegacyProgress } from './components/LegacyProgress'
import { PriorityDoor } from './components/PriorityDoor'
import { Shell } from './components/Shell'
import { STAGE_DONE_AT, StageProgress } from './components/StageProgress'
import { useElapsed } from './lib/useElapsed'

const VARIANTS = {
  before: '지금 쇼더스',
  door: '지정 1순위: 우선 처리 Fake door',
  progress: '자유 1순위: 단계별 진행률',
} as const
type Variant = keyof typeof VARIANTS

function readVariant(): Variant {
  const v = new URLSearchParams(window.location.search).get('v')
  return v && v in VARIANTS ? (v as Variant) : 'before'
}

function VariantBar({ current }: { current: Variant }) {
  return (
    <nav aria-label="버전 전환" className="sticky top-0 z-20 flex flex-wrap gap-2 bg-[#17181a] px-4 py-2 text-xs">
      {(Object.keys(VARIANTS) as Variant[]).map((v) => (
        <a key={v} href={`?v=${v}`} className={`rounded-full px-3 py-1 ${v === current ? 'bg-white text-black' : 'text-[#c9ccd3]'}`}>
          {VARIANTS[v]}
        </a>
      ))}
    </nav>
  )
}

// 캡처 12번의 실제 안내 문구 그대로. 모든 버전에 같게 둔다.
function WatermarkNotice() {
  return (
    <p className="rounded-xl bg-[#eef0f3] px-4 py-3 text-sm text-[#3a3d42]">
      무료 플랜은 워터마크가 포함되어 출력됩니다 <a href="#" className="underline">요금제 보기</a>
    </p>
  )
}

export default function App() {
  const variant = readVariant()
  const elapsed = useElapsed()
  const doneAt = variant === 'progress' ? STAGE_DONE_AT : LEGACY_DONE_AT
  const isDone = elapsed >= doneAt

  return (
    <>
      <VariantBar current={variant} />
      <Shell>
        <WatermarkNotice />
        {isDone ? (
          <section className="rounded-2xl border border-[#e3e5e9] bg-white p-6 font-semibold">영상이 완성됐어요</section>
        ) : variant === 'progress' ? (
          <StageProgress elapsed={elapsed} />
        ) : (
          <LegacyProgress elapsed={elapsed} />
        )}
        {variant === 'door' && elapsed >= LEGACY_STALL_AT && <PriorityDoor />}
      </Shell>
      <EventLog />
    </>
  )
}
