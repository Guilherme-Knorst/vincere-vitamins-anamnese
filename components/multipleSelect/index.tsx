import { ComponentProps } from 'react'

interface MultipleSelectProps extends ComponentProps<'input'> {
	options: Array<string>
}
export default function MultipleSelect({ options }: MultipleSelectProps) {
	return (
		<div className='flex flex-col gap-2'>
			{options.map((o) => (
				<div className='flex items-center gap-4'>
					<label className='w-7 h-7 border border-white rounded-sm flex items-center justify-center mr-2 cursor-pointer mt-1'>
						<input
							id={o}
							type='radio'
							className='hidden peer'
							name='radio-options'
							value='psoriase'
						/>
						<div className='w-5 h-5 bg-primary rounded-sm hidden peer-checked:block'></div>
					</label>
					<span className='text-gray-300'>{o}</span>
				</div>
			))}
		</div>
	)
}
