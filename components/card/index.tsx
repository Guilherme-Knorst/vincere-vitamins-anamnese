import { PropsWithChildren } from 'react'

function Card({ children }: PropsWithChildren) {
	return (
		<div className='chanfro grow bg-clip-padding bg-gradient-to-r from-primary to-secondary flex justify-center items-stretch p-[1px]'>
			<div className='chanfro pl-9 pt-6 pr-10 pb-8 bg-black'>{children}</div>
		</div>
	)
}

// Subcomponente Header
Card.Header = ({ children }: PropsWithChildren) => {
	return <div className='card-header'>{children}</div>
}

// Subcomponente Content
Card.Content = ({ children }: PropsWithChildren) => {
	return <div className='card-content'>{children}</div>
}

export default Card
