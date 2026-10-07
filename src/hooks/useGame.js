import { useCallback, useEffect, useRef, useState } from 'react'
import { track } from '../utils/analytics'

function randomChannel() {
  return Math.floor(Math.random() * 256)
}

function randomColor() {
  return { r: randomChannel(), g: randomChannel(), b: randomChannel() }
}

export function useGame(mode) {
  const [round, setRound] = useState(1)
  const [target, setTarget] = useState(() => randomColor())
  const [history, setHistory] = useState([])
  const [status, setStatus] = useState('playing') // 'playing' | 'success' | 'result'
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => {
      setElapsed((Date.now() - startRef.current) / 1000)
    }, 100)
    return () => clearInterval(id)
  }, [status])

  const submitGuess = useCallback(
    (guess) => {
      if (status !== 'playing') return
      const correct =
        guess.r === target.r && guess.g === target.g && guess.b === target.b
      const finalElapsed = (Date.now() - startRef.current) / 1000

      setHistory((h) => [...h, { ...guess, correct }])

      const attempts = history.length + 1
      const stats = {
        mode,
        round,
        attempts,
        seconds: Math.round(finalElapsed),
      }

      if (mode === 'oldChicken') {
        track('game_result', { ...stats, correct })
        setElapsed(finalElapsed)
        setStatus('result')
        return
      }

      if (correct) {
        track('level_success', stats)
        setElapsed(finalElapsed)
        setStatus('success')
      }
    },
    [status, target, mode, history.length, round],
  )

  const nextLevel = useCallback(() => {
    setRound((r) => r + 1)
    setTarget(randomColor())
    setHistory([])
    setElapsed(0)
    startRef.current = Date.now()
    setStatus('playing')
  }, [])

  return { round, target, history, status, elapsed, submitGuess, nextLevel }
}
