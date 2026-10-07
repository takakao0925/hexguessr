import { useState } from 'react'
import { MainMenu } from './components/MainMenu'
import { GameScreen } from './components/GameScreen'
import { track } from './utils/analytics'
import './App.css'

function App() {
  const [session, setSession] = useState(null) // null | { mode, nickname }

  if (!session) {
    return (
      <MainMenu
        onStart={(mode, nickname) => {
          track('game_start', { mode })
          setSession({ mode, nickname })
        }}
      />
    )
  }

  return (
    <GameScreen
      mode={session.mode}
      nickname={session.nickname}
      onExit={() => setSession(null)}
    />
  )
}

export default App
