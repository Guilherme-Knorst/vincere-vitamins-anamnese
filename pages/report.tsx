import { useRouter } from 'next/router'
import ReportHeader from '../components/reportHeader'
import { useEffect, useState } from 'react'

export default function Report() {
	const router = useRouter()
	const [fade, setFade] = useState(true)

	const radius = 120 // Raio do círculo
	const strokeWidth = 10 // Largura da linha do círculo
	const normalizedRadius = radius - strokeWidth * 2;

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
			className={`pt-10 flex flex-col items-center gap-8 text-[12px] text-center transition-opacity ease-linear duration-1000 ${
				fade ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<ReportHeader />
			<div className='flex flex-wrap gap-16'>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/imunidade.svg' alt='energia' />
					<span>Imunidade</span>
				</div>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/intestino.svg' alt='energia' />
					<span>Intestino</span>
				</div>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/stress.svg' alt='energia' />
					<span>Stress</span>
				</div>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/foco.svg' alt='energia' />
					<span>Foco</span>
				</div>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/energia.svg' alt='energia' />
					<span>Energia</span>
				</div>
			</div>
			<div className='flex flex-wrap gap-16'>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/pele.svg' alt='energia' />
					<span>Pele</span>
				</div>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/cabelo-unhas.svg' alt='energia' />
					<span>Cabelo e Unhas</span>
				</div>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/memoria.svg' alt='energia' />
					<span>Memória</span>
				</div>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/libido.svg' alt='energia' />
					<span>Libido</span>
				</div>
				<div className='flex flex-col items-center max-w-[40px]'>
					<img src='/anamnese/svg/sono.svg' alt='stress' />
					<span>Sono</span>
				</div>
			</div>
			<div className='flex gap-20 w-[100%] items-center'>
				<img className='max-w-[24%]' src='/anamnese/img/corpo.jpg' alt='energia' />

				<div className='flex flex-col gap-3 text-lg text-right grow'>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Imunidade</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Intestino</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Stress</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Foco</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Energia</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Pele</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-7 w-[30%]'>Cabelo e Unhas</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Memória</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Libido</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='text-right pr-8 w-[30%]'>Sono</div>
						<div className='w-full h-4 overflow-hidden border border-solid border-[#0a5045]'>
							<div
								style={{ width: `${10}%` }}
								className='h-full bg-gradient-to-r from-primary to-secondary'
							></div>
						</div>
					</div>
				</div>

				<div className='flex flex-col justify-center ml-10'>
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
								stroke='#05f28c'
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
