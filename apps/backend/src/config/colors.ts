export const colors = {
  red: {
    label: 'Red',
    value: 'red',
    hex: '#f37259',
    cssVar: '--red',
  },
  red50: {
    label: 'Red 50',
    value: 'red-50',
    hex: '#f79980',
    cssVar: '--red-50',
  },
  red20: {
    label: 'Red 20',
    value: 'red-20',
    hex: '#f2e0e0',
    cssVar: '--red-20',
  },
  yellow: {
    label: 'Yellow',
    value: 'yellow',
    hex: '#ffcb05',
    cssVar: '--yellow',
  },
  yellowLight: {
    label: 'Light Yellow',
    value: 'yellow-light',
    hex: '#efed86',
    cssVar: '--light-yellow',
  },
  blue: {
    label: 'Blue',
    value: 'blue',
    hex: '#739dd2',
    cssVar: '--blue',
  },
  darkBlue: {
    label: 'Dark Blue',
    value: 'dark-blue',
    hex: '#004263',
    cssVar: '--dark-blue',
  },
  lightBlue: {
    label: 'Light Blue',
    value: 'light-blue',
    hex: '#7cccbf',
    cssVar: '--light-blue',
  },
  petrol: {
    label: 'Petrol',
    value: 'petrol',
    hex: '#0f8a81',
    cssVar: '--petrol',
  },
  petrol15: {
    label: 'Petrol 15',
    value: 'petrol-15',
    hex: '#e0eae7',
    cssVar: '--petrol-15',
  },
  green: {
    label: 'Dark Green',
    value: 'dark-green',
    hex: '#44a13f',
    cssVar: '--dark-green',
  },
  lightGreen: {
    label: 'Light Green',
    value: 'light-green',
    hex: '#bfd100',
    cssVar: '--light-green',
  },
  blueGreen: {
    label: 'Blue Green',
    value: 'blue-green',
    hex: '#82ca9c',
    cssVar: '--blue-green',
  },
  ochre: {
    label: 'Ochre',
    value: 'ochre',
    hex: '#a28b49',
    cssVar: '--ochre',
  },
  ochre15: {
    label: 'Ochre 15',
    value: 'ochre-15',
    hex: '#e0eae7',
    cssVar: '--ochre-15',
  },
  white: {
    label: 'White',
    value: 'white',
    hex: '#ffffff',
    cssVar: '--white',
  },
  black: {
    label: 'Black',
    value: 'black',
    hex: '#000000',
    cssVar: '--black',
  },
} as const

// Helper types
export type ColorKey = keyof typeof colors
export type ExtendedColorKey = (typeof colors)[keyof typeof colors]['value']

// Helper functions
export const getAllColorValues = () => {
  return Object.values(colors).map((color) => color.value)
}

// Generate Tailwind safelist
export const generateSafelist = () => {
  const colorValues = getAllColorValues()
  const prefixes = ['text', 'bg', 'border', 'hover:text', 'group-hover:text']
  return colorValues.flatMap((color) => prefixes.map((prefix) => `${prefix}-${color}`))
}

// Generate color options for select fields
export const getColorSelectOptions = () => {
  return Object.values(colors).map((color) => ({
    label: color.label,
    value: color.value,
  }))
}

// Generate CSS variables
export const generateCSSVariables = () => {
  const variables: Record<string, string> = {}
  Object.values(colors).forEach((color) => {
    variables[color.cssVar] = color.hex
  })
  return variables
}
