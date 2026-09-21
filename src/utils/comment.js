import { matchPercent } from './color'

// dummy tiers for now — swap for something smarter later
const TIERS = [
  { min: 90, comment: '小天才' },
  { min: 75, comment: '你超棒' },
  { min: 55, comment: '你棒' },
  { min: 35, comment: '你普通' },
  { min: -Infinity, comment: '色盲或數學白痴' },
]

export function getSetComment(avgDistance) {
  const percent = matchPercent(avgDistance)
  return TIERS.find((tier) => percent >= tier.min).comment
}
