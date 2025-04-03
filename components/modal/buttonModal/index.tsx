import { ComponentProps } from "react"

interface ButtonModalProps extends ComponentProps<'button'> {}

export default function ButtonModal({...props }: ButtonModalProps) {
	return (
		<div
			className={`transition-all duration-500 ease-in-out flex justify-center drop-shadow-[1px_1px_35px_rgba(27,233,205,0.25)] bg-black font-semibold uppercase chanfro-btn w-[140px] sm:w-[240px]`}
		>
			<button
				className={`w-full text-white p-3 sm:p-6 disabled:bg-slate-500 tracking-wider text-base sm:text-xl`}
				type='button'
				{...props}
			>
				{props.children}
			</button>
		</div>
	)
}
