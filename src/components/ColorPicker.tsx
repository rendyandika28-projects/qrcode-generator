'use client'

import { useCallback, useRef } from 'react'

type ColorPickerProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

const PRESET_COLORS: string[] = [
  '#0F172A', // Dark Navy
  '#7C3AED', // Purple
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#06B6D4', // Cyan
]

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const handlePresetClick = useCallback(
    (color: string) => {
      onChange(color)
    },
    [onChange]
  )

  const handleNativeClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-muted-foreground">
        {label}
      </label>

      {/* Preset colors */}
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => handlePresetClick(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg ${
              value === color
                ? 'border-foreground scale-110 shadow-md ring-2 ring-primary/30'
                : 'border-border'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
            title={color}
          />
        ))}

        {/* Custom color picker */}
        <button
          onClick={handleNativeClick}
          className="w-8 h-8 rounded-full border-2 border-dashed border-border hover:border-primary transition-colors flex items-center justify-center text-muted-foreground hover:text-primary"
          aria-label="Open color picker"
          title="Custom color"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>

        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={handleColorChange}
          className="sr-only"
          aria-label={`Custom color picker for ${label}`}
        />
      </div>

      {/* Current color preview */}
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-md border border-border"
          style={{ backgroundColor: value }}
        />
        <code className="text-xs font-mono text-muted-foreground">{value}</code>
      </div>
    </div>
  )
}
