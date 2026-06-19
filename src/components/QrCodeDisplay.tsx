'use client'

import { useEffect, useRef, useCallback } from 'react'
import QRCode from 'qrcode'

type QrCodeDisplayProps = {
  text: string
  fgColor: string
  bgColor: string
  onCanvasReady: (canvas: HTMLCanvasElement) => void
}

export default function QrCodeDisplay({
  text,
  fgColor,
  bgColor,
  onCanvasReady,
}: QrCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const generateQR = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas || !text.trim()) return

    try {
      await QRCode.toCanvas(canvas, text.trim(), {
        width: 400,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      })
      onCanvasReady(canvas)
    } catch (error) {
      console.error('QR Code generation failed:', error)
    }
  }, [text, fgColor, bgColor, onCanvasReady])

  useEffect(() => {
    generateQR()
  }, [generateQR])

  // Handle resize
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      generateQR()
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [generateQR])

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full"
        aria-label="Generated QR code"
      />
    </div>
  )
}
