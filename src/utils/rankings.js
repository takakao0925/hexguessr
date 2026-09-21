const RANKINGS_KEY = 'hexguessr:oldChickenRankings'
const NICKNAME_KEY = 'hexguessr:nickname'
const MAX_ENTRIES = 10

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore write failures (private mode, storage full, etc.)
  }
}

export function loadNickname() {
  try {
    return localStorage.getItem(NICKNAME_KEY) || ''
  } catch {
    return ''
  }
}

export function saveNickname(nickname) {
  try {
    localStorage.setItem(NICKNAME_KEY, nickname)
  } catch {
    // ignore write failures
  }
}

export function getRankings() {
  return readJSON(RANKINGS_KEY, [])
}

export function computeSetTotals(results) {
  const totalDistance = results.reduce((sum, r) => sum + r.distance, 0)
  const totalTime = results.reduce((sum, r) => sum + r.elapsed, 0)
  const count = results.length
  return {
    totalDistance,
    totalTime,
    avgDistance: totalDistance / count,
    avgTime: totalTime / count,
  }
}

export function addRankingEntry({ id, totalDistance, totalTime, avgDistance, avgTime, timestamp = Date.now() }) {
  const entry = {
    id,
    totalDistance,
    totalTime,
    avgDistance,
    avgTime,
    timestamp,
  }
  const rankings = getRankings()
  rankings.push(entry)
  rankings.sort((a, b) => a.totalDistance - b.totalDistance || a.totalTime - b.totalTime)
  const trimmed = rankings.slice(0, MAX_ENTRIES)
  writeJSON(RANKINGS_KEY, trimmed)
  return trimmed
}

export function formatTimestamp(ts) {
  const d = new Date(ts)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
