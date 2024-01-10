import { purista } from '../../pages/_app'
interface HeaderProps {}

export default function Header({}: HeaderProps) {
	return (
		<div className='z-0 flex flex-col items-center pb-4 gap-3'>
			<div className='flex flex-col items-center relative'>
				<img className='w-[230px]' src='/anamnese/img/logo/Eleven 01.png' alt=''/>
				<img className='w-[100px] absolute bottom-0' src='/anamnese/img/logo/bio-white.png' alt=''/>
			</div>
			<h1 className={`text-[3.5rem] bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text font-black ${purista.className}`}>CYBER ANAMNESE</h1>
		</div>
	)
}
