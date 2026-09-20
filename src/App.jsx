import { lazy, Suspense } from 'react'
import { useGame } from './hooks/useGame'
import { ColorTarget } from './components/ColorTarget'
import { RGBInputForm } from './components/RGBInputForm'
import { GuessHistory } from './components/GuessHistory'
import { SuccessBanner } from './components/SuccessBanner'
import './App.css'

const ColorSpace3D = lazy(() =>
  import('./components/ColorSpace3D').then((m) => ({ default: m.ColorSpace3D })),
)

function App() {
  const { round, target, history, status, elapsed, submitGuess, nextLevel } = useGame()

  const lastGuess = history[history.length - 1]
  const showSpace = status === 'playing' && history.length > 0
  const roundKey = `${target.r}-${target.g}-${target.b}`

  return (
    <div className="app">
      <header className="app-header">
        <h1>第 {round} 關</h1>
        <div className="timer">{elapsed.toFixed(1)}s</div>
      </header>

      <main className="app-main">
        {status === 'playing' && <GuessHistory history={history} />}

        <ColorTarget color={target} />

        {status === 'success' ? (
          <SuccessBanner elapsed={elapsed} attempts={history.length} onNext={nextLevel} />
        ) : (
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

export default App
