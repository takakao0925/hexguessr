import { useState } from 'react'
import { MainMenu } from './components/MainMenu'
import { GameScreen } from './components/GameScreen'
import './App.css'

function App() {
  const [mode, setMode] = useState(null) // null | 'oldChicken' | 'infinite'

  if (!mode) {
    return <MainMenu onSelectMode={setMode} />
  }

  return <GameScreen mode={mode} onExit={() => setMode(null)} />
}

export default App
