import { rgbToHex } from '../utils/color'

export function GuessHistory({ history }) {
  if (history.length === 0) return null

  return (
    <div className="guess-history">
      <h3>本關紀錄</h3>
      <ol>
        {history.map((guess, index) => (
          <li key={index}>
            <span
              className="swatch"
              style={{ backgroundColor: `rgb(${guess.r}, ${guess.g}, ${guess.b})` }}
            />
            #{rgbToHex(guess)}
          </li>
        ))}
      </ol>
    </div>
  )
}
