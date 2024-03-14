import { PropsWithChildren } from 'react'
import { purista } from '../../pages/_app'
import Head from 'next/head'
import MatrixBackground from '../matrixBackground'
import PageContainer from '../pageContainer'

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<main
			className={`min-h-screen bg-cover bg-center bg-[url('/anamnese/img/backgrounds/mobile.jpg')] min-[900px]:bg-[url('/anamnese/img/backgrounds/desktop.jpg')] min-[1441px]:bg-[url('/anamnese/img/backgrounds/desktop.jpg')] min-[1921px]:bg-[url('/anamnese/img/backgrounds/ultrawide.jpg')] ${purista.className}`}
		>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap'
					rel='stylesheet'
				/>
			</Head>
			{/* <MatrixBackground /> */}
			<PageContainer>{children}</PageContainer>
		</main>
	)
}

export default RootLayout
