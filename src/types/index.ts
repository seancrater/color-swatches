export interface ColorSwatch {
  hex: {
    clean: string
    value: string
  }
  hsl: {
    h: number
    s: number
    l: number
    value: string
  }
  name: {
    closest_named_hex: string
    distance: number
    exact_match_name: boolean
    value: string
  }
}

export interface ColorSwatchAPIResponse {
  colors: ColorSwatch[]
  count: string
}