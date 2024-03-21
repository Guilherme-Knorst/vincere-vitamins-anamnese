import React, { ComponentProps } from 'react'
import { Card } from '../card'

interface InputProps extends ComponentProps<'input'> {
	placeholder?: string
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }: InputProps, ref) => {
	return (
		<Card noChanfro input>
			<input ref={ref} className='bg-black focus:outline-none' type='text' {...props} />
		</Card>
	)
})
export default Input
