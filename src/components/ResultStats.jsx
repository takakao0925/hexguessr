import { rgbToHex } from '../utils/color'

const MAX_DISTANCE = Math.sqrt(3 * 255 ** 2)

export function ResultStats({ guess, target, elapsed, onNext, onHome, children }) {
  const dR = Math.abs(guess.r - target.r)
  const dG = Math.abs(guess.g - target.g)
  const dB = Math.abs(guess.b - target.b)
  const distance = Math.sqrt(dR ** 2 + dG ** 2 + dB ** 2)
  const matchPercent = Math.round((1 - distance / MAX_DISTANCE) * 100)
  const isExact = distance === 0

  return (
    <div className="result-stats">
      <h2>{isExact ? '完全命中！' : '結算'}</h2>

      <div className="result-swatches">
        <div className="result-swatch-item">
          <span className="swatch" style={{ backgroundColor: `rgb(${guess.r}, ${guess.g}, ${guess.b})` }} />
          <span>你的答案 #{rgbToHex(guess)}</span>
        </div>
        <div className="result-swatch-item">
          <span className="swatch" style={{ backgroundColor: `rgb(${target.r}, ${target.g}, ${target.b})` }} />
          <span>正確答案 #{rgbToHex(target)}</span>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-stat">
          <span>相似度</span>
          <strong>{matchPercent}%</strong>
        </div>
        <div className="result-stat">
          <span>座標距離</span>
          <strong>{distance.toFixed(1)}</strong>
        </div>
        <div className="result-stat">
          <span>花費時間</span>
          <strong>{elapsed.toFixed(1)}s</strong>
        </div>
      </div>

      {children}

      <div className="result-actions">
        <button type="button" onClick={onNext}>
          下一關
        </button>
        <button type="button" className="secondary" onClick={onHome}>
          回主頁
        </button>
      </div>
    </div>
  )
}
