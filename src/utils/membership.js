import { readJSON, writeJSON } from './rankings'

const MEMBERS_KEY = 'hexguessr:members'

export const XP_PER_LEVEL = 100
export const MAX_XP_PER_ROUND = 33

export function xpForSimilarity(percent) {
  const ratio = Math.min(Math.max(percent, 0), 100) / 100
  return Math.round(MAX_XP_PER_ROUND * ratio * ratio)
}

export function levelInfo(xp) {
  return { level: Math.floor(xp / XP_PER_LEVEL) + 1, xpInLevel: xp % XP_PER_LEVEL }
}

export function getMemberXp(nickname) {
  return readJSON(MEMBERS_KEY, {})[nickname]?.xp ?? 0
}

export function awardXp(nickname, gained) {
  const members = readJSON(MEMBERS_KEY, {})
  const prevXp = members[nickname]?.xp ?? 0
  const newXp = prevXp + gained
  members[nickname] = { xp: newXp }
  writeJSON(MEMBERS_KEY, members)
  return {
    gained,
    prevXp,
    newXp,
    prevLevel: levelInfo(prevXp).level,
    newLevel: levelInfo(newXp).level,
  }
}
