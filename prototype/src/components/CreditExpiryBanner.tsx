import { useEffect, useRef } from 'react'
import { track } from '../lib/track'

// 지정 2순위: 가입 환영 크레딧이 사라진다는 사실이 사이드바 작은 글씨에만 있어 결제를 미룬다.
// 소멸 2일 전 상황을 가정하고, 남은 크레딧을 "몇 편"으로 바꿔 화면 위에 알린다.
export const WELCOME_CREDITS_LEFT = 39
export const MONTHLY_CREDITS_LEFT = 50
const CREDITS_PER_SHORT = 6 // 요금제 화면 기준: 30초 쇼츠 1편 = 6크레딧
export const SHORTS_LEFT = Math.floor(WELCOME_CREDITS_LEFT / CREDITS_PER_SHORT)
export const EXPIRES_AT = '11월 17일 밤 10:57'

export function CreditExpiryBanner() {
  const hasTrackedView = useRef(false)
  useEffect(() => {
    if (hasTrackedView.current) return
    hasTrackedView.current = true
    track('credit_expiry_banner_viewed', { credits_left: WELCOME_CREDITS_LEFT, days_left: 2 })
  }, [])

  return (
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#f0c36d] bg-[#fff8e6] p-5">
      <div>
        <p className="font-semibold">
          환영 크레딧 {WELCOME_CREDITS_LEFT}(약 {SHORTS_LEFT}편)가 이틀 뒤 사라져요
        </p>
        <p className="mt-1 text-sm text-[#6b7079]">Creator는 매달 100크레딧이 채워지고 워터마크가 없어요.</p>
      </div>
      <a
        href="#"
        onClick={() => track('credit_expiry_pricing_clicked', { credits_left: WELCOME_CREDITS_LEFT })}
        className="rounded-full border border-[#17181a] px-5 py-2.5 text-sm font-semibold hover:bg-[#17181a] hover:text-white"
      >
        요금제 보기
      </a>
    </section>
  )
}
