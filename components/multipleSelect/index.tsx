import { ChangeEvent, ComponentProps } from 'react'
import { CheckBoxOption } from '../../providers/QuestionProvider'

interface MultipleSelectProps extends ComponentProps<'input'> {
	options: Array<CheckBoxOption>
}

export default function MultipleSelect({ options, ...props }: MultipleSelectProps) {

	return (
		<div className='flex flex-col gap-2'>
			{options.map((o) => (
				<div key={o.name} className='flex items-center gap-4'>
					<label className='w-7 h-7 border border-white rounded-sm flex items-center justify-center mr-2 cursor-pointer mt-1'>
						<input
							type='checkbox'
							checked={o.isChecked}
							className='hidden peer'
							name={o.name}
							{...props}
						/>
						<div className='w-5 h-5 bg-primary rounded-sm hidden peer-checked:block'></div>
					</label>
					<span className='text-gray-300'>{o.name}</span>
				</div>
			))}
		</div>
	)
}