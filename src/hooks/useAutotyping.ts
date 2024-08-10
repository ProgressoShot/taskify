'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const useAutotyping = (text: string) => {
  const [currentText, setCurrentText] = useState('')
  const timerIdRef = useRef<number | null>(null)
  const indexRef = useRef(0)

  const startTimer = useCallback(() => {
    // 타이머 설정
    timerIdRef.current = window.setTimeout(() => {
      const indexText = text[indexRef.current]
      setCurrentText(prev => prev + indexText)
      indexRef.current++

      if (indexRef.current < text.length) {
        startTimer()
      } else {
        timerIdRef.current = window.setTimeout(() => {
          removeText()
        }, 2000)
      }
    }, 200)
  }, [text])
  const removeText = useCallback(() => {
    setCurrentText(prev => prev.slice(0, -1))
    indexRef.current--

    if (indexRef.current === 0) {
      startTimer()
    } else {
      timerIdRef.current = window.setTimeout(() => {
        removeText()
      }, 100)
    }
  }, [startTimer])

  useEffect(() => {
    startTimer()

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerIdRef.current !== null) {
        clearTimeout(timerIdRef.current)
      }
    }
  }, [startTimer])

  return { currentText }
}

export default useAutotyping
