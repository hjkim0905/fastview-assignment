// 완성 뒤 결과 화면(캡처 14번)을 mock 데이터로 재현한다. 버전마다 같은 결과를 보여 줘서 비교가 대기 화면에만 집중되게 한다.
const VIDEO_INFO = [
  ['길이', '0:33'],
  ['화면', '1080×1920 · 9:16'],
  ['템플릿', '임팩트 제목 바'],
]

export function ResultMock() {
  return (
    <section className="flex flex-col gap-6 md:flex-row">
      <div className="flex aspect-[9/16] w-full max-w-[260px] flex-col overflow-hidden rounded-2xl bg-black">
        <p className="bg-black px-4 py-6 text-center text-lg font-extrabold text-white">
          T1의 극적인 반격과
          <br />
          <span className="text-[#ffd84d]">예상 밖의 전개</span>
        </p>
        <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-[#7a1f2b] to-[#3a0d14] px-4 text-center text-sm font-bold text-white">
          결국 T1은 BLG에 세트 스코어
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex gap-2">
          <button type="button" className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">영상 다운로드</button>
          <button type="button" className="rounded-full border border-[#e3e5e9] bg-white px-5 py-2.5 text-sm">채널에 발행</button>
        </div>
        <dl className="grid grid-cols-[80px_1fr] gap-y-2 rounded-2xl border border-[#e3e5e9] bg-white p-5 text-sm">
          {VIDEO_INFO.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-[#6b7079]">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="rounded-2xl border border-[#e3e5e9] bg-white p-5 text-sm">
          <span className="mr-2 rounded bg-[#e8f6ee] px-2 py-0.5 text-xs font-semibold text-[#1f8a4c]">품질 검사 통과</span>
          검사 16항목 · 통과 16 · 주의 0 · 실패 0
        </p>
      </div>
    </section>
  )
}
