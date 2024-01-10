import { ComponentProps, PropsWithChildren } from 'react'
import { TypeElement } from 'typescript'

interface ButtonProps extends ComponentProps<'button'> {
	answer?: boolean
}
export default function Button({ answer, ...props }: ButtonProps) {
	return (
		<div
			className={`transition-all duration-500 ease-in-out flex justify-center drop-shadow-[1px_1px_35px_rgba(27,233,205,0.25)] text-black bg-gradient-to-r from-primary to-secondary font-semibold uppercase text-2xl ${
				answer ? 'chanfro-btn-answer w-[90px] bg-black p-[1px]' : 'chanfro-btn w-[370px] p-4'
			} tracking-wider`}
		>
			<div className={`${answer && 'chanfro-btn-answer bg-black w-full p-3 text-white text-center hover:text-black hover:bg-gradient-to-r hover:from-primary hover:to-secondary'}`}>
				<button
					type='button'
					{...props}
				>
					{props.children}
				</button>
			</div>
		</div>
	)
}
