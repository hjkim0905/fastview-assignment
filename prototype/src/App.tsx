import { CreditExpiryBanner, EXPIRES_AT, MONTHLY_CREDITS_LEFT, SHORTS_LEFT, WELCOME_CREDITS_LEFT } from './components/CreditExpiryBanner'
import { EventLog } from './components/EventLog'
import { LEGACY_DONE_AT, LEGACY_STALL_AT, LegacyProgress } from './components/LegacyProgress'
import { PriorityDoor } from './components/PriorityDoor'
import { QualityPreview } from './components/QualityPreview'
import { ResultMock } from './components/ResultMock'
import { Shell } from './components/Shell'
import { STAGE_DONE_AT, StageProgress } from './components/StageProgress'
import { useElapsed } from './lib/useElapsed'

const VARIANTS = {
  before: '지금 쇼더스',
  door: '지정 1순위 · 우선 처리 Fake door',
  credit: '지정 2순위 · 환영 크레딧 소멸 알림',
  progress: '자유 1순위 · 단계별 진행률',
  quality: '자유 2순위 · 만들면서 품질 보여 주기',
} as const
type Variant = keyof typeof VARIANTS

function readVariant(): Variant {
  const v = new URLSearchParams(window.location.search).get('v')
  return v && v in VARIANTS ? (v as Variant) : 'before'
}

function VariantBar({ current }: { current: Variant }) {
  return (
    <nav aria-label="프로토타입 버전" className="sticky top-0 z-20 bg-[#17181a] px-4 py-3">
      <p className="text-xs text-[#c9ccd3]">프로토타입 버전 5개 · 눌러서 비교해 보세요 (바꾸면 처음부터 다시 재생돼요)</p>
      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        {(Object.keys(VARIANTS) as Variant[]).map((v) => (
          <a
            key={v}
            href={`?v=${v}`}
            aria-current={v === current ? 'page' : undefined}
            className={`rounded-full border px-3 py-1 ${v === current ? 'border-white bg-white font-semibold text-black' : 'border-white/30 text-white hover:border-white'}`}
          >
            {VARIANTS[v]}
          </a>
        ))}
      </div>
    </nav>
  )
}

// 지정 2순위: 소멸 2일 전 상황. 남은 환영 크레딧을 편수와 사라지는 시각으로 보여 준다.
function ImprovedCreditBox() {
  return (
    <>
      <p className="text-[#8a8f99]">크레딧</p>
      <p className="mt-1 text-base font-bold text-white">{MONTHLY_CREDITS_LEFT + WELCOME_CREDITS_LEFT} 남음</p>
      <div className="mt-2 h-1 rounded bg-brand" />
      <p className="mt-2 font-semibold text-[#ffd27a]">
        환영 크레딧 {WELCOME_CREDITS_LEFT} = 약 {SHORTS_LEFT}편
      </p>
      <p className="text-[#8a8f99]">{EXPIRES_AT}에 사라져요</p>
    </>
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
      <Shell step={isDone ? 4 : 3} creditBox={variant === 'credit' ? <ImprovedCreditBox /> : undefined}>
        {variant === 'credit' && <CreditExpiryBanner />}
        {isDone ? (
          <ResultMock />
        ) : (
          <>
            <WatermarkNotice />
            {variant === 'progress' ? <StageProgress elapsed={elapsed} /> : <LegacyProgress elapsed={elapsed} />}
            {variant === 'quality' && <QualityPreview elapsed={elapsed} />}
          </>
        )}
        {variant === 'door' && !isDone && elapsed >= LEGACY_STALL_AT && <PriorityDoor />}
      </Shell>
      <EventLog />
    </>
  )
}
