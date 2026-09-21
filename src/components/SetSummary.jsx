import { matchPercent, rgbToHex } from '../utils/color'
import { getSetComment } from '../utils/comment'
import { useEnterKey } from '../hooks/useEnterKey'

function ColorCell({ rgb }) {
  return (
    <span className="swatch-inline">
      <span className="swatch" style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }} />
      #{rgbToHex(rgb)}
    </span>
  )
}

export function SetSummary({ results, totals, onViewRank, onHome }) {
  const { totalDistance, totalTime, avgDistance, avgTime } = totals
  const comment = getSetComment(avgDistance)
  const avgSimilarity = matchPercent(avgDistance)

  useEnterKey(onViewRank)

  return (
    <div className="result-stats">
      <h2>10 關總結算</h2>
      <p className="set-comment">{comment}</p>

      <div className="result-grid">
        <div className="result-stat">
          <span>平均相似度</span>
          <strong>{avgSimilarity}%</strong>
        </div>
        <div className="result-stat">
          <span>平均距離</span>
          <strong>{avgDistance.toFixed(1)}</strong>
        </div>
        <div className="result-stat">
          <span>平均時間</span>
          <strong>{avgTime.toFixed(1)}s</strong>
        </div>
        <div className="result-stat">
          <span>總距離</span>
          <strong>{totalDistance.toFixed(1)}</strong>
        </div>
        <div className="result-stat">
          <span>總時間</span>
          <strong>{totalTime.toFixed(1)}s</strong>
        </div>
      </div>

      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>#</th>
              <th>正確顏色</th>
              <th>你的顏色</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <ColorCell rgb={result.target} />
                </td>
                <td>
                  <ColorCell rgb={result.guess} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="result-actions">
        <button type="button" onClick={onViewRank}>
          查看排行榜
        </button>
        <button type="button" className="secondary" onClick={onHome}>
          回主頁
        </button>
      </div>
    </div>
  )
}
