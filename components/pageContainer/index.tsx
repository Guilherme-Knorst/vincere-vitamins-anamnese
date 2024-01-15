import { PropsWithChildren } from "react";
export default function PageContainer(props: PropsWithChildren) {
	return (
		<div className="max-w-7xl w-[950px] text-white text-[26px] leading-tight font-extralight flex items-center justify-center">
			{props.children}
			</div>
	)
}
