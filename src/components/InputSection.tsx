'use client'

import { useCallback, useEffect, useRef } from 'react'

type InputSectionProps = {
  text: string
  onChange: (value: string) => void
}

export default function InputSection({ text, onChange }: InputSectionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const handleClear = useCallback(() => {
    onChange('')
    textareaRef.current?.focus()
  }, [onChange])

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [text])

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        placeholder="Masukkan teks atau URL di sini..."
        rows={3}
        className="w-full resize-none rounded-xl border border-border bg-muted/50 px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        aria-label="Text input for QR code generation"
      />
      {text && (
        <button
          onClick={handleClear}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
          aria-label="Clear input"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
