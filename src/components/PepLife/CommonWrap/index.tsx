import React, { PropsWithChildren } from "react"
import { animate, motion as m } from "framer-motion"
import { animateProps, pageAnimate } from "@/configs/animate"
function CommonWrap(props: PropsWithChildren<{ animate?: boolean }>) {
	return (
		<m.div
			className='w-full h-full'
			{...animateProps}
			variants={props?.animate ? pageAnimate : undefined}
		>
			{props.children}
		</m.div>
	)
}

export default CommonWrap
