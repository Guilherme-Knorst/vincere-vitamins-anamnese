import { PropsWithChildren } from 'react'
export default function PageContainer(props: PropsWithChildren) {
	return (
		<div className='w-[90%] min-[900px]:w-[60%] min-[1921px]:w-[30%] text-white text-[26px] leading-tight font-extralight flex items-center justify-center'>
			{props.children}
		</div>
	)
}
