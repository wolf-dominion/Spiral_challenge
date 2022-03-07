import '../styles/globals.css'
import { ThirstyProvider } from '../context/main-data';

function MyApp({ Component, pageProps }) {
  return (
    <ThirstyProvider>
      <Component {...pageProps} />
    </ThirstyProvider>
  )
}

export default MyApp
