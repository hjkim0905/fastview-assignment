import type { ReactNode } from 'react'

const MENU = ['내 숏폼', '라이브러리', '채널·발행', '소재 찾기']
const SUB_MENU = ['구독/결제', 'API & MCP', '도움말', '문의하기']
const STEPS = ['입력', '대본과 나레이션', '디자인', '만들기', '결과']
const HEADINGS = {
  3: { label: '4단계 · 만들기', title: '영상 만들기', desc: '각 단계가 자동으로 진행됩니다. 보통 몇 분이면 끝나요.' },
  4: { label: '5단계 · 결과', title: '결과', desc: '완성된 클립과 자동 품질 검사를 확인한 뒤 다운로드하세요.' },
}

// 캡처 9~13번의 사이드바와 단계 탭을 단순하게 재현한다. 실제 화면과 픽셀 단위로 맞추지 않는다.
interface ShellProps {
  step: 3 | 4
  creditBox?: ReactNode
  children: ReactNode
}

export function Shell({ step, creditBox, children }: ShellProps) {
  const heading = HEADINGS[step]
  return (
    <div className="flex min-h-screen bg-canvas text-[#17181a]">
      <aside className="hidden w-56 shrink-0 flex-col bg-sidebar px-4 py-6 text-[#c9ccd3] md:flex">
        <p className="text-lg font-extrabold italic text-white">
          Short<span className="text-brand">Us</span>
        </p>
        <p className="mt-1 text-[11px] tracking-wide text-[#8a8f99]">AI SHORTS STUDIO</p>
        <nav className="mt-8 flex flex-col gap-4 text-sm">
          {MENU.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <div className="mt-auto rounded-lg border border-white/10 p-3 text-xs">
          {creditBox ?? (
            <>
              <p className="text-[#8a8f99]">크레딧</p>
              <p className="mt-1 text-base font-bold text-white">150 남음</p>
              <div className="mt-2 h-1 rounded bg-brand" />
              <p className="mt-2 text-[#8a8f99]">가입 환영 크레딧 100 · 11월 17일까지</p>
            </>
          )}
        </div>
        <nav className="mt-6 flex flex-col gap-3 text-xs">
          {SUB_MENU.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
      </aside>

      <main className="flex-1 px-4 py-8 md:px-16">
        <p className="text-sm font-semibold">롤드컵 T1, BLG에 4강 탈락</p>
        <ol className="mt-3 flex flex-wrap gap-2 text-sm">
          {STEPS.map((name, i) => (
            <li
              key={name}
              className={`rounded-full border px-4 py-1.5 ${
                i === step ? 'border-brand text-brand' : 'border-[#e3e5e9] bg-white'
              }`}
            >
              {i < step ? '✓ ' : `${i + 1} `}
              {name}
            </li>
          ))}
        </ol>
        <p className="mt-10 text-xs text-[#6b7079]">{heading.label}</p>
        <h1 className="mt-1 text-3xl font-bold">{heading.title}</h1>
        <p className="mt-2 text-sm text-[#6b7079]">{heading.desc}</p>
        <div className="mt-6 flex max-w-3xl flex-col gap-4">{children}</div>
      </main>
    </div>
  )
}
