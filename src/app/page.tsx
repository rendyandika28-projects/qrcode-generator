'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
import InputSection from '@/components/InputSection'
import ColorPicker from '@/components/ColorPicker'
import DownloadButton from '@/components/DownloadButton'

const QrCodeDisplay = dynamic(() => import('@/components/QrCodeDisplay'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-64 h-64 bg-muted rounded-2xl animate-pulse">
      <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    </div>
  ),
})

export default function HomePage() {
  const [text, setText] = useState('https://example.com')
  const [fgColor, setFgColor] = useState('#0F172A')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [qrCanvasRef, setQrCanvasRef] = useState<HTMLCanvasElement | null>(null)

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    setQrCanvasRef(canvas)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12 sm:py-16 lg:py-20">
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />

      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7zm2-9v3h3V5H5zm11 0v3h3V5h-3zM5 16v3h3v-3H5zm11 0v3h3v-3h-3z"/>
          </svg>
          Gratis · Tanpa Watermark · Unlimited
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            QR Code Generator
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Buat QR code kustom dengan warna favoritmu. Langsung di browser, tanpa ribet.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Inner decoration */}
        <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
        
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Input Section */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Masukkan Teks / URL
            </h2>
            <InputSection text={text} onChange={setText} />
          </section>

          {/* QR Code Display */}
          <section className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300" />
              <QrCodeDisplay
                text={text}
                fgColor={fgColor}
                bgColor={bgColor}
                onCanvasReady={handleCanvasReady}
              />
            </div>
            <p className="text-sm text-muted-foreground">QR code akan terupdate otomatis</p>
          </section>

          {/* Color Customization */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Kustomisasi Warna
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPicker
                label="Warna Foreground (QR)"
                value={fgColor}
                onChange={setFgColor}
              />
              <ColorPicker
                label="Warna Background"
                value={bgColor}
                onChange={setBgColor}
              />
            </div>
          </section>

          {/* Download Button */}
          <section className="flex flex-col items-center pt-4">
            <DownloadButton canvasRef={qrCanvasRef} fileName={`qrcode-${Date.now()}`} />
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>Dibuat dengan ❤️ menggunakan Next.js & qrcode.js</p>
      </footer>
    </main>
  )
}
