import QRCode from 'qrcode'

export type QRCodeOptions = {
  width?: number
  margin?: number
  color?: {
    dark?: string
    light?: string
  }
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  type?: 'image/png' | 'image/jpeg' | 'image/webp'
  quality?: number
}

const DEFAULT_OPTIONS: QRCodeOptions = {
  width: 400,
  margin: 2,
  color: {
    dark: '#0F172A',
    light: '#FFFFFF',
  },
  errorCorrectionLevel: 'M',
  type: 'image/png',
  quality: 1.0,
}

/**
 * Generate QR code to canvas
 */
export async function generateQRToCanvas(
  text: string,
  options: QRCodeOptions = {}
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas')
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    color: {
      ...DEFAULT_OPTIONS.color,
      ...options.color,
    },
  }

  await QRCode.toCanvas(canvas, text, mergedOptions)
  return canvas
}

/**
 * Generate QR code to data URL
 */
export async function generateQRToDataURL(
  text: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    color: {
      ...DEFAULT_OPTIONS.color,
      ...options.color,
    },
  } as QRCode.QRCodeToDataURLOptions

  return QRCode.toDataURL(text, mergedOptions)
}

/**
 * Generate QR code to SVG string
 */
export async function generateQRToSVG(
  text: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    color: {
      ...DEFAULT_OPTIONS.color,
      ...options.color,
    },
  } as QRCode.QRCodeToStringOptions

  return QRCode.toString(text, { ...mergedOptions, type: 'svg' })
}

/**
 * Validate if text is a valid URL (optional helper)
 */
export function isValidURL(text: string): boolean {
  try {
    new URL(text)
    return true
  } catch {
    return false
  }
}

/**
 * Get optimal error correction level based on text length
 */
export function getOptimalErrorCorrectionLevel(
  textLength: number
): 'L' | 'M' | 'Q' | 'H' {
  if (textLength < 50) return 'H'
  if (textLength < 200) return 'Q'
  if (textLength < 500) return 'M'
  return 'L'
}

export default QRCode
