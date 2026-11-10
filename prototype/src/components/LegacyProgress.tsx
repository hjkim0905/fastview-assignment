// 지금 쇼더스의 진행률(캡처 12, 13번)을 재현한다.
// 75% 까지는 빨리 오르고 "약 1초 남음"에서 멈췄다가 99% "마무리 중"으로 뛰고, 그 뒤로도 한참 걸린다.
export const LEGACY_STALL_AT = 6
const FINALIZE_AT = 18
export const LEGACY_DONE_AT = 26

function legacyState(t: number) {
  if (t < LEGACY_STALL_AT) {
    return { pct: Math.round((t / LEGACY_STALL_AT) * 75), label: `약 ${Math.max(1, Math.ceil(LEGACY_STALL_AT - t))}초 남음` }
  }
  if (t < FINALIZE_AT) return { pct: 75, label: '약 1초 남음' }
  return { pct: 99, label: '마무리 중' }
}

export function LegacyProgress({ elapsed }: { elapsed: number }) {
  const { pct, label } = legacyState(elapsed)
  return (
    <section className="rounded-2xl border border-[#e3e5e9] bg-white p-6">
      <p className="font-semibold">영상 만드는 중</p>
      <p className="mt-1 text-xs text-[#6b7079]">시작 오후 11:09:40</p>
      <p className="mt-3 text-sm">{pct}%</p>
      <div className="mt-2 h-2 rounded bg-[#eef0f3]">
        <div className="h-2 rounded bg-brand transition-[width]" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-sm text-[#6b7079]">{label}</p>
    </section>
  )
}
