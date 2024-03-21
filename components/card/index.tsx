import { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
	noChanfro?: boolean
	input?: boolean
}

function Card({ children, noChanfro, input }: CardProps) {
	return (
		<div
			className={`${
				!noChanfro && 'chanfro'
			} bg-clip-padding bg-gradient-to-r from-primary to-secondary p-[1px]`}
		>
			<div
				className={`${!noChanfro && 'chanfro'} ${
					input ? 'p-3' : 'pl-5 pr-5 pt-3 pb-3 sm:pl-9 sm:pr-9 sm:pt-6 sm:pb-8'
				} bg-black`}
			>
				{children}
			</div>
		</div>
	)
}

export { Card }
