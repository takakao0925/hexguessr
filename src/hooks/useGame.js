import { useCallback, useEffect, useRef, useState } from 'react'
import { MAX_RGB_DISTANCE, rgbDistance } from '../utils/color'
import { trackEvent } from '../utils/analytics'

const ONE_SHOT_CORRECT_ERROR_RATIO = 0.3

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

      if (mode === 'oldChicken') {
        setElapsed(finalElapsed)
        setStatus('result')
        trackEvent('game_result', {
          mode,
          round,
          attempts: 1,
          seconds: Math.round(finalElapsed),
          correct: rgbDistance(guess, target) / MAX_RGB_DISTANCE < ONE_SHOT_CORRECT_ERROR_RATIO,
        })
        return
      }

      if (correct) {
        setElapsed(finalElapsed)
        setStatus('success')
        trackEvent('level_success', {
          mode,
          round,
          attempts: history.length + 1,
          seconds: Math.round(finalElapsed),
        })
      }
    },
    [status, target, mode, round, history.length],
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
