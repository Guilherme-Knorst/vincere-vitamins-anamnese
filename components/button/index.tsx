import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
	small?: boolean
	isInputConfirm?: boolean
}
export default function Button({ small, isInputConfirm, ...props }: ButtonProps) {
	return (
		<div
			className={`transition-all duration-500 ease-in-out flex justify-center drop-shadow-[1px_1px_35px_rgba(27,233,205,0.25)] text-black bg-gradient-to-r from-primary to-secondary font-semibold uppercase chanfro-btn w-[250px] sm:w-[370px] ${
				small && 'chanfro-btn-answer w-[4rem] bg-black p-[1px]'
			}`}
			// ${isInputConfirm && 'chanfro-btn w-[150px]'}`}
		>
			<button
				className={`${
					small &&
					'chanfro-btn-answer bg-black w-full p-3 text-white text-center hover:text-black hover:bg-gradient-to-r hover:from-primary hover:to-secondary'
				}  w-full p-2 sm:p-4 disabled:bg-slate-500 tracking-wider text-base sm:text-2xl`}
				type='button'
				{...props}
			>
				{props.children}
			</button>
		</div>
	)
}
