import { purista } from '../../pages/_app'
interface HeaderProps {}

export default function ReportHeader({}: HeaderProps) {
	return (
		<div className='z-0 flex flex-col items-center gap-5'>
			<div className='flex flex-col items-center relative'>
				<img
					className='w-[147px] sm:w-[130px]'
					src='/anamnese/img/eleven-text.png'
					alt=''
				/>
				<img
					className='w-[64px] sm:w-[60px] absolute bottom-0'
					src='/anamnese/img/bio-text.png'
					alt=''
				/>
			</div>
			<h1
				className={`text-[1.8rem] sm:text-[2rem] bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text font-black ${purista.className}`}
			>
				CYBER DE AUTO ANÁLISE
			</h1>
		</div>
	)
}
