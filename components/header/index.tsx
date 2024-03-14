import { purista } from '../../pages/_app'
interface HeaderProps {}

export default function Header({}: HeaderProps) {
	return (
		<div className='z-0 flex flex-col items-center gap-5'>
			<div className='flex flex-col items-center relative'>
				<img className='w-[184px] min-[835px]:w-[230px]' src='/anamnese/img/eleven-text.png' alt='' />
				<img className='w-[80px] min-[835px]:w-[100px] absolute bottom-0' src='/anamnese/img/bio-text.png' alt='' />
			</div>
			<h1
				className={`text-[2rem] min-[835px]:text-[3.5rem] bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text font-black ${purista.className}`}
			>
				CYBER ANAMNESE
			</h1>
		</div>
	)
}
