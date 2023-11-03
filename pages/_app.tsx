import type { AppProps } from 'next/app'
import '../styles/global.css'
import 'tailwindcss/tailwind.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex min-h-screen items-center justify-between p-24 bg-black">
      <Component {...pageProps} />
    </main>
  )
}
