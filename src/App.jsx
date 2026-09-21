import { useState } from 'react'
import { MainMenu } from './components/MainMenu'
import { GameScreen } from './components/GameScreen'
import './App.css'

function App() {
  const [session, setSession] = useState(null) // null | { mode, nickname }

  if (!session) {
    return <MainMenu onStart={(mode, nickname) => setSession({ mode, nickname })} />
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
