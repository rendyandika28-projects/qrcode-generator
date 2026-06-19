/**
 * Download QR code canvas as PNG image
 */
export function downloadCanvasAsPNG(
  canvas: HTMLCanvasElement,
  fileName: string = 'qrcode'
): void {
  const link = document.createElement('a')
  link.download = `${fileName}.png`
  link.href = canvas.toDataURL('image/png', 1.0)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Download QR code canvas as JPEG image
 */
export function downloadCanvasAsJPEG(
  canvas: HTMLCanvasElement,
  fileName: string = 'qrcode',
  quality: number = 0.92
): void {
  const link = document.createElement('a')
  link.download = `${fileName}.jpg`
  link.href = canvas.toDataURL('image/jpeg', quality)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Download QR code canvas as WebP image
 */
export function downloadCanvasAsWebP(
  canvas: HTMLCanvasElement,
  fileName: string = 'qrcode',
  quality: number = 0.9
): void {
  const link = document.createElement('a')
  link.download = `${fileName}.webp`
  link.href = canvas.toDataURL('image/webp', quality)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Copy canvas image to clipboard
 */
export async function copyCanvasToClipboard(
  canvas: HTMLCanvasElement
): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error('Failed to convert canvas to blob'))
        return
      }

      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ])
        resolve()
      } catch (error) {
        reject(error)
      }
    }, 'image/png', 1.0)
  })
}

/**
 * Get all download methods in one object
 */
export const QrCodeDownloader = {
  asPNG: downloadCanvasAsPNG,
  asJPEG: downloadCanvasAsJPEG,
  asWebP: downloadCanvasAsWebP,
  copyToClipboard: copyCanvasToClipboard,
}
