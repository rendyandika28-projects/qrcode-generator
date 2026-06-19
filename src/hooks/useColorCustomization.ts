'use client'

import { useState, useCallback } from 'react'

type UseColorCustomizationReturn = {
  fgColor: string
  bgColor: string
  setForegroundColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  resetColors: () => void
  isValidColor: (color: string) => boolean
}

const DEFAULT_FG = '#0F172A'
const DEFAULT_BG = '#FFFFFF'

const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/

export function useColorCustomization(
  initialFg?: string,
  initialBg?: string
): UseColorCustomizationReturn {
  const [fgColor, setFgColor] = useState<string>(initialFg || DEFAULT_FG)
  const [bgColor, setBgColor] = useState<string>(initialBg || DEFAULT_BG)

  const isValidColor = useCallback((color: string): boolean => {
    return HEX_COLOR_REGEX.test(color)
  }, [])

  const setForegroundColor = useCallback(
    (color: string) => {
      if (isValidColor(color)) {
        setFgColor(color)
      }
    },
    [isValidColor]
  )

  const setBackgroundColor = useCallback(
    (color: string) => {
      if (isValidColor(color)) {
        setBgColor(color)
      }
    },
    [isValidColor]
  )

  const resetColors = useCallback(() => {
    setFgColor(DEFAULT_FG)
    setBgColor(DEFAULT_BG)
  }, [])

  return {
    fgColor,
    bgColor,
    setForegroundColor,
    setBackgroundColor,
    resetColors,
    isValidColor,
  }
}

// Named export juga untuk fleksibilitas
export { DEFAULT_FG, DEFAULT_BG }
