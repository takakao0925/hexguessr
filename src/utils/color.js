export function hexToRgb(hex) {
  const padded = hex.padEnd(6, '0')
  return {
    r: parseInt(padded.slice(0, 2), 16),
    g: parseInt(padded.slice(2, 4), 16),
    b: parseInt(padded.slice(4, 6), 16),
  }
}

export function rgbToHex({ r, g, b }) {
  const channel = (n) => n.toString(16).padStart(2, '0')
  return `${channel(r)}${channel(g)}${channel(b)}`
}

export const MAX_RGB_DISTANCE = Math.sqrt(3 * 255 ** 2)

export function rgbDistance(a, b) {
  const dr = a.r - b.r
  const dg = a.g - b.g
  const db = a.b - b.b
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

export function matchPercent(distance) {
  return Math.round((1 - distance / MAX_RGB_DISTANCE) * 100)
}
