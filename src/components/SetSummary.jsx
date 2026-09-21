import { getSetComment } from '../utils/comment'
import { formatTimestamp } from '../utils/rankings'

export function SetSummary({ totals, rankings, nickname, savedAt, onContinue, onHome }) {
  const { totalDistance, totalTime, avgDistance, avgTime } = totals
  const comment = getSetComment(avgDistance)

  return (
    <div className="result-stats">
      <h2>10 關總結算</h2>
      <p className="set-comment">{comment}</p>

      <div className="result-grid">
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

      <div className="rank-table-wrap">
        <table className="rank-table">
          <thead>
            <tr>
              <th>#</th>
              <th>暱稱</th>
              <th>總距離</th>
              <th>總時間</th>
              <th>平均距離</th>
              <th>平均時間</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((entry, index) => (
              <tr
                key={entry.timestamp}
                className={entry.id === nickname && entry.timestamp === savedAt ? 'rank-row-self' : undefined}
              >
                <td>{index + 1}</td>
                <td>{entry.id}</td>
                <td>{entry.totalDistance.toFixed(1)}</td>
                <td>{entry.totalTime.toFixed(1)}s</td>
                <td>{entry.avgDistance.toFixed(1)}</td>
                <td>{entry.avgTime.toFixed(1)}s</td>
                <td>{formatTimestamp(entry.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="result-actions">
        <button type="button" onClick={onContinue}>
          下一輪 10 關
        </button>
        <button type="button" className="secondary" onClick={onHome}>
          回主頁
        </button>
      </div>
    </div>
  )
}
