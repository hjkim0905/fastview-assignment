// F2 개선안: 결과 화면에서만 보이던 품질 검사(캡처 14, 15번)를 만드는 도중에 끝난 항목부터 보여 준다.
// 수치는 캡처 15번의 실제 검사 결과다.
// ponytail: 항목이 끝나는 시각은 고정값이다. 실제로는 파이프라인 단계가 끝날 때 서버가 검사 결과를 흘려보내야 한다.
const CHECKS = [
  { at: 8, group: '오디오', result: '5/5 통과', detail: '무음 비율 0.15 (허용 0.3), 소리 어긋남 0ms', isWarning: false },
  { at: 14, group: '비디오', result: '2/2 통과', detail: '검은 화면 0, 정지 프레임 0', isWarning: false },
  { at: 20, group: '구성', result: '9/9 통과', detail: '빈 구간 0, 문장 중간에 바뀐 장면 0', isWarning: false },
  { at: 24, group: '자막 가독성', result: '7/8 충족', detail: '관형형·수량 단위 끊김 20% (기준 5% 이하). 결과 화면에서 자막을 고칠 수 있어요', isWarning: true },
]

export function QualityPreview({ elapsed }: { elapsed: number }) {
  const done = CHECKS.filter((c) => elapsed >= c.at)
  return (
    <section className="rounded-2xl border border-[#e3e5e9] bg-white p-6">
      <p className="font-semibold">만들면서 확인한 품질</p>
      {done.length === 0 ? (
        <p className="mt-2 text-sm text-[#6b7079]">항목이 끝나는 대로 여기에 보여 드려요.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {done.map((c) => (
            <li key={c.group}>
              <span className={c.isWarning ? 'font-semibold text-[#b26a00]' : 'font-semibold text-[#1f8a4c]'}>
                {c.isWarning ? '주의' : '통과'}
              </span>
              <span className="ml-2 font-semibold">{c.group}</span>
              <span className="ml-2 text-[#6b7079]">{c.result}</span>
              <p className="mt-0.5 text-xs text-[#6b7079]">{c.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
