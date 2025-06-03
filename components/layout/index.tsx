import { PropsWithChildren } from 'react'
import { purista } from '../../pages/_app'
import Head from 'next/head'
import PageContainer from '../pageContainer'

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<main
			// className={`bg-cover bg-center bg-[url('/img/backgrounds/mobile.jpg')] lg:bg-[url('/img/backgrounds/notebook.jpg')] 2xl:bg-[url('/img/backgrounds/desktop.jpg')] min-[1921px]:bg-[url('/img/backgrounds/ultrawide.jpg')] ${purista.className} `}
			className={`${purista.className} bg-black`}
		>
			{/* <MatrixBackground /> */}
			<PageContainer>{children}</PageContainer>
		</main>
	)
} 

export default RootLayout
