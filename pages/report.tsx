import { useRouter } from 'next/router'
import ReportHeader from '../components/reportHeader'
import { useEffect, useState } from 'react'
import Header from '../components/header'

export default function Report() {
	const router = useRouter()
	const [fade, setFade] = useState(true)

	const radius = 120 // Raio do círculo
	const strokeWidth = 10 // Largura da linha do círculo
	const normalizedRadius = radius - strokeWidth * 2

	const circumference = normalizedRadius * 2 * Math.PI
	const strokeDashoffset = (2 / 10) * circumference

	// Ajuste para iniciar do topo
	const rotation = 90
	const center = radius

	useEffect(() => {
		setFade(false)
	}, [])

	return (
		<div
			className={`pt-5 flex flex-col gap-10 transition-opacity ease-linear duration-1000 text-xs text-center m-auto max-w-[90%] ${
				fade ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<Header text='CYBER DE AUTO ANÁLISE' />
			<div className='flex flex-wrap justify-center gap-5'>
				<div className='flex flex-col items-center bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 w-[29%]'>
					<img src='/anamnese/svg/imunidade.svg' alt='energia' className='w-[2.5rem]' />
					<span>Imunidade</span>
				</div>
				<div className='flex flex-col items-center  bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 p-3 w-[29%]'>
					<img src='/anamnese/svg/intestino.svg' alt='energia' className='w-[2.5rem]' />
					<span>Intestino</span>
				</div>
				<div className='flex flex-col items-center  bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 p-3 w-[29%]'>
					<img src='/anamnese/svg/stress.svg' alt='energia' className='w-[2.5rem]' />
					<span>Stress</span>
				</div>
				<div className='flex flex-col items-center  bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 w-[29%]'>
					<img src='/anamnese/svg/foco.svg' alt='energia' className='w-[2.5rem]' />
					<span>Foco</span>
				</div>
				<div className='flex flex-col items-center bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 w-[29%]'>
					<img src='/anamnese/svg/energia.svg' alt='energia' className='w-[2.5rem]' />
					<span>Energia</span>
				</div>
				<div className='flex flex-col items-center bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 w-[29%]'>
					<img src='/anamnese/svg/pele.svg' alt='energia' className='w-[2.5rem]' />
					<span>Pele</span>
				</div>
				<div className='flex flex-col items-center bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 p-3 w-[29%]'>
					<img
						src='/anamnese/svg/cabelo-unhas.svg'
						alt='energia'
						className='w-[2.5rem]'
					/>
					<div className='w-[110%]'>Cabelo e Unhas</div>
				</div>
				<div className='flex flex-col items-center  bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 w-[29%]'>
					<img src='/anamnese/svg/memoria.svg' alt='energia' className='w-[2.5rem]' />
					<span>Memória</span>
				</div>
				<div className='flex flex-col items-center  bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 w-[29%]'>
					<img src='/anamnese/svg/libido.svg' alt='energia' className='w-[2.5rem]' />
					<span>Libido</span>
				</div>
				<div className='flex flex-col items-center bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-3 w-[29%]'>
					<img src='/anamnese/svg/sono.svg' alt='stress' className='w-[2.5rem]' />
					<span>Sono</span>
				</div>
			</div>

			<div className='flex flex-col'>
				<img className='' src='/anamnese/img/corpo.jpg' alt='energia' />

				<div className='flex flex-col gap-3 text-lg text-right'>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Imunidade</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Intestino</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Stress</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Foco</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Energia</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Pele</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Cabelo e Unhas</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Memória</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Libido</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-6 w-[80%]'>Sono</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
				</div>

				<div className='flex flex-col justify-center pt-14'>
					<span className='text-[20px]'>Pontuação Total</span>
					<div className='relative flex items-center justify-center h-[250px]'>
						<svg
							height={radius * 2}
							width={radius * 2}
							className='absolute'
							style={{ transform: `rotate(-${rotation}deg)` }}
						>
							<circle
								stroke='gray'
								fill='transparent'
								strokeWidth={strokeWidth}
								strokeDasharray={circumference + ' ' + circumference}
								style={{ strokeDashoffset }}
								r={normalizedRadius}
								cx={center}
								cy={center}
							/>
							<circle
								stroke='#12ECB3'
								fill='transparent'
								strokeWidth={strokeWidth}
								strokeDasharray={circumference + ' ' + circumference}
								style={{ strokeDashoffset }}
								r={normalizedRadius}
								cx={center}
								cy={center}
								className='transition-all ease-out duration-500'
							/>
						</svg>
						<span className='text-[55px] font-semibold pb-5'>{24}%</span>
					</div>
				</div>
			</div>
		</div>
	)
}
