import { ReactNode } from 'react'
import Card from '../card'

interface ContentProps {
	content: ReactNode
	header?: ReactNode
}

// ${!display && 'invisible'}
export default function Content({content, header}: ContentProps) {
	return (
		<div className='transition-all duration-500 ease-in-out flex flex-col'>
			{header && (
				header
			)}
			<Card>{content}</Card>
		</div>
	)
}
