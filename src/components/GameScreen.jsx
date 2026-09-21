import { lazy, Suspense, useState } from 'react'
import { useGame } from '../hooks/useGame'
import { rgbDistance } from '../utils/color'
import { addRankingEntry, computeSetTotals } from '../utils/rankings'
import { ColorTarget } from './ColorTarget'
import { RGBInputForm } from './RGBInputForm'
import { GuessHistory } from './GuessHistory'
import { SuccessBanner } from './SuccessBanner'
import { ResultStats } from './ResultStats'
import { SetSummary } from './SetSummary'

const ColorSpace3D = lazy(() =>
  import('./ColorSpace3D').then((m) => ({ default: m.ColorSpace3D })),
)

const MODE_LABEL = {
  oldChicken: '老雞模式',
  infinite: '無限逼近',
}

const SET_SIZE = 10

export function GameScreen({ mode, nickname, onExit }) {
  const { round, target, history, status, elapsed, submitGuess, nextLevel } = useGame(mode)
  const [setResults, setSetResults] = useState([])
  const [setSummary, setSetSummary] = useState(null)

  const lastGuess = history[history.length - 1]
  const showSpace = mode === 'infinite' && status === 'playing' && history.length > 0
  const roundKey = `${mode}-${target.r}-${target.g}-${target.b}`
  const isLastInSet = setResults.length + 1 >= SET_SIZE

  const handleResultNext = () => {
    if (mode !== 'oldChicken' || !lastGuess) {
      nextLevel()
      return
    }

    const distance = rgbDistance(lastGuess, target)
    const updated = [...setResults, { distance, elapsed }]
    setSetResults(updated)

    if (updated.length >= SET_SIZE) {
      const totals = computeSetTotals(updated)
      const savedAt = Date.now()
      const rankings = addRankingEntry({ id: nickname, timestamp: savedAt, ...totals })
      setSetSummary({ totals, rankings, savedAt })
      return
    }

    nextLevel()
  }

  const handleContinueAfterSummary = () => {
    setSetResults([])
    setSetSummary(null)
    nextLevel()
  }

  return (
    <div className="app">
      <header className="app-header">
        <button type="button" className="home-button" onClick={onExit} aria-label="回主頁">
          ←
        </button>
        <h1>第 {round} 關</h1>
        <div className="timer">{elapsed.toFixed(1)}s</div>
      </header>

      <div className="mode-tag">{MODE_LABEL[mode]}</div>

      <main className="app-main">
        {mode === 'infinite' && status === 'playing' && <GuessHistory history={history} />}

        {setSummary ? (
          <SetSummary
            totals={setSummary.totals}
            rankings={setSummary.rankings}
            nickname={nickname}
            savedAt={setSummary.savedAt}
            onContinue={handleContinueAfterSummary}
            onHome={onExit}
          />
        ) : (
          <>
            <ColorTarget color={target} />

            {status === 'success' && (
              <SuccessBanner
                target={target}
                elapsed={elapsed}
                attempts={history.length}
                onNext={nextLevel}
                onHome={onExit}
              />
            )}

            {status === 'result' && lastGuess && (
              <ResultStats
                guess={lastGuess}
                target={target}
                elapsed={elapsed}
                onNext={handleResultNext}
                onHome={onExit}
                nextLabel={mode === 'oldChicken' && isLastInSet ? '查看總結算' : '下一關'}
              >
                <Suspense fallback={<div className="color-space-loading">載入 3D 場景中…</div>}>
                  <ColorSpace3D guess={lastGuess} target={target} />
                </Suspense>
              </ResultStats>
            )}

            {status === 'playing' && (
              <>
                <RGBInputForm key={roundKey} onSubmit={submitGuess} />
                {showSpace && lastGuess && (
                  <Suspense fallback={<div className="color-space-loading">載入 3D 場景中…</div>}>
                    <ColorSpace3D guess={lastGuess} target={target} />
                  </Suspense>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
