import { PropsWithChildren } from 'react'
export default function PageContainer(props: PropsWithChildren) {
	return (
		<div className='min-h-screen w-[90%] lg:w-[70%] sm:text-2xl/8 m-auto text-lg/6 text-white max-w-[1000px]'>
			{props.children}
		</div>
	)
}
