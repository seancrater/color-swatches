import { COLOR_API_BASE } from './constants'
import type { ColorSwatch, ColorSwatchAPIResponse } from '../types'

// This object will serve as a memory cache, in a real application I'd likely put this in a store somewhere
// or store it in the component's state but the idea is to prevent re-fetching data that we've already done
// server round trips to obtain

// For these, the key will be a string of the comma separated saturation & lightness values (e.g. `100,50`)
const existingSwatches: Record<string, ColorSwatch[]> = {}

const createExistingSwatchKey = (saturation: number, lightness: number) => `${saturation},${lightness}`
const getExistingSwatch = (saturation: number, lightness: number) => existingSwatches[createExistingSwatchKey(saturation, lightness)]

export async function fetchSwatches(saturation: number, lightness: number): Promise<ColorSwatch[]> {
  if (getExistingSwatch(saturation, lightness)) {
    return getExistingSwatch(saturation, lightness)
  }

  const requestUrls = []
  const seenColors = new Set()
  const uniqueColors: ColorSwatch[] = []

  // Iterate through hues starting at 0 and up to 360 in intervals of 5

  // The reason for "5" is that I spent a little time inspecting the results and it seems this was a good balance
  // to get a deterministic result from the endpoint while also not requesting "360" swatches for each change
  for (let hue = 0; hue < 360; hue += 5) {
    requestUrls.push(`${COLOR_API_BASE}?hsl=${hue},${saturation}%,${lightness}%&count=5&mode=analogic`)
  }

  // Dispatch 72 requests (360/5) for individual hues to spread the full spectrum
  await Promise.all(requestUrls.map(async (url: string) => {
    const response = await fetch(url)
    const swatchJSON = await response.json() as ColorSwatchAPIResponse

    // Sort through returned colors and set them uniquely into an object
    swatchJSON.colors.forEach((color: ColorSwatch) => {
      // Skip colors that are already set in the uniqueColors object
      if (seenColors.has(color.name.value)) {
        return
      }

      seenColors.add(color.name.value)
      uniqueColors.push(color)
    })
  }))

  // Sort the colors to ensure they're in order since sometimes the swatches overlap slightly causing misorders
  const sortedColors: ColorSwatch[] = uniqueColors.sort((a: ColorSwatch, b: ColorSwatch) =>
    (a.hsl.h - b.hsl.h) || (a.hsl.s - b.hsl.s) || (a.hsl.l - b.hsl.l)
  )

  const newSwatchKey = createExistingSwatchKey(saturation, lightness)
  existingSwatches[newSwatchKey] = sortedColors

  return sortedColors
}