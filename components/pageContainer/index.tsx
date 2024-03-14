import { PropsWithChildren } from 'react'
export default function PageContainer(props: PropsWithChildren) {
	return (
		<div className='w-[90%] min-[835px]:w-[60%] text-white text-[26px] leading-tight font-thin ml-auto mr-auto max-[1400px]:pt-5'>
			{props.children}
		</div>
	)
}
