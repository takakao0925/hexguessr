import { lazy, Suspense } from 'react'
import { useGame } from '../hooks/useGame'
import { ColorTarget } from './ColorTarget'
import { RGBInputForm } from './RGBInputForm'
import { GuessHistory } from './GuessHistory'
import { SuccessBanner } from './SuccessBanner'
import { ResultStats } from './ResultStats'

const ColorSpace3D = lazy(() =>
  import('./ColorSpace3D').then((m) => ({ default: m.ColorSpace3D })),
)

const MODE_LABEL = {
  oldChicken: '老雞模式',
  infinite: '無限逼近',
}

export function GameScreen({ mode, onExit }) {
  const { round, target, history, status, elapsed, submitGuess, nextLevel } = useGame(mode)

  const lastGuess = history[history.length - 1]
  const showSpace = mode === 'infinite' && status === 'playing' && history.length > 0
  const roundKey = `${mode}-${target.r}-${target.g}-${target.b}`

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
          <ResultStats guess={lastGuess} target={target} elapsed={elapsed} onNext={nextLevel} onHome={onExit}>
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
      </main>
    </div>
  )
}
