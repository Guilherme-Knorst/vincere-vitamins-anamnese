import { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren{
	noChanfro?: boolean
	input?: boolean
}

function Card({ children, noChanfro, input }: CardProps) {
	return (
		<div className={`${!noChanfro && 'chanfro'} bg-clip-padding bg-gradient-to-r from-primary to-secondary p-[1px]`}>
			<div className={`${!noChanfro && 'chanfro'} ${input ? 'p-3' : 'pl-9 pt-6 pr-10 pb-8'} bg-black`}>{children}</div>
		</div>
	)
}

export { Card }