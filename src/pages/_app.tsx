import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../contexts/AuthContext'
import { PositionProvider } from '../contexts/PositionContext'

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: any) => page)

  return (
    <AuthProvider>
      <PositionProvider>
        {getLayout(<Component {...pageProps} />)}
      </PositionProvider>
    </AuthProvider>
  )
}
export default MyApp
