import { formatTimestamp } from '../utils/rankings'
import { useEnterKey } from '../hooks/useEnterKey'

export function RankBoard({ rankings, nickname, savedAt, onContinue, onHome }) {
  useEnterKey(onContinue)

  return (
    <div className="result-stats">
      <h2>排行榜 TOP 10</h2>

      <div className="rank-table-wrap">
        <table className="rank-table">
          <thead>
            <tr>
              <th>#</th>
              <th>暱稱</th>
              <th>平均距離</th>
              <th>總距離</th>
              <th>平均時間</th>
              <th>總時間</th>
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
                <td>{entry.avgDistance.toFixed(1)}</td>
                <td>{entry.totalDistance.toFixed(1)}</td>
                <td>{entry.avgTime.toFixed(1)}s</td>
                <td>{entry.totalTime.toFixed(1)}s</td>
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
