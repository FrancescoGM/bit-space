import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Header } from '../components/Header'
import { PlayerProvider } from '../context/PlayerContext'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <PlayerProvider>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </PlayerProvider>
    </ChakraProvider>
  )
}

export default MyApp
