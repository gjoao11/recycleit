import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { FC } from 'react'

import { AuthProvider } from '../contexts/AuthContext'

const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: any) => page)

  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  )
}
export default MyApp
