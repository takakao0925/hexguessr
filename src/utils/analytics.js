// 把事件丟進 GTM 的 dataLayer；GTM 再依觸發條件轉送給 GA4。
// 注意：不要送暱稱等個人資訊。
export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
