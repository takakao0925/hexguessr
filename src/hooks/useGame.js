import { useCallback, useEffect, useRef, useState } from 'react'

function randomChannel() {
  return Math.floor(Math.random() * 256)
}

function randomColor() {
  return { r: randomChannel(), g: randomChannel(), b: randomChannel() }
}

export function useGame() {
  const [round, setRound] = useState(1)
  const [target, setTarget] = useState(() => randomColor())
  const [history, setHistory] = useState([])
  const [status, setStatus] = useState('playing') // 'playing' | 'success'
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

      setHistory((h) => [...h, { ...guess, correct }])

      if (correct) {
        setElapsed((Date.now() - startRef.current) / 1000)
        setStatus('success')
      }
    },
    [status, target],
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
