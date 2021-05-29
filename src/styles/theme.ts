import { extendTheme, ThemeOverride } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    pink: {
      '500': '#ED2786',
      '100': '#FEE6F2'
    },
    orange: {
      '500': '#FF5F2D'
    },
    gray: {
      '50': '#F9F9F9',
      '100': '#F6F6F6',
      '200': '#C4C4C4',
      '800': '#2C2C2C'
    },
    purple: {
      '800': '#491949'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: 'lg',
        fontWeight: 'normal'
      }
    },
    Button: {
      baseStyle: {
        color: 'white'
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
        main: {
          paddingTop: '80px'
        }
      }
    }
  }
} as ThemeOverride<unknown>)
