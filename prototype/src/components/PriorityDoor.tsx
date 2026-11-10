import { useEffect, useRef, useState } from 'react'
import { track } from '../lib/track'

const PRO_PRICE = '월 19,800원'

// 가설 1순위: 빨리 받고 싶은 사용자가 우선 처리에 돈을 낼까. 기능은 만들지 않고 문만 놓아 클릭으로 수요를 잰다.
// 진행률이 멈추는 순간(기다림이 가장 길게 느껴지는 때)에 보여 준다.
export function PriorityDoor() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)

  const hasTrackedView = useRef(false)
  useEffect(() => {
    // 개발 모드(StrictMode)에서 effect 가 두 번 돌아도 노출은 한 번만 센다
    if (hasTrackedView.current) return
    hasTrackedView.current = true
    track('priority_door_viewed', { surface: 'render_wait' })
  }, [])

  const open = () => {
    track('priority_door_clicked', { surface: 'render_wait', price: PRO_PRICE })
    setIsOpen(true)
  }
  const signUp = () => {
    track('priority_notify_signup', { surface: 'render_wait' })
    setIsSignedUp(true)
  }

  return (
    <>
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand/30 bg-[#fff5f5] p-5">
        <div>
          <p className="font-semibold">기다리기 길게 느껴지시나요?</p>
          <p className="mt-1 text-sm text-[#6b7079]">우선 처리를 쓰면 대기열 앞에서 바로 만들어요 · Pro {PRO_PRICE}</p>
        </div>
        <button
          type="button"
          onClick={open}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          우선 처리로 빠르게 받기
        </button>
      </section>

      {isOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="door-title" className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <h2 id="door-title" className="text-lg font-bold">우선 처리는 아직 준비 중이에요</h2>
            <p className="mt-2 text-sm text-[#3a3d42]">
              지금 기다리시는 영상은 그대로 계속 만들어지고 있어요. 우선 처리가 나오면 가장 먼저 알려 드릴까요?
            </p>
            {isSignedUp ? (
              <p className="mt-5 text-sm font-semibold text-brand">알림을 신청했어요. 감사합니다.</p>
            ) : (
              <button type="button" onClick={signUp} className="mt-5 w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white">
                출시되면 알림 받기
              </button>
            )}
            <button type="button" onClick={() => setIsOpen(false)} className="mt-2 w-full py-2 text-sm text-[#6b7079]">
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  )
}
