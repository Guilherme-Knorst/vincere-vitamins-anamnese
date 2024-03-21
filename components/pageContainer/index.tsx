import { PropsWithChildren } from 'react'
export default function PageContainer(props: PropsWithChildren) {
	return (
		<div className='w-[90%] sm:max-w-[950px] text-white text-base leading-5 sm:text-[26px] sm:leading-9 sm:text-base ml-auto mr-auto 2xl:pt-0 '>
			{props.children}
		</div>
	)
}
