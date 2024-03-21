import { purista } from '../../pages/_app'
interface HeaderProps {
	text: string
}

export default function Header({ text }: HeaderProps) {
	return (
		<div className='z-0 flex flex-col items-center gap-5'>
			<div className='flex flex-col items-center relative'>
				<img
					className='w-[8rem] sm:w-[16rem]'
					src='/anamnese/img/eleven-text.png'
					alt=''
				/>
				<img
					className='w-[3.8rem] sm:w-[8rem] absolute bottom-0'
					src='/anamnese/img/bio-text.png'
					alt=''
				/>
			</div>
			<h1
				className={`text-[1.7rem] leading-8 sm:text-[3.5rem] bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text font-black ${purista.className}`}
			>
				{text}
			</h1>
		</div>
	)
}
