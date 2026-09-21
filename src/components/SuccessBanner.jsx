import { rgbToHex } from '../utils/color'
import { useEnterKey } from '../hooks/useEnterKey'

export function SuccessBanner({ target, elapsed, attempts, onNext, onHome }) {
  useEnterKey(onNext)

  return (
    <div className="success-banner">
      <h2>答對了！</h2>

      <div className="result-swatches">
        <div className="result-swatch-item">
          <span
            className="swatch"
            style={{ backgroundColor: `rgb(${target.r}, ${target.g}, ${target.b})` }}
          />
          <span>正確答案 #{rgbToHex(target)}</span>
        </div>
      </div>

      <p>
        花了 {elapsed.toFixed(1)} 秒，共 {attempts} 次嘗試
      </p>
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
