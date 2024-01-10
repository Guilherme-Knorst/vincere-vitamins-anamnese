import { PropsWithChildren } from "react";
export default function PageContainer(props: PropsWithChildren) {
	return (
		<div className="flex flex-col items-center justify-center gap-10 max-w-7xl w-[950px] text-white text-[26px] leading-tight font-extralight">
			{props.children}
			</div>
	)
}
