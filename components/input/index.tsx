import { ComponentProps } from 'react'
import { Card } from '../card'

interface InputProps extends ComponentProps<'input'> {
	placeholder?: string
}
export default function Input({ ...props }: InputProps) {
	return (
		<Card noChanfro input>
			<input className='bg-black focus:outline-none' type='text' {...props} />
		</Card>
	)
}