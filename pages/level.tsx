import { useRouter } from 'next/router'
import Button from '../components/button'
import { useEffect, useState } from 'react'

export default function Level() {
	const router = useRouter()
	const [fade, setFade] = useState(true)

	useEffect(() => {
		setFade(false)
	}, [])

	return (
		<div
			className={`flex flex-col items-center transition-opacity ease-linear duration-1000	flex flex-col items-center gap-10 min-[835px]:justify-center min-h-screen ${
				fade ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<img src='/anamnese/img/notas.png' alt='' className='max-w-[600px]' />
			<Button
				onClick={() => {
					setFade(true)
					setTimeout(() => router.push('/report'), 1000)
				}}
			>
				Continuar
			</Button>
		</div>
	)
}
