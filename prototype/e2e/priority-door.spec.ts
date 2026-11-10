import { expect, test } from '@playwright/test'

// 숫자의 근거가 이벤트뿐이라, 문을 끝까지 눌렀을 때 세 이벤트가 순서대로 한 번씩 찍히는지만 확인한다.
test('우선 처리 문: 노출, 클릭, 알림 신청이 순서대로 한 번씩 기록된다', async ({ page }) => {
  await page.goto('/?v=door')
  await page.getByRole('button', { name: '우선 처리로 빠르게 받기' }).click({ timeout: 15_000 })
  await page.getByRole('button', { name: '출시되면 알림 받기' }).click()
  await expect(page.getByText('알림을 신청했어요')).toBeVisible()

  const names = await page.evaluate(() => (window.__events ?? []).map((e) => e.name))
  expect(names).toEqual(['priority_door_viewed', 'priority_door_clicked', 'priority_notify_signup'])
})

test('지금 쇼더스 버전에는 문이 없고 이벤트도 없다', async ({ page }) => {
  await page.goto('/?v=before')
  await page.waitForTimeout(7_000)
  await expect(page.getByRole('button', { name: '우선 처리로 빠르게 받기' })).toHaveCount(0)
  expect(await page.evaluate(() => (window.__events ?? []).length)).toBe(0)
})
