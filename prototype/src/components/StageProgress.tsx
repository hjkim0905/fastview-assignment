// F1 개선안: 퍼센트 하나 대신 지금 어느 단계인지와, 단계별 예상 시간으로 계산한 남은 시간을 보여 준다.
// ponytail: 단계별 예상 시간은 고정값이다. 실제로는 서버가 입력 길이별 과거 소요 시간으로 계산해 내려줘야 한다.
const STAGES = [
  { name: '대본 정리', seconds: 3 },
  { name: '음성 만들기', seconds: 4 },
  { name: '배경 고르기', seconds: 5 },
  { name: '영상 합성', seconds: 10 },
  { name: '마무리', seconds: 4 },
]
export const STAGE_DONE_AT = STAGES.reduce((sum, s) => sum + s.seconds, 0)

function currentStageIndex(t: number) {
  let end = 0
  for (let i = 0; i < STAGES.length; i++) {
    end += STAGES[i].seconds
    if (t < end) return i
  }
  return STAGES.length
}

export function StageProgress({ elapsed }: { elapsed: number }) {
  const current = currentStageIndex(elapsed)
  const remaining = Math.ceil(STAGE_DONE_AT - elapsed)
  const pct = Math.min(100, Math.round((elapsed / STAGE_DONE_AT) * 100))
  return (
    <section className="rounded-2xl border border-[#e3e5e9] bg-white p-6">
      <div className="flex items-baseline justify-between">
        <p className="font-semibold">
          {current < STAGES.length ? `${STAGES[current].name} 중 (${current + 1}/${STAGES.length})` : '완성됐어요'}
        </p>
        <p className="text-sm text-[#6b7079]">
          {remaining > 0 ? `약 ${remaining}초 남음 · 경과 ${Math.floor(elapsed)}초` : ''}
        </p>
      </div>
      <div className="mt-3 h-2 rounded bg-[#eef0f3]">
        <div className="h-2 rounded bg-brand transition-[width]" style={{ width: `${pct}%` }} />
      </div>
      <ol className="mt-4 flex flex-col gap-2 text-sm">
        {STAGES.map((stage, i) => (
          <li key={stage.name} className={i === current ? 'font-semibold' : i < current ? 'text-[#6b7079]' : 'text-[#9a9fa8]'}>
            {i < current ? '✓' : i === current ? '●' : '○'} {stage.name}
            <span className="ml-2 text-xs text-[#9a9fa8]">보통 {stage.seconds}초</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-[#6b7079]">다른 화면으로 나가도 계속 만들어져요. 완성되면 알려 드릴게요.</p>
    </section>
  )
}
