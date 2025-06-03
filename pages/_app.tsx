import type { AppProps } from 'next/app'
import '../styles/global.css'
import 'tailwindcss/tailwind.css'
import localFont from 'next/font/local'
import RootLayout from '../components/layout'
import { QuestionProvider } from '../providers/QuestionProvider'
import { QuestionProviderWoman } from '../providers/QuestionProviderWoman'
import { TermsModalProvider } from '../providers/ModalProvider'
import Head from 'next/head';

export const purista = localFont({
	src: [
		{
			path: '../public/fonts/PURISTA/Purista.woff2',
		}
	],
	variable: '--font-purista'
})

export const ingra = localFont({
	src: [
		{
			path: '../public/fonts/INGRA/Ingra Medium.woff2'
		}
	],
	variable: '--font-ingra'
})

export const digital = localFont({
	src: [
		{
			path: '../public/fonts/aboa.ttf'
		}
	],
	variable: '--font-ingra'
})

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="icon" href="/fav.svg" />
			</Head>
			<RootLayout>
				<TermsModalProvider>
					<QuestionProvider>
						<QuestionProviderWoman>
							<Component {...pageProps} />
						</QuestionProviderWoman>
					</QuestionProvider>
				</TermsModalProvider>
			</RootLayout>
		</>
	)
}
