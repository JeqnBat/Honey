import '../styles/style.css'
import { StoreProvider, createStore } from 'easy-peasy'
import globalState from '../lib/globalState.js'

const Honey = ({ Component, pageProps }) => {
  // Create store from globalState object
  const appState = createStore(globalState)

  return (
    // Wrap entire app with global state so its accessible everywhere
    <StoreProvider store={appState}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default Honey
