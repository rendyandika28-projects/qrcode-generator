'use client'

import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

type DownloadButtonProps = {
  canvasRef: HTMLCanvasElement | null
  fileName: string
}

export default function DownloadButton({ canvasRef, fileName }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    if (!canvasRef) {
      toast.error('QR code belum tersedia. Silakan generate terlebih dahulu.')
      return
    }

    setIsDownloading(true)

    try {
      // Create a temporary link element
      const link = document.createElement('a')
      link.download = `${fileName}.png`
      link.href = canvasRef.toDataURL('image/png', 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success('QR code berhasil di-download!')
    } catch (error) {
      console.error('Download failed:', error)
      toast.error('Gagal mendownload QR code. Silakan coba lagi.')
    } finally {
      setIsDownloading(false)
    }
  }, [canvasRef, fileName])

  const handleCopy = useCallback(async () => {
    if (!canvasRef) {
      toast.error('QR code belum tersedia.')
      return
    }

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvasRef.toBlob((b) => resolve(b), 'image/png', 1.0)
      )
      if (!blob) {
        toast.error('Gagal mengkonversi QR code.')
        return
      }

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
      toast.success('QR code berhasil di-copy ke clipboard!')
    } catch (error) {
      console.error('Copy to clipboard failed:', error)
      toast.error('Browser tidak mendukung copy gambar. Silakan download.')
    }
  }, [canvasRef])

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
      <button
        onClick={handleDownload}
        disabled={isDownloading || !canvasRef}
        className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
      >
        {isDownloading ? (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        )}
        {isDownloading ? 'Menyiapkan...' : 'Download PNG'}
      </button>

      <button
        onClick={handleCopy}
        disabled={!canvasRef}
        className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        Copy ke Clipboard
      </button>
    </div>
  )
}
